# Andamio Lesson Coach MCP Server

An MCP (Model Context Protocol) server that provides AI-powered lesson generation for the Andamio platform.

## Overview

This MCP server exposes:
- **Resources**: Access to the lesson coach knowledge base
- **Tools**: 13 tools for lesson generation, SLT/lesson management, and API integration
- **Prompts**: Pre-configured workflows for creating different lesson types

**New in Phase 1+**: Full CRUD operations for SLTs and lessons with Andamio Database API integration!

## Installation

### Prerequisites
- Node.js 16 or higher
- npm

### Setup

1. Install dependencies:
```bash
npm install
```

2. Build the server:
```bash
npm run build
```

3. Configure environment (for API integration):
```bash
cp .env.example .env
# Edit .env and add your ANDAMIO_JWT_TOKEN
```

See [GETTING-STARTED.md](./GETTING-STARTED.md) for complete setup instructions.

## Usage

### With Claude Desktop

Add to your Claude Desktop configuration file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "andamio-lesson-coach": {
      "command": "node",
      "args": [
        "/Users/james/projects/01-projects/andamio-lesson-coach/build/index.js"
      ]
    }
  }
}
```

### Resources Available

- `coach://readme` - Main lesson coach overview
- `coach://language-guide` - Contribution-centered vs LMS language patterns
- `coach://context/readme` - Context materials overview
- `coach://lesson-types/overview` - Overview of lesson types
- `coach://claude-instructions` - Project instructions

### Tools Available

The server provides **13 tools** organized in three categories:

#### Lesson Generation Tools (3)

##### `validate-slt`
Validates if a Student Learning Target follows the "I can..." format.

**Input**:
- `slt` (string): The SLT to validate

**Output**: Validation result with suggestions if invalid

##### `suggest-lesson-type`
Recommends the most appropriate lesson type based on SLT content.

**Input**:
- `slt` (string): The SLT to analyze

**Output**: Recommended lesson type with rationale

##### `generate-lesson`
Generates a complete lesson based on an SLT and lesson type.

**Inputs**:
- `slt` (string): The Student Learning Target
- `lessonType` (enum): `product-demo`, `developer-docs`, `how-to-guide`, or `org-onboarding`
- `materials` (string, optional): Supporting materials
- `moduleName` (string, optional): Module name for context
- `courseName` (string, optional): Course name for context

**Output**: Complete lesson in markdown format

#### Lesson API Integration Tools (5)

##### `fetch-lesson`
Fetches a lesson from the Andamio DB API and converts it to markdown.

**Inputs**:
- `courseNftPolicyId` (string): The course NFT policy ID
- `moduleCode` (string): The module code
- `moduleIndex` (number): The SLT index (0-based)

**Output**: Lesson with title, description, SLT, status, and content in markdown

##### `fetch-module-lessons`
Fetches all lessons for a module from the Andamio DB API.

**Inputs**:
- `courseNftPolicyId` (string): The course NFT policy ID
- `moduleCode` (string): The module code

**Output**: List of all lessons in the module with metadata

##### `create-lesson`
Creates a new lesson for an existing SLT with markdown content.

**Inputs**:
- `courseNftPolicyId` (string): The course NFT policy ID
- `moduleCode` (string): The module code
- `moduleIndex` (number): The SLT index (0-based)
- `title` (string, optional): Lesson title (defaults to SLT text)
- `description` (string, optional): Lesson description
- `markdownContent` (string, optional): Lesson content in markdown
- `imageUrl` (string, optional): Image URL
- `videoUrl` (string, optional): Video URL

**Output**: Created lesson metadata

##### `update-lesson`
Updates a lesson in the Andamio DB API with new content.

**Inputs**:
- `courseNftPolicyId` (string): The course NFT policy ID
- `moduleCode` (string): The module code
- `moduleIndex` (number): The SLT index (0-based)
- `title` (string, optional): Updated lesson title
- `description` (string, optional): Updated description
- `markdownContent` (string, optional): Updated content in markdown
- `imageUrl` (string, optional): Updated image URL
- `videoUrl` (string, optional): Updated video URL
- `live` (boolean, optional): Publish status (true = live, false = draft)

