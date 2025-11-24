/**
 * MCP Tools Wrapper for Web UI
 *
 * This file imports and wraps the MCP server tools from the parent directory
 * so they can be called from Next.js API routes.
 */

import { exec } from "child_process";
import { promisify } from "util";
import { markdownToTiptap } from "../../src/content-converters";

const execAsync = promisify(exec);

// Path to the MCP server build
const MCP_SERVER_PATH = "../../build/index.js";

// For development, we'll call the tools directly via Node
// In production, you might want to set up a proper service

interface MCPToolResult {
  content: Array<{
    type: string;
    text?: string;
  }>;
}

async function callMCPTool(toolName: string, args: Record<string, unknown>): Promise<any> {
  // For now, we'll use the actual implementation from the src directory
  // This is a simplified approach - in production you'd want proper service integration

  const apiUrl = process.env.ANDAMIO_API_URL || "http://localhost:4000";
  const apiClient = await import("../../src/api-client");

  switch (toolName) {
    case "validate-slt":
      return { valid: args.slt && typeof args.slt === "string" && args.slt.toLowerCase().startsWith("i can") };

    case "suggest-lesson-type":
      // Simple heuristic for now
      const slt = String(args.slt).toLowerCase();
      if (slt.includes("platform") || slt.includes("dashboard") || slt.includes("ui")) {
        return { lessonType: "product-demo", rationale: "This SLT involves using platform features" };
      } else if (slt.includes("api") || slt.includes("integrate") || slt.includes("code")) {
        return { lessonType: "developer-docs", rationale: "This SLT involves technical integration" };
      } else if (slt.includes("setup") || slt.includes("configure") || slt.includes("organization")) {
        return { lessonType: "org-onboarding", rationale: "This SLT involves organizational setup" };
      } else {
        return { lessonType: "how-to-guide", rationale: "This SLT describes a procedural task" };
      }

    case "generate-lesson":
      // Import generator based on lesson type
      const generators = await import("../../src/generators/product-demo");
      return { markdown: "# Lesson Content\n\nLesson content will be generated here..." };

    default:
      throw new Error(`Tool ${toolName} not implemented in web wrapper`);
  }
}

// SLT Validation
export async function validateSLT(slt: string) {
  return callMCPTool("validate-slt", { slt });
}

// Lesson Type Suggestion
export async function suggestLessonType(slt: string) {
  return callMCPTool("suggest-lesson-type", { slt });
}

// Lesson Generation
export async function generateLesson(
  slt: string,
  lessonType: string,
  materials?: string,
  moduleName?: string,
  courseName?: string
) {
  return callMCPTool("generate-lesson", {
    slt,
    lessonType,
    materials,
    moduleName,
    courseName,
  });
}

// API Integration Tools - These call the Andamio DB API directly
const API_BASE_URL = process.env.ANDAMIO_API_URL || "http://localhost:4000/api/v0";

async function apiRequest(endpoint: string, method: string, jwtToken: string, body?: any) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`API Error: ${response.status} - ${error}`);
  }

  return response.json();
}

export async function fetchModuleSLTs(courseNftPolicyId: string, moduleCode: string, jwtToken: string) {
  const data = await apiRequest(
    `/slts/${courseNftPolicyId}/${moduleCode}`,
    "GET",
    jwtToken
  );
  return { slts: data };
}

export async function createSLT(
  courseNftPolicyId: string,
  moduleCode: string,
  moduleIndex: number,
  sltText: string,
  jwtToken: string
) {
  const data = await apiRequest(
    `/slts`,
    "POST",
    jwtToken,
    { courseNftPolicyId, moduleCode, moduleIndex, sltText }
  );
  return { slt: data };
}

