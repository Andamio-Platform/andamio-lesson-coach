/**
 * MCP Resources for Andamio Lesson Coach
 *
 * Exposes knowledge base content as readable resources:
 * - Language guide (contribution-centered vs LMS patterns)
 * - Lesson type coach prompts
 * - Sample SLTs and module examples
 * - Context materials
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { readFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROJECT_ROOT = join(__dirname, "..");

/**
 * Helper function to read vault content
 */
async function readVaultFile(relativePath: string): Promise<string> {
  try {
    const fullPath = join(PROJECT_ROOT, relativePath);
    return await readFile(fullPath, "utf-8");
  } catch (error) {
    console.error(`Error reading ${relativePath}:`, error);
    return `Error: Could not read ${relativePath}`;
  }
}

/**
 * Register all knowledge base resources
 */
export function registerResources(server: McpServer): void {
  // Language Guide Resource
  server.resource(
    "language-guide",
    "coach://language-guide",
    {
      title: "Language Guide: Contribution-Centered vs LMS",
      description: "Comprehensive guide to using contribution-centered language instead of LMS patterns",
      mimeType: "text/markdown",
    },
    async () => {
      const content = await readVaultFile("context/language-guide.md");
      return {
        contents: [
          {
            uri: "coach://language-guide",
            text: content,
            mimeType: "text/markdown",
          },
        ],
      };
    }
  );

  // Context README Resource
  server.resource(
    "context-readme",
    "coach://context/readme",
    {
      title: "Context Directory Overview",
      description: "Overview of context materials available in the knowledge base",
      mimeType: "text/markdown",
    },
    async () => {
      const content = await readVaultFile("context/README.md");
      return {
        contents: [
          {
            uri: "coach://context/readme",
            text: content,
            mimeType: "text/markdown",
          },
        ],
      };
    }
  );

  // Main README Resource
  server.resource(
    "readme",
    "coach://readme",
    {
      title: "Andamio Lesson Coach Overview",
      description: "Main documentation for the Andamio Lesson Coach system",
      mimeType: "text/markdown",
    },
    async () => {
      const content = await readVaultFile("README.md");
      return {
        contents: [
          {
            uri: "coach://readme",
            text: content,
            mimeType: "text/markdown",
          },
        ],
      };
    }
  );

  // CLAUDE.md Resource
  server.resource(
    "claude-instructions",
    "coach://claude-instructions",
    {
      title: "Claude Code Instructions",
      description: "Project-specific instructions for AI assistance",
      mimeType: "text/markdown",
    },
    async () => {
      const content = await readVaultFile("CLAUDE.md");
      return {
        contents: [
          {
            uri: "coach://claude-instructions",
            text: content,
            mimeType: "text/markdown",
          },
        ],
      };
    }
  );

  // Lesson Types Overview Resource
  server.resource(
    "lesson-types-overview",
    "coach://lesson-types/overview",
    {
      title: "Lesson Types Overview",
      description: "Overview of the four core lesson types",
      mimeType: "text/markdown",
    },
    async () => {
      const content = await readVaultFile("lesson-types/README.md");
      return {
        contents: [
          {
            uri: "coach://lesson-types/overview",
            text: content,
            mimeType: "text/markdown",
          },
        ],
      };
    }
  );

  console.error("Registered MCP resources for knowledge base access");
}