**Output**: Updated lesson metadata

##### `delete-lesson`
Deletes a lesson from the Andamio DB API.

**Inputs**:
- `courseNftPolicyId` (string): The course NFT policy ID
- `moduleCode` (string): The module code
- `moduleIndex` (number): The SLT index (0-based)

**Output**: Confirmation of deletion

#### SLT Management Tools (5)

##### `fetch-module-slts`
Fetches all SLTs for a module from the Andamio DB API.

**Inputs**:
- `courseNftPolicyId` (string): The course NFT policy ID
- `moduleCode` (string): The module code

**Output**: List of all SLTs with id, moduleIndex, and sltText

##### `create-slt`
Creates a new SLT in a module (max 25 SLTs per module, indexed 0-24).

**Inputs**:
- `courseNftPolicyId` (string): The course NFT policy ID
- `moduleCode` (string): The module code
- `moduleIndex` (number): The SLT index (0-24)
- `sltText` (string): The SLT text (should start with "I can...")

**Output**: Created SLT with id, moduleIndex, and sltText

##### `update-slt`
Updates an SLT's text or reorders it by changing its moduleIndex.

**Inputs**:
- `courseNftPolicyId` (string): The course NFT policy ID
- `moduleCode` (string): The module code
- `moduleIndex` (number): The current SLT index
- `sltText` (string, optional): Updated SLT text
- `newModuleIndex` (number, optional): New module index (for reordering)

**Output**: Updated SLT with id, moduleIndex, and sltText

##### `batch-reorder-slts`
Batch updates multiple SLT indexes at once (for reordering).

**Inputs**:
- `updates` (array): Array of objects with:
  - `id` (string): The SLT ID
  - `moduleIndex` (number): The new module index (0-24)

**Output**: Confirmation with count of updated SLTs

##### `delete-slt`
Deletes an SLT and its lesson (if exists). Fails if the SLT is used in an assignment.

**Inputs**:
- `courseNftPolicyId` (string): The course NFT policy ID
- `moduleCode` (string): The module code
- `moduleIndex` (number): The SLT index to delete (0-24)

**Output**: Confirmation of deletion

**Note:** All API tools require `ANDAMIO_JWT_TOKEN` in your `.env` file. See [GETTING-STARTED.md](./GETTING-STARTED.md) for setup.

### Prompts Available

#### `start-lesson-creation`
Interactive workflow for creating a new Andamio lesson.

#### `generate-product-demo`
Creates a lesson showing how to use Andamio Platform features.

**Inputs**:
- `slt`: Student Learning Target
- `screenshots` (optional): Screenshot descriptions or paths
- `moduleName` (optional)
- `courseName` (optional)

#### `generate-developer-docs`
Creates technical documentation for developers.

**Inputs**:
- `slt`: Student Learning Target
- `codeExample` (optional): Code snippet
- `docsLink` (optional): API documentation link
- `moduleName` (optional)
- `courseName` (optional)

#### `generate-how-to-guide`
Creates step-by-step procedural instructions.

**Inputs**:
- `slt`: Student Learning Target
- `materials` (optional): Supporting materials
- `moduleName` (optional)
- `courseName` (optional)

#### `generate-org-onboarding`
Creates organizational onboarding content.

**Inputs**:
- `slt`: Student Learning Target
- `orgContext` (optional): Organization-specific context
- `moduleName` (optional)
- `courseName` (optional)

## Lesson Types

### 1. Product Demo
Shows learners how to use Andamio Platform features.
- **Typical inputs**: SLT + screenshots
- **Best for**: Platform feature demonstrations

### 2. Developer Documentation
Technical content for developers integrating with Andamio.
- **Typical inputs**: SLT + code + documentation links
- **Best for**: API integration, technical implementations