export async function updateSLT(
  courseNftPolicyId: string,
  moduleCode: string,
  moduleIndex: number,
  sltText?: string,
  newModuleIndex?: number,
  jwtToken?: string
) {
  const payload: any = { courseNftPolicyId, moduleCode, moduleIndex };
  if (sltText !== undefined) payload.sltText = sltText;
  if (newModuleIndex !== undefined) payload.newModuleIndex = newModuleIndex;

  const data = await apiRequest(
    `/slts/${courseNftPolicyId}/${moduleCode}/${moduleIndex}`,
    "PATCH",
    jwtToken || "",
    payload
  );
  return { slt: data };
}

export async function deleteSLT(
  courseNftPolicyId: string,
  moduleCode: string,
  moduleIndex: number,
  jwtToken: string
) {
  await apiRequest(
    `/slts/${courseNftPolicyId}/${moduleCode}/${moduleIndex}`,
    "DELETE",
    jwtToken
  );
  return { success: true };
}

export async function fetchModuleLessons(courseNftPolicyId: string, moduleCode: string, jwtToken: string) {
  const data = await apiRequest(
    `/courses/${courseNftPolicyId}/modules/${moduleCode}/lessons`,
    "GET",
    jwtToken
  );
  return { lessons: data };
}

export async function fetchLesson(
  courseNftPolicyId: string,
  moduleCode: string,
  moduleIndex: number,
  jwtToken: string
) {
  const data = await apiRequest(
    `/lessons/${courseNftPolicyId}/${moduleCode}/${moduleIndex}`,
    "GET",
    jwtToken
  );

  // The API returns contentJson (Tiptap format)
  // We'll return both contentJson and a markdown version for backward compatibility
  let markdownContent = "";
  if (data.contentJson && data.contentJson.content) {
    markdownContent = convertTiptapToMarkdown(data.contentJson);
  }

  // The Andamio DB API returns lessons with these fields
  // Use a composite key of courseNftPolicyId + moduleCode + sltIndex as the ID
  // since that uniquely identifies a lesson
  const lessonId = `${courseNftPolicyId}-${moduleCode}-${data.sltIndex || moduleIndex}`;

  return {
    lesson: {
      id: lessonId, // Use composite key as ID
      title: data.title || "",
      description: data.description,
      sltText: data.sltText,
      content: markdownContent,
      contentJson: data.contentJson || null,
      imageUrl: data.imageUrl,
      videoUrl: data.videoUrl,
      live: data.live || false,
      moduleIndex: data.sltIndex || moduleIndex,
    },
  };
}

// Simple Tiptap to Markdown converter
function convertTiptapToMarkdown(tiptapJson: any): string {
  if (!tiptapJson || !tiptapJson.content) return "";

  let markdown = "";

  for (const node of tiptapJson.content) {
    markdown += convertNodeToMarkdown(node);
  }

  return markdown.trim();
}

function convertNodeToMarkdown(node: any): string {
  if (!node) return "";

  switch (node.type) {
    case "heading":
      const level = node.attrs?.level || 1;
      const headingText = node.content ? node.content.map((n: any) => n.text || "").join("") : "";
      return "#".repeat(level) + " " + headingText + "\n\n";

    case "paragraph":
      const paraText = node.content ? node.content.map((n: any) => n.text || "").join("") : "";
      return paraText + "\n\n";

    case "bulletList":
      let listMd = "";
      if (node.content) {
        for (const item of node.content) {
          if (item.type === "listItem" && item.content) {
            for (const p of item.content) {
              if (p.content) {
                const text = p.content.map((n: any) => n.text || "").join("");
                listMd += "- " + text + "\n";
              }
            }
          }
        }
      }
      return listMd + "\n";

    case "orderedList":
      let orderedMd = "";
      if (node.content) {
        let index = 1;
        for (const item of node.content) {
          if (item.type === "listItem" && item.content) {
            for (const p of item.content) {
              if (p.content) {
                const text = p.content.map((n: any) => n.text || "").join("");
                orderedMd += `${index}. ${text}\n`;
                index++;
              }
            }
          }
        }
      }
      return orderedMd + "\n";

    case "codeBlock":
      const lang = node.attrs?.language || "";
      const code = node.content ? node.content.map((n: any) => n.text || "").join("") : "";
      return "```" + lang + "\n" + code + "\n```\n\n";

    case "horizontalRule":
      return "---\n\n";

    default:
      return "";
  }
}

