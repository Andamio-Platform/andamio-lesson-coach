/**
 * MCP Tools for Andamio Lesson Coach
 *
 * Implements lesson generation tools:
 * - generate-lesson: Main lesson generation tool
 * - validate-slt: Validate Student Learning Target format
 * - suggest-lesson-type: Recommend lesson type for an SLT
 * - fetch-lesson: Fetch a lesson from Andamio DB API
 * - fetch-module-lessons: Fetch all lessons for a module
 * - update-lesson: Update a lesson in Andamio DB API
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { generateProductDemo } from "./generators/product-demo.js";
import { generateDeveloperDocs } from "./generators/developer-docs.js";
import { generateHowToGuide } from "./generators/how-to-guide.js";
import { generateOrgOnboarding } from "./generators/org-onboarding.js";
import { refineLesson } from "./generators/refine-lesson.js";
import {
  fetchLesson,
  fetchModuleLessons,
  updateLesson,
  createLesson,
  deleteLesson,
  fetchModuleSLTs,
  createSLT,
  updateSLT,
  batchUpdateSLTIndexes,
  deleteSLT,
} from "./api-client.js";
import { tiptapToMarkdown, markdownToTiptap } from "./content-converters.js";

// Lesson type enum
const LessonType = z.enum([
  "product-demo",
  "developer-docs",
  "how-to-guide",
  "org-onboarding",
]);

type LessonTypeValue = z.infer<typeof LessonType>;

/**
 * Validate SLT format (should start with "I can...")
 */
function validateSLT(slt: string): { valid: boolean; message: string; suggestions?: string[] } {
  const trimmed = slt.trim();

  // Check if it starts with "I can"
  if (!trimmed.toLowerCase().startsWith("i can")) {
    return {
      valid: false,
      message: "SLT must start with 'I can...'",
      suggestions: [
        `I can ${trimmed.toLowerCase()}`,
        `Consider rephrasing as: "I can [specific capability]"`,
      ],
    };
  }

  // Check if it's specific enough (more than just "I can")
  if (trimmed.length < 15) {
    return {
      valid: false,
      message: "SLT is too vague. Be specific about the capability.",
      suggestions: [
        "Add details about what the learner can actually do",
        "Example: 'I can create a new Module in the Andamio Platform'",
      ],
    };
  }

  // Check for learning objective language (avoid)
  const avoidPatterns = [
    /\bunderstand\b/i,
    /\blearn\b/i,
    /\bknow about\b/i,
    /\bbe familiar with\b/i,
  ];

  const foundPattern = avoidPatterns.find((pattern) => pattern.test(trimmed));
  if (foundPattern) {
    return {
      valid: false,
      message: "Avoid vague verbs like 'understand', 'learn', 'know about'. Focus on demonstrable capabilities.",
      suggestions: [
        "Replace with action verbs: create, explain, trace, identify, build, implement",
        "Example: Instead of 'I can understand UTXOs', use 'I can explain what a UTXO is'",
      ],
    };
  }

  return {
    valid: true,
    message: "Valid SLT format",
  };
}

/**
 * Suggest appropriate lesson type based on SLT content
 */
function suggestLessonType(slt: string): {
  recommendedType: LessonTypeValue;
  rationale: string;
  alternatives?: Array<{ type: LessonTypeValue; reason: string }>;
} {
  const lower = slt.toLowerCase();

  // Product demo indicators
  if (
    lower.includes("platform") ||
    lower.includes("andamio") ||
    lower.includes("create a") ||
    lower.includes("navigate") ||
    lower.includes("use the")
  ) {
    return {
      recommendedType: "product-demo",
      rationale: "SLT appears to involve using Andamio Platform features",
      alternatives: [
        {
          type: "how-to-guide",
          reason: "If this is a multi-step procedure, consider a how-to guide",
        },
      ],
    };
  }

  // Developer docs indicators
  if (
    lower.includes("api") ||
    lower.includes("integrate") ||
    lower.includes("implement") ||
    lower.includes("code") ||
    lower.includes("function") ||
    lower.includes("transaction")
  ) {
    return {
      recommendedType: "developer-docs",
      rationale: "SLT appears to involve technical implementation",
      alternatives: [
        {
          type: "how-to-guide",
          reason: "If this is procedural rather than technical, use a how-to guide",
        },
      ],
    };
  }

  // Org onboarding indicators
  if (
    lower.includes("organization") ||
    lower.includes("getting started") ||
    lower.includes("set up") ||
    lower.includes("configure")
  ) {
    return {
      recommendedType: "org-onboarding",
      rationale: "SLT appears to involve organizational setup or getting started",
    };
  }

  // Default to how-to-guide for procedural content
  return {
    recommendedType: "how-to-guide",
    rationale: "General procedural content - how-to guide is most appropriate",
    alternatives: [
      {
        type: "product-demo",
        reason: "If this specifically involves Andamio Platform features",
      },
    ],
  };
}