### 3. How-To Guide
Step-by-step procedural content.
- **Typical inputs**: SLT + optional supporting materials
- **Best for**: Procedures and workflows

### 4. Organization Onboarding
Content for organizations getting started with Andamio.
- **Typical inputs**: SLT + organizational context
- **Best for**: Organizational setup and configuration

## Key Principles

All generated lessons follow these principles:

1. **Contribution-Centered**: Every lesson connects to enabling contribution to Projects
2. **SLT-Driven**: Input is "I can [capability]", output enables that capability
3. **Assignment-Aware**: Lessons prepare for Module Assignments
4. **NOT LMS Language**: Avoids traditional LMS patterns and terminology

## Development

### Watch Mode
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Project Structure
```
src/
├── index.ts              # MCP server entry point
├── resources.ts          # Knowledge base resources
├── tools.ts              # Lesson generation tools
├── prompts.ts            # Pre-configured prompts
└── generators/           # Lesson type generators
    ├── product-demo.ts
    ├── developer-docs.ts
    ├── how-to-guide.ts
    └── org-onboarding.ts
```

## Example Usage

### In Claude Desktop

#### Generate a Lesson

1. Start a conversation
2. Use a prompt: "Use the start-lesson-creation prompt to help me create a new lesson"
3. Provide your SLT when prompted
4. Follow the guided workflow
5. Review and customize the generated lesson

Or use tools directly:
- "Use the validate-slt tool to check: 'I can create a new Module in Andamio'"
- "Use the suggest-lesson-type tool for this SLT: 'I can integrate Andamio API into my application'"
- "Use the generate-lesson tool to create a product-demo lesson for: 'I can navigate the Andamio Platform dashboard'"

#### Work with Database Content

**Fetch and Edit a Lesson:**
```
Use the fetch-lesson tool to get the lesson for:
- courseNftPolicyId: "your-policy-id"
- moduleCode: "MOD-101"
- moduleIndex: 0

[Review the content, then ask for improvements]

Use the update-lesson tool to save the changes
```

**Create a Module from Scratch:**
```
Use the create-slt tool to add:
"I can create a new Module in the Andamio Platform" at index 0

Use the generate-lesson tool to create content for this SLT

Use the create-lesson tool to save it to the database
```

**Reorganize a Module:**
```
Use the fetch-module-slts tool to see current order

Use the batch-reorder-slts tool to rearrange them
```

See [GETTING-STARTED.md](./GETTING-STARTED.md) for detailed workflows and examples.

## Troubleshooting

### Server won't start
- Check Node.js version: `node --version` (requires 16+)
- Rebuild: `npm run build`
- Check configuration file path

### Resources not loading
- Verify vault files exist in expected locations
- Check console for file read errors
- Ensure relative paths in resources.ts are correct

### API Integration Issues

**"ANDAMIO_JWT_TOKEN environment variable is required"**
- Create `.env` file: `cp .env.example .env`
- Add your JWT token to the `.env` file
- Restart Claude Desktop

**"Failed to fetch lesson (403)"**
- JWT token may have expired (regenerate it)
- User doesn't have Creator role
- User doesn't have permission to edit this course

**"Failed to fetch lesson (404)"**
- Verify the course/module/SLT exists in the database
- Check that courseNftPolicyId and moduleCode are correct
- Use `fetch-module-slts` to see what exists

**"ECONNREFUSED" when calling API**
- Make sure andamio-db-api is running on localhost:4000
- Check `ANDAMIO_API_URL` in your `.env` file

For detailed troubleshooting, see [GETTING-STARTED.md](./GETTING-STARTED.md).

## Additional Documentation

- **[GETTING-STARTED.md](./GETTING-STARTED.md)** - Complete setup guide
- **[TOOLS-REFERENCE.md](./TOOLS-REFERENCE.md)** - Comprehensive tool reference
- **[API-INTEGRATION.md](./API-INTEGRATION.md)** - API integration details
- **[README.md](./README.md)** - Project overview

---

*Part of the Andamio Lesson Coach project*