export async function createLesson(
  courseNftPolicyId: string,
  moduleCode: string,
  moduleIndex: number,
  title?: string,
  description?: string,
  markdownContent?: string,
  imageUrl?: string,
  videoUrl?: string,
  jwtToken?: string
) {
  const payload: any = { courseNftPolicyId, moduleCode, moduleIndex };
  if (title !== undefined && title !== null) payload.title = title;
  if (description !== undefined && description !== null) payload.description = description;

  // Convert markdown to Tiptap JSON - the API expects contentJson, not markdownContent
  if (markdownContent !== undefined && markdownContent !== null) {
    const tiptapJson = markdownToTiptap(markdownContent);
    payload.contentJson = tiptapJson;
  }

  if (imageUrl && imageUrl !== "") payload.imageUrl = imageUrl;
  if (videoUrl && videoUrl !== "") payload.videoUrl = videoUrl;

  const data = await apiRequest(
    `/lessons`,
    "POST",
    jwtToken || "",
    payload
  );
  return { lesson: data };
}

export async function updateLesson(
  courseNftPolicyId: string,
  moduleCode: string,
  moduleIndex: number,
  title?: string,
  description?: string,
  markdownContent?: string,
  imageUrl?: string,
  videoUrl?: string,
  live?: boolean,
  jwtToken?: string
) {
  const payload: any = { courseNftPolicyId, moduleCode, moduleIndex };
  if (title !== undefined && title !== null) payload.title = title;
  if (description !== undefined && description !== null) payload.description = description;

  // Convert markdown to Tiptap JSON - the API expects contentJson, not markdownContent
  if (markdownContent !== undefined && markdownContent !== null) {
    const tiptapJson = markdownToTiptap(markdownContent);
    payload.contentJson = tiptapJson;
  }

  if (imageUrl !== undefined && imageUrl !== null && imageUrl !== "") payload.imageUrl = imageUrl;
  if (videoUrl !== undefined && videoUrl !== null && videoUrl !== "") payload.videoUrl = videoUrl;
  if (live !== undefined && live !== null) payload.live = live;

  console.log("[mcp-tools] updateLesson - Sending to API:");
  console.log("  Endpoint:", `/lessons/${courseNftPolicyId}/${moduleCode}/${moduleIndex}`);
  console.log("  Payload keys:", Object.keys(payload));
  if (payload.contentJson) {
    console.log("  contentJson nodes:", payload.contentJson.content?.length);
    console.log("  First node type:", payload.contentJson.content?.[0]?.type);
  }

  const data = await apiRequest(
    `/lessons/${courseNftPolicyId}/${moduleCode}/${moduleIndex}`,
    "PATCH",
    jwtToken || "",
    payload
  );

  console.log("[mcp-tools] updateLesson - Response from API:");
  console.log("  Response keys:", Object.keys(data));
  console.log("  Has contentJson:", !!data.contentJson);

  return { lesson: data };
}

export async function deleteLesson(
  courseNftPolicyId: string,
  moduleCode: string,
  moduleIndex: number,
  jwtToken: string
) {
  await apiRequest(
    `/lessons/${courseNftPolicyId}/${moduleCode}/${moduleIndex}`,
    "DELETE",
    jwtToken
  );
  return { success: true };
}

// Lesson Refinement
export async function refineLesson(
  slt: string,
  currentContent: string,
  feedback: string,
  lessonType?: string
) {
  // Import the refineLesson generator
  const { refineLesson: refine } = await import("../../src/generators/refine-lesson");
  const markdown = await refine(slt, currentContent, feedback, lessonType);
  return { markdown };
}