/**
 * Register all lesson generation tools
 */
export function registerTools(server: McpServer): void {
  // Tool: validate-slt
  server.tool(
    "validate-slt",
    "Validate if a Student Learning Target follows the 'I can...' format and best practices",
    {
      slt: z.string().describe("The Student Learning Target to validate"),
    },
    async ({ slt }) => {
      const result = validateSLT(slt);

      let responseText = `**Validation Result**\n\n`;
      responseText += `Status: ${result.valid ? "✅ Valid" : "❌ Invalid"}\n\n`;
      responseText += `Message: ${result.message}\n\n`;

      if (result.suggestions && result.suggestions.length > 0) {
        responseText += `**Suggestions:**\n`;
        result.suggestions.forEach((suggestion) => {
          responseText += `- ${suggestion}\n`;
        });
      }

      return {
        content: [
          {
            type: "text",
            text: responseText,
          },
        ],
      };
    }
  );

  // Tool: suggest-lesson-type
  server.tool(
    "suggest-lesson-type",
    "Recommend the most appropriate lesson type based on the SLT content",
    {
      slt: z.string().describe("The Student Learning Target to analyze"),
    },
    async ({ slt }) => {
      const suggestion = suggestLessonType(slt);

      let responseText = `**Lesson Type Recommendation**\n\n`;
      responseText += `Recommended Type: **${suggestion.recommendedType}**\n\n`;
      responseText += `Rationale: ${suggestion.rationale}\n\n`;

      if (suggestion.alternatives && suggestion.alternatives.length > 0) {
        responseText += `**Alternative Options:**\n`;
        suggestion.alternatives.forEach((alt) => {
          responseText += `- **${alt.type}**: ${alt.reason}\n`;
        });
      }

      return {
        content: [
          {
            type: "text",
            text: responseText,
          },
        ],
      };
    }
  );

  // Tool: generate-lesson
  server.tool(
    "generate-lesson",
    "Generate a complete lesson based on an SLT and lesson type",
    {
      slt: z.string().describe("The Student Learning Target (must start with 'I can...')"),
      lessonType: LessonType.describe(
        "Type of lesson: product-demo, developer-docs, how-to-guide, or org-onboarding"
      ),
      materials: z
        .string()
        .optional()
        .describe(
          "Optional supporting materials: screenshots (for product-demo), code + docs link (for developer-docs), or context (for how-to/onboarding)"
        ),
      moduleName: z.string().optional().describe("Optional module name for context"),
      courseName: z.string().optional().describe("Optional course name for context"),
    },
    async ({ slt, lessonType, materials, moduleName, courseName }) => {
      // First validate the SLT
      const validation = validateSLT(slt);
      if (!validation.valid) {
        return {
          content: [
            {
              type: "text",
              text: `**Error: Invalid SLT**\n\n${validation.message}\n\n**Suggestions:**\n${validation.suggestions?.join("\n") || "Please revise your SLT."}`,
            },
          ],
        };
      }

      // Generate lesson based on type
      let lessonContent: string;

      try {
        switch (lessonType) {
          case "product-demo":
            lessonContent = await generateProductDemo(slt, materials, moduleName, courseName);
            break;
          case "developer-docs":
            lessonContent = await generateDeveloperDocs(slt, materials, moduleName, courseName);
            break;
          case "how-to-guide":
            lessonContent = await generateHowToGuide(slt, materials, moduleName, courseName);
            break;
          case "org-onboarding":
            lessonContent = await generateOrgOnboarding(slt, materials, moduleName, courseName);
            break;
          default:
            throw new Error(`Unknown lesson type: ${lessonType}`);
        }

        return {
          content: [
            {
              type: "text",
              text: lessonContent,
            },
          ],
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return {
          content: [
            {
              type: "text",
              text: `**Error generating lesson:**\n\n${errorMessage}`,
            },
          ],
        };
      }
    }
  );

  // Tool: fetch-lesson
  server.tool(
    "fetch-lesson",
    "Fetch a lesson from the Andamio DB API and convert it to markdown for editing",
    {
      courseNftPolicyId: z.string().describe("The course NFT policy ID"),
      moduleCode: z.string().describe("The module code"),
      moduleIndex: z.number().describe("The SLT index (0-based)"),
    },
    async ({ courseNftPolicyId, moduleCode, moduleIndex }) => {
      try {
        const lesson = await fetchLesson(courseNftPolicyId, moduleCode, moduleIndex);

        // Convert content to markdown
        const markdownContent = lesson.contentJson
          ? tiptapToMarkdown(lesson.contentJson)
          : "";

        let responseText = `# Lesson: ${lesson.title || "Untitled"}\n\n`;
        responseText += `**SLT**: ${lesson.sltText}\n\n`;
        responseText += `**Description**: ${lesson.description || "No description"}\n\n`;

        if (lesson.imageUrl) {
          responseText += `**Image URL**: ${lesson.imageUrl}\n\n`;
        }

        if (lesson.videoUrl) {
          responseText += `**Video URL**: ${lesson.videoUrl}\n\n`;
        }

        responseText += `**Status**: ${lesson.live ? "Live" : "Draft"}\n\n`;
        responseText += `---\n\n`;
        responseText += `## Lesson Content (Markdown)\n\n`;
        responseText += markdownContent || "*No content*";

        return {
          content: [
            {
              type: "text",
              text: responseText,
            },
          ],
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return {
          content: [
            {
              type: "text",
              text: `**Error fetching lesson:**\n\n${errorMessage}\n\n**Tip**: Make sure ANDAMIO_JWT_TOKEN is set in your .env file`,
            },
          ],
        };
      }
    }
  );

  // Tool: fetch-module-lessons
  server.tool(
    "fetch-module-lessons",
    "Fetch all lessons for a module from the Andamio DB API",
    {
      courseNftPolicyId: z.string().describe("The course NFT policy ID"),
      moduleCode: z.string().describe("The module code"),
    },
    async ({ courseNftPolicyId, moduleCode }) => {
      try {
        const lessons = await fetchModuleLessons(courseNftPolicyId, moduleCode);

        let responseText = `# Module Lessons: ${moduleCode}\n\n`;
        responseText += `Found ${lessons.length} lesson(s)\n\n`;
        responseText += `---\n\n`;

        lessons.forEach((lesson, index) => {
          responseText += `## ${index + 1}. ${lesson.title || "Untitled"}\n\n`;
          responseText += `- **SLT Index**: ${lesson.sltIndex}\n`;
          responseText += `- **SLT**: ${lesson.sltText}\n`;
          responseText += `- **Status**: ${lesson.live ? "Live" : "Draft"}\n`;

          if (lesson.description) {
            responseText += `- **Description**: ${lesson.description}\n`;
          }

          responseText += `\n`;
        });

        responseText += `\n**Tip**: Use \`fetch-lesson\` to get the full content of a specific lesson for editing.`;

        return {
          content: [
            {
              type: "text",
              text: responseText,
            },
          ],
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return {
          content: [
            {
              type: "text",
              text: `**Error fetching module lessons:**\n\n${errorMessage}\n\n**Tip**: Make sure ANDAMIO_JWT_TOKEN is set in your .env file`,
            },
          ],
        };
      }
    }
  );

  // Tool: update-lesson
  server.tool(
    "update-lesson",
    "Update a lesson in the Andamio DB API. Provide markdown content which will be converted to Tiptap JSON.",
    {
      courseNftPolicyId: z.string().describe("The course NFT policy ID"),
      moduleCode: z.string().describe("The module code"),
      moduleIndex: z.number().describe("The SLT index (0-based)"),
      title: z.string().optional().describe("Updated lesson title"),
      description: z.string().optional().describe("Updated lesson description"),
      markdownContent: z.string().optional().describe("Updated lesson content in markdown format"),
      imageUrl: z.string().optional().describe("Updated image URL"),
      videoUrl: z.string().optional().describe("Updated video URL"),
      live: z.boolean().optional().describe("Whether the lesson is live (published) or draft"),
    },
    async ({ courseNftPolicyId, moduleCode, moduleIndex, title, description, markdownContent, imageUrl, videoUrl, live }) => {
      try {
        // Convert markdown to Tiptap JSON if provided
        const contentJson = markdownContent
          ? (markdownToTiptap(markdownContent) as unknown as Record<string, unknown>)
          : undefined;

        const result = await updateLesson(
          courseNftPolicyId,
          moduleCode,
          moduleIndex,
          {
            title,
            description,
            contentJson,
            imageUrl,
            videoUrl,
            live,
          }
        );

        let responseText = `✅ **Lesson Updated Successfully**\n\n`;
        responseText += `**Title**: ${result.title || "Untitled"}\n`;
        responseText += `**Description**: ${result.description || "No description"}\n`;
        responseText += `**Status**: ${result.live ? "Live" : "Draft"}\n\n`;

        if (result.imageUrl) {
          responseText += `**Image URL**: ${result.imageUrl}\n`;
        }

        if (result.videoUrl) {
          responseText += `**Video URL**: ${result.videoUrl}\n`;
        }

        return {
          content: [
            {
              type: "text",
              text: responseText,
            },
          ],
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return {
          content: [
            {
              type: "text",
              text: `**Error updating lesson:**\n\n${errorMessage}\n\n**Tip**: Make sure ANDAMIO_JWT_TOKEN is set in your .env file and you have permission to edit this course`,
            },
          ],
        };
      }
    }
  );

  // Tool: create-lesson
  server.tool(
    "create-lesson",
    "Create a new lesson for an existing SLT. Auto-generates title from SLT text if not provided. Provide markdown content which will be converted to Tiptap JSON.",
    {
      courseNftPolicyId: z.string().describe("The course NFT policy ID"),
      moduleCode: z.string().describe("The module code"),
      moduleIndex: z.number().describe("The SLT index (0-based)"),
      title: z.string().optional().describe("Lesson title (defaults to SLT text if not provided)"),
      description: z.string().optional().describe("Lesson description"),
      markdownContent: z.string().optional().describe("Lesson content in markdown format"),
      imageUrl: z.string().optional().describe("Image URL"),
      videoUrl: z.string().optional().describe("Video URL"),
    },
    async ({ courseNftPolicyId, moduleCode, moduleIndex, title, description, markdownContent, imageUrl, videoUrl }) => {
      try {
        // Convert markdown to Tiptap JSON if provided
        const contentJson = markdownContent
          ? (markdownToTiptap(markdownContent) as unknown as Record<string, unknown>)
          : undefined;

        const result = await createLesson(
          courseNftPolicyId,
          moduleCode,
          moduleIndex,
          {
            title,
            description,
            contentJson,
            imageUrl,
            videoUrl,
          }
        );

        let responseText = `✅ **Lesson Created Successfully**\n\n`;
        responseText += `**Title**: ${result.title || "Untitled"}\n`;
        responseText += `**Description**: ${result.description || "No description"}\n`;
        responseText += `**Status**: ${result.live ? "Live" : "Draft"}\n\n`;

        if (result.imageUrl) {
          responseText += `**Image URL**: ${result.imageUrl}\n`;
        }

        if (result.videoUrl) {
          responseText += `**Video URL**: ${result.videoUrl}\n`;
        }

        return {
          content: [
            {
              type: "text",
              text: responseText,
            },
          ],
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return {
          content: [
            {
              type: "text",
              text: `**Error creating lesson:**\n\n${errorMessage}\n\n**Tip**: Make sure the SLT exists and you have permission to create lessons for this course`,
            },
          ],
        };
      }
    }
  );

  // Tool: delete-lesson
  server.tool(
    "delete-lesson",
    "Delete a lesson from the Andamio DB API",
    {
      courseNftPolicyId: z.string().describe("The course NFT policy ID"),
      moduleCode: z.string().describe("The module code"),
      moduleIndex: z.number().describe("The SLT index (0-based)"),
    },
    async ({ courseNftPolicyId, moduleCode, moduleIndex }) => {
      try {
        await deleteLesson(courseNftPolicyId, moduleCode, moduleIndex);

        return {
          content: [
            {
              type: "text",
              text: `✅ **Lesson Deleted Successfully**\n\nDeleted lesson for SLT ${moduleIndex} in module ${moduleCode}`,
            },
          ],
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return {
          content: [
            {
              type: "text",
              text: `**Error deleting lesson:**\n\n${errorMessage}`,
            },
          ],
        };
      }
    }
  );

  // ============================================================================
  // SLT Management Tools
  // ============================================================================

  // Tool: fetch-module-slts
  server.tool(
    "fetch-module-slts",
    "Fetch all SLTs for a module from the Andamio DB API",
    {
      courseNftPolicyId: z.string().describe("The course NFT policy ID"),
      moduleCode: z.string().describe("The module code"),
    },
    async ({ courseNftPolicyId, moduleCode }) => {
      try {
        const slts = await fetchModuleSLTs(courseNftPolicyId, moduleCode);

        let responseText = `# Module SLTs: ${moduleCode}\n\n`;
        responseText += `Found ${slts.length} SLT(s)\n\n`;
        responseText += `---\n\n`;

        slts.forEach((slt, index) => {
          responseText += `## ${index + 1}. SLT ${slt.moduleIndex}\n\n`;
          responseText += `- **ID**: ${slt.id}\n`;
          responseText += `- **Text**: ${slt.sltText}\n\n`;
        });

        responseText += `\n**Tip**: Use \`create-lesson\` to create a lesson for any SLT that doesn't have one yet.`;

        return {
          content: [
            {
              type: "text",
              text: responseText,
            },
          ],
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return {
          content: [
            {
              type: "text",
              text: `**Error fetching module SLTs:**\n\n${errorMessage}`,
            },
          ],
        };
      }
    }
  );

  // Tool: create-slt
  server.tool(
    "create-slt",
    "Create a new SLT in a module (max 25 SLTs per module, indexed 0-24)",
    {
      courseNftPolicyId: z.string().describe("The course NFT policy ID"),
      moduleCode: z.string().describe("The module code"),
      moduleIndex: z.number().min(0).max(24).describe("The SLT index (0-24)"),
      sltText: z.string().describe("The SLT text (should start with 'I can...')"),
    },
    async ({ courseNftPolicyId, moduleCode, moduleIndex, sltText }) => {
      try {
        const result = await createSLT(courseNftPolicyId, moduleCode, moduleIndex, sltText);

        let responseText = `✅ **SLT Created Successfully**\n\n`;
        responseText += `**ID**: ${result.id}\n`;
        responseText += `**Module Index**: ${result.moduleIndex}\n`;
        responseText += `**SLT Text**: ${result.sltText}\n\n`;
        responseText += `**Next Step**: Use \`create-lesson\` to create a lesson for this SLT.`;

        return {
          content: [
            {
              type: "text",
              text: responseText,
            },
          ],
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return {
          content: [
            {
              type: "text",
              text: `**Error creating SLT:**\n\n${errorMessage}\n\n**Common issues:**\n- SLT with this index already exists\n- Module has reached max of 25 SLTs\n- You don't have permission to edit this course`,
            },
          ],
        };
      }
    }
  );

  // Tool: update-slt
  server.tool(
    "update-slt",
    "Update an SLT's text or reorder it by changing its moduleIndex",
    {
      courseNftPolicyId: z.string().describe("The course NFT policy ID"),
      moduleCode: z.string().describe("The module code"),
      moduleIndex: z.number().min(0).max(24).describe("The current SLT index"),
      sltText: z.string().optional().describe("Updated SLT text"),
      newModuleIndex: z.number().min(0).max(24).optional().describe("New module index (for reordering)"),
    },
    async ({ courseNftPolicyId, moduleCode, moduleIndex, sltText, newModuleIndex }) => {
      try {
        const result = await updateSLT(courseNftPolicyId, moduleCode, moduleIndex, {
          sltText,
          newModuleIndex,
        });

        let responseText = `✅ **SLT Updated Successfully**\n\n`;
        responseText += `**ID**: ${result.id}\n`;
        responseText += `**Module Index**: ${result.moduleIndex}\n`;
        responseText += `**SLT Text**: ${result.sltText}\n`;

        return {
          content: [
            {
              type: "text",
              text: responseText,
            },
          ],
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return {
          content: [
            {
              type: "text",
              text: `**Error updating SLT:**\n\n${errorMessage}\n\n**Common issues:**\n- New moduleIndex already exists\n- SLT not found\n- You don't have permission to edit this course`,
            },
          ],
        };
      }
    }
  );

  // Tool: batch-reorder-slts
  server.tool(
    "batch-reorder-slts",
    "Batch update multiple SLT indexes at once (for reordering). Provide an array of {id, moduleIndex} pairs.",
    {
      updates: z.array(
        z.object({
          id: z.string().describe("The SLT ID"),
          moduleIndex: z.number().min(0).max(24).describe("The new module index"),
        })
      ).describe("Array of SLT updates with id and new moduleIndex"),
    },
    async ({ updates }) => {
      try {
        const result = await batchUpdateSLTIndexes(updates);

        let responseText = `✅ **SLTs Reordered Successfully**\n\n`;
        responseText += `Updated ${result.count} SLT(s)\n\n`;
        responseText += `**Tip**: Use \`fetch-module-slts\` to see the new order.`;

        return {
          content: [
            {
              type: "text",
              text: responseText,
            },
          ],
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return {
          content: [
            {
              type: "text",
              text: `**Error batch updating SLTs:**\n\n${errorMessage}\n\n**Common issues:**\n- Duplicate moduleIndexes in updates\n- SLTs don't all belong to the same module\n- You don't have permission to edit this course`,
            },
          ],
        };
      }
    }
  );

  // Tool: delete-slt
  server.tool(
    "delete-slt",
    "Delete an SLT and its lesson (if exists). Fails if the SLT is used in an assignment.",
    {
      courseNftPolicyId: z.string().describe("The course NFT policy ID"),
      moduleCode: z.string().describe("The module code"),
      moduleIndex: z.number().min(0).max(24).describe("The SLT index to delete"),
    },
    async ({ courseNftPolicyId, moduleCode, moduleIndex }) => {
      try {
        await deleteSLT(courseNftPolicyId, moduleCode, moduleIndex);

        return {
          content: [
            {
              type: "text",
              text: `✅ **SLT Deleted Successfully**\n\nDeleted SLT ${moduleIndex} from module ${moduleCode} (and its lesson if it existed)`,
            },
          ],
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return {
          content: [
            {
              type: "text",
              text: `**Error deleting SLT:**\n\n${errorMessage}\n\n**Common issues:**\n- SLT is used in an assignment (cannot delete)\n- SLT not found\n- You don't have permission to edit this course`,
            },
          ],
        };
      }
    }
  );

  // ============================================================================
  // Lesson Refinement Tool
  // ============================================================================

  // Tool: refine-lesson
  server.tool(
    "refine-lesson",
    "Refine an existing lesson based on user feedback. Takes current lesson content and specific feedback, returns improved version.",
    {
      slt: z.string().describe("The Student Learning Target for context"),
      currentContent: z.string().describe("The current lesson content in markdown format"),
      feedback: z.string().describe("Specific feedback about what to improve in the lesson"),
      lessonType: LessonType.optional().describe("Optional lesson type for context"),
    },
    async ({ slt, currentContent, feedback, lessonType }) => {
      try {
        const refinedContent = await refineLesson(slt, currentContent, feedback, lessonType);

        return {
          content: [
            {
              type: "text",
              text: refinedContent,
            },
          ],
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return {
          content: [
            {
              type: "text",
              text: `**Error refining lesson:**\n\n${errorMessage}`,
            },
          ],
        };
      }
    }
  );

  console.error("Registered MCP tools for lesson generation and API integration");
}
