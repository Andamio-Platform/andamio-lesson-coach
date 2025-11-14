#!/usr/bin/env node

/**
 * Andamio Lesson Coach MCP Server
 *
 * An MCP server that provides AI-powered lesson generation for Andamio platform.
 * Exposes knowledge base resources, lesson generation tools, and coaching prompts.
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerResources } from "./resources.js";
import { registerTools } from "./tools.js";
import { registerPrompts } from "./prompts.js";

// Create MCP server instance
const server = new McpServer({
  name: "andamio-lesson-coach",
  version: "1.0.0",
});

// Register all capabilities
registerResources(server);
registerTools(server);
registerPrompts(server);

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Andamio Lesson Coach MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
