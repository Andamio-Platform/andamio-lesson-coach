/**
 * MCP Prompts for Andamio Lesson Coach
 *
 * Pre-configured prompts for common lesson generation workflows.
 * These guide users through the lesson creation process.
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

/**
 * Register all lesson generation prompts
 */
export function registerPrompts(server: McpServer): void {
  // Product Demo Lesson Prompt
  server.prompt(
    "generate-product-demo",
    {
      slt: z.string().describe("Student Learning Target (must start with 'I can...')"),
      screenshots: z.string().optional().describe("Description or paths to screenshots"),
      moduleName: z.string().optional().describe("Name of the Module this lesson belongs to"),
      courseName: z.string().optional().describe("Name of the Course this lesson belongs to"),
    },
    async ({ slt, screenshots, moduleName, courseName }) => {
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Generate a Product Demo lesson for the Andamio Platform.

**Student Learning Target**: ${slt}
${moduleName ? `**Module**: ${moduleName}` : ""}
${courseName ? `**Course**: ${courseName}` : ""}
${screenshots ? `**Screenshots**: ${screenshots}` : ""}

Please use the generate-lesson tool with:
- lessonType: "product-demo"
- Include contribution-centered language (not LMS patterns)
- Structure the lesson to show Platform features step-by-step
- Connect each step to real contribution scenarios

The lesson should follow these principles:
1. Focus on what learners can DO, not just know
2. Connect to contributing to Projects (not just course completion)
3. Use "I can" statements for capabilities
4. Frame assignments as proof of capability

After generating, please review against the language-guide resource to ensure contribution-centered framing.`,
            },
          },
        ],
      };
    }
  );

  // Developer Docs Lesson Prompt
  server.prompt(
    "generate-developer-docs",
    {
      slt: z.string().describe("Student Learning Target (must start with 'I can...')"),
      codeExample: z.string().optional().describe("Code snippet or example"),
      docsLink: z.string().optional().describe("Link to API documentation or technical reference"),
      moduleName: z.string().optional().describe("Name of the Module this lesson belongs to"),
      courseName: z.string().optional().describe("Name of the Course this lesson belongs to"),
    },
    async ({ slt, codeExample, docsLink, moduleName, courseName }) => {
      const materials = [codeExample, docsLink].filter(Boolean).join("\n\n");

      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Generate a Developer Documentation lesson for technical integration with Andamio.

**Student Learning Target**: ${slt}
${moduleName ? `**Module**: ${moduleName}` : ""}
${courseName ? `**Course**: ${courseName}` : ""}
${materials ? `**Technical Materials**:\n${materials}` : ""}

Please use the generate-lesson tool with:
- lessonType: "developer-docs"
- Include code examples and technical best practices
- Connect technical implementation to real project contribution
- Focus on demonstrable technical capabilities

The lesson should:
1. Provide clear technical implementation guidance
2. Show real-world integration examples
3. Include troubleshooting for common technical issues
4. Connect to contributing to blockchain development projects

After generating, ensure the lesson maintains contribution-centered language.`,
            },
          },
        ],
      };
    }
  );

  // How-To Guide Lesson Prompt
  server.prompt(
    "generate-how-to-guide",
    {
      slt: z.string().describe("Student Learning Target (must start with 'I can...')"),
      materials: z.string().optional().describe("Supporting materials, templates, or resources"),
      moduleName: z.string().optional().describe("Name of the Module this lesson belongs to"),
      courseName: z.string().optional().describe("Name of the Course this lesson belongs to"),
    },
    async ({ slt, materials, moduleName, courseName }) => {
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Generate a How-To Guide lesson with step-by-step instructions.

**Student Learning Target**: ${slt}
${moduleName ? `**Module**: ${moduleName}` : ""}
${courseName ? `**Course**: ${courseName}` : ""}
${materials ? `**Supporting Materials**: ${materials}` : ""}

Please use the generate-lesson tool with:
- lessonType: "how-to-guide"
- Break down the procedure into clear, actionable steps
- Connect each step to why it matters for contribution
- Include verification criteria for success

The lesson should:
1. Provide clear step-by-step instructions
2. Show expected results at each step
3. Include troubleshooting for common issues
4. Demonstrate how this procedure applies in real project contexts

After generating, verify contribution-centered language using the language-guide resource.`,
            },
          },
        ],
      };
    }
  );

  // Organization Onboarding Lesson Prompt
  server.prompt(
    "generate-org-onboarding",
    {
      slt: z.string().describe("Student Learning Target (must start with 'I can...')"),
      orgContext: z
        .string()
        .optional()
        .describe("Organization-specific context, policies, or requirements"),
      moduleName: z.string().optional().describe("Name of the Module this lesson belongs to"),
      courseName: z.string().optional().describe("Name of the Course this lesson belongs to"),
    },
    async ({ slt, orgContext, moduleName, courseName }) => {
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Generate an Organization Onboarding lesson for getting started with Andamio.

**Student Learning Target**: ${slt}
${moduleName ? `**Module**: ${moduleName}` : ""}
${courseName ? `**Course**: ${courseName}` : ""}
${orgContext ? `**Organization Context**: ${orgContext}` : ""}

Please use the generate-lesson tool with:
- lessonType: "org-onboarding"
- Focus on organizational capabilities and workflows
- Include stakeholder coordination and decision points
- Provide scaling guidance

The lesson should:
1. Address organizational setup and configuration
2. Define roles and responsibilities
3. Include team coordination workflows
4. Provide measurable organizational success criteria
5. Connect to organizational contribution goals

After generating, ensure language focuses on organizational capabilities, not just individual learning.`,
            },
          },
        ],
      };
    }
  );

  // General Lesson Generation Workflow Prompt
  server.prompt(
    "start-lesson-creation",
    {},
    async () => {
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `I want to create a new lesson for Andamio. Let's start the lesson creation workflow.

Please help me:

1. First, let me provide my Student Learning Target (SLT)
2. Use the validate-slt tool to check if my SLT is well-formed
3. Use the suggest-lesson-type tool to recommend the appropriate lesson type
4. Guide me through providing the necessary materials for that lesson type
5. Generate the lesson using the appropriate prompt or tool

Key principles to remember:
- SLTs must start with "I can..." and be specific about demonstrable capabilities
- Avoid vague verbs like "understand" or "learn" - focus on action verbs
- Every lesson connects to enabling contribution to Projects
- Use contribution-centered language, not LMS patterns

You can access these resources for guidance:
- coach://language-guide - For contribution-centered language patterns
- coach://readme - For overall lesson coach framework
- coach://lesson-types/overview - For lesson type descriptions

What's your Student Learning Target?`,
            },
          },
        ],
      };
    }
  );

  console.error("Registered MCP prompts for lesson generation workflows");
}
