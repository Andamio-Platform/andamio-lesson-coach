# Andamio Lesson Coach MCP Server

An MCP (Model Context Protocol) server that provides AI-powered lesson generation for the Andamio platform.

## Overview

This MCP server exposes:
- **Resources**: Access to the lesson coach knowledge base
- **Tools**: Lesson generation, SLT validation, lesson type suggestions
- **Prompts**: Pre-configured workflows for creating different lesson types

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

#### `validate-slt`
Validates if a Student Learning Target follows the "I can..." format.

**Input**:
- `slt` (string): The SLT to validate

**Output**: Validation result with suggestions if invalid

#### `suggest-lesson-type`
Recommends the most appropriate lesson type based on SLT content.

**Input**:
- `slt` (string): The SLT to analyze

**Output**: Recommended lesson type with rationale

#### `generate-lesson`
Generates a complete lesson based on an SLT and lesson type.

**Inputs**:
- `slt` (string): The Student Learning Target
- `lessonType` (enum): `product-demo`, `developer-docs`, `how-to-guide`, or `org-onboarding`
- `materials` (string, optional): Supporting materials
- `moduleName` (string, optional): Module name for context
- `courseName` (string, optional): Course name for context

**Output**: Complete lesson in markdown format

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

1. Start a conversation
2. Use a prompt: "Use the start-lesson-creation prompt to help me create a new lesson"
3. Provide your SLT when prompted
4. Follow the guided workflow
5. Review and customize the generated lesson

Or use tools directly:
- "Use the validate-slt tool to check: 'I can create a new Module in Andamio'"
- "Use the suggest-lesson-type tool for this SLT: 'I can integrate Andamio API into my application'"
- "Use the generate-lesson tool to create a product-demo lesson for: 'I can navigate the Andamio Platform dashboard'"

## Troubleshooting

### Server won't start
- Check Node.js version: `node --version` (requires 16+)
- Rebuild: `npm run build`
- Check configuration file path

### Resources not loading
- Verify vault files exist in expected locations
- Check console for file read errors
- Ensure relative paths in resources.ts are correct

---

*Part of the Andamio Lesson Coach project*
