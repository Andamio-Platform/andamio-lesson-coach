/**
 * MCP Tools for Andamio Lesson Coach
 *
 * Implements lesson generation tools:
 * - generate-lesson: Main lesson generation tool
 * - validate-slt: Validate Student Learning Target format
 * - suggest-lesson-type: Recommend lesson type for an SLT
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { generateProductDemo } from "./generators/product-demo.js";
import { generateDeveloperDocs } from "./generators/developer-docs.js";
import { generateHowToGuide } from "./generators/how-to-guide.js";
import { generateOrgOnboarding } from "./generators/org-onboarding.js";

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

  console.error("Registered MCP tools for lesson generation");
}
