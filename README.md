# Andamio Lesson Coach

An MCP (Model Context Protocol) server that provides AI-powered lesson generation for the Andamio platform.

> **Status**: ✅ Phase 1+ Complete - Full implementation with API integration ready for use!
>
> See **[COMPLETION-SUMMARY.md](./COMPLETION-SUMMARY.md)** for the complete feature overview.

## Overview

The Andamio Lesson Coach bridges the gap between domain expertise and pedagogical design, enabling domain experts to create high-quality, student-centered lessons without requiring teaching expertise.

**The coach bridges this gap:**
- Domain expert provides: What needs to be learned (the SLT, the expertise)
- Coach provides: How to teach it (structure, pedagogy, student-centered design)
- Result: High-quality lessons without requiring teaching expertise

## Quick Start

**For Developers (with andamio-db-api running locally):**

See **[GETTING-STARTED.md](./GETTING-STARTED.md)** for the complete setup guide.

**TL;DR:**
```bash
# 1. Install and build
npm install && npm run build

# 2. Set up environment
cp .env.example .env
# Edit .env and add your JWT token

# 3. Configure Claude Desktop
# Add to ~/Library/Application Support/Claude/claude_desktop_config.json
{
  "mcpServers": {
    "andamio-lesson-coach": {
      "command": "node",
      "args": ["/path/to/andamio-lesson-coach/build/index.js"]
    }
  }
}

# 4. Restart Claude Desktop and start using the tools!
```

For detailed instructions, see:
- **[GETTING-STARTED.md](./GETTING-STARTED.md)** - Complete setup with local DB API
- **[DEPLOY-TO-CLAUDE-DESKTOP.md](./docs/DEPLOY-TO-CLAUDE-DESKTOP.md)** - Step-by-step deployment
- **[TOOLS-REFERENCE.md](./TOOLS-REFERENCE.md)** - All 13 tools documented

## How It Works

**Input:** Student Learning Target (SLT) - "I can [specific capability]"
**Output:** Complete lesson in markdown format

**The coach handles (90%):** Lesson structure, pedagogy, flow, teaching best practices
**Course creator adds (10%):** Domain expertise, organization context, specific examples

## Critical Framing

Andamio is NOT a Learning Management System. Learning happens in service of someone becoming a contributor to a Project. This must be implicit in everything the coach creates.

**Andamio Structure:**
- **Projects** - Where actual contribution happens
- **Courses** - Can serve as prerequisites to joining Projects
- **Modules** - Each Module can be a Credential on the blockchain
- **SLTs** - "I can" statements at the core of UX
- **Lessons** - Optional, created when we need to teach (not just have them prove)
- **Assignments** - What learners do to prove what they know

**Module Definition:**
```
Module = SLTs + Assignment
```

## MCP Features

### Tools

**Lesson Generation:**
- **`validate-slt`** - Validates Student Learning Targets follow "I can..." format
- **`suggest-lesson-type`** - Recommends appropriate lesson type based on SLT content
- **`generate-lesson`** - Generates complete lesson from SLT and lesson type

**Lesson API Integration:**
- **`fetch-lesson`** - Fetch a lesson from Andamio DB API and convert to markdown
- **`fetch-module-lessons`** - Fetch all lessons for a module from Andamio DB API
- **`create-lesson`** - Create a new lesson for an existing SLT with markdown content
- **`update-lesson`** - Update a lesson in Andamio DB API with markdown content
- **`delete-lesson`** - Delete a lesson from the database

**SLT Management:**
- **`fetch-module-slts`** - Fetch all SLTs for a module
- **`create-slt`** - Create a new SLT in a module (max 25 per module)
- **`update-slt`** - Update an SLT's text or reorder it
- **`batch-reorder-slts`** - Batch update multiple SLT indexes at once
- **`delete-slt`** - Delete an SLT and its lesson (fails if used in an assignment)

**Content Conversion:**
- Automatic markdown ↔ Tiptap JSON conversion for all lesson operations
- Preserves formatting, headings, lists, code blocks, links, and images

See [API-INTEGRATION.md](./API-INTEGRATION.md) for API integration details.

### Prompts

- **`start-lesson-creation`** - Interactive workflow for creating new lessons
- **`generate-product-demo`** - Platform feature demonstrations
- **`generate-developer-docs`** - Technical integration documentation
- **`generate-how-to-guide`** - Step-by-step procedural content
- **`generate-org-onboarding`** - Organizational onboarding content

### Resources

- `coach://readme` - Main lesson coach overview
- `coach://language-guide` - Contribution-centered vs LMS language patterns
- `coach://lesson-types/overview` - Lesson type specifications
- Plus context materials and examples

## Lesson Types

**1. Product Demo** - Shows learners how to use Andamio Platform features
- Inputs: SLT + screenshots

**2. Developer Documentation** - Technical content for developers integrating with Andamio
- Inputs: SLT + code snippet + documentation link

**3. How To Guide** - Step-by-step procedural content
- Inputs: SLT + supporting materials

**4. Organization Onboarding** - Content for organizations getting started with Andamio
- Inputs: SLT + organization-specific context

## Key Principles

**1. Contribution-Centered**
- Every lesson connects to how this knowledge enables contribution to a Project
- Not "learn for learning's sake" but "learn to contribute"

**2. SLT-Driven**
- Input: "I can [specific capability]"
- Output: Lesson that enables that capability

**3. Assignment-Aware**
- Lessons prepare for the Module Assignment
- Focus on what learners need to prove they know

**4. NOT an LMS**
- Avoid LMS language and patterns
- Emphasize: "What do you need to know to contribute?"

## Project Structure

```
src/                    # TypeScript source code
├── index.ts           # MCP server entry point
├── resources.ts       # Knowledge base resources
├── tools.ts           # Lesson generation tools
├── prompts.ts         # Pre-configured prompts
└── generators/        # Lesson type generators
    ├── product-demo.ts
    ├── developer-docs.ts
    ├── how-to-guide.ts
    └── org-onboarding.ts

build/                 # Compiled JavaScript output

docs/                  # Comprehensive documentation
├── README.md          # Documentation index
├── QUICK-START.md     # Fast-track setup guide
├── DEPLOY-TO-CLAUDE-DESKTOP.md
├── DEPLOYMENT-PLAN.md
├── DECISION-FRAMEWORK.md
├── COMMERCIALIZATION-STRATEGY.md
├── MARKETPLACE-INTEGRATION-GUIDE.md
└── TESTING-CHECKLIST.md

context/               # Background materials and guidelines
lesson-types/          # Lesson type specifications
courses/               # Generated lesson output
generated-lessons/     # Test output during development
```

## Deployment Options

**Phase 1 (Current)**: Local Development & Claude Desktop
- ✅ MCP server scaffolding complete
- ✅ Tools, prompts, and resources implemented
- 🔄 Testing and validation in progress

**Phase 2**: NPM Package & Smithery Marketplace
- Publish to npm for easy installation
- List on Smithery marketplace
- Enable broader distribution

**Phase 3**: Andamio Platform Integration
- Embed in Platform UI
- Direct database integration
- Production deployment

**Phase 4**: Enhanced Features
- Markdown ↔ Prosemirror JSON conversion
- Image placement and formatted text
- User testing and iteration

See [DEPLOYMENT-PLAN.md](./docs/DEPLOYMENT-PLAN.md) for details.

## Example Usage

### In Claude Desktop

Use the interactive prompt:
```
Use the start-lesson-creation prompt to create a new lesson
```

Or use tools directly:
```
Use the validate-slt tool to check: "I can create a new Module in Andamio"

Use the suggest-lesson-type tool for this SLT: "I can integrate Andamio API"

Use the generate-lesson tool to create a product-demo lesson for:
"I can navigate the Andamio Platform dashboard"
```

The coach will generate a complete lesson with:
- Clear learning objective
- Contribution-centered framing
- Step-by-step guidance
- Assignment preparation
- Markdown format ready for Platform

## Why This Matters

Without the coach, domain experts either:
1. Spend months learning instructional design (slow, expensive)
2. Hire instructional designers (expensive, doesn't scale)
3. Create poor lessons that don't actually teach (learners struggle, credentials lose value)

**The coach makes teaching expertise infrastructure.**

By packaging this as an MCP server, we make pedagogical expertise available as a composable tool that works wherever Claude works.

## Development

```bash
# Install dependencies
npm install

# Development mode (watch for changes)
npm run dev

# Build for production
npm run build

# Run tests (when implemented)
npm test
```

## Documentation

📚 **[GETTING-STARTED.md](./GETTING-STARTED.md)** - Start here! Complete setup guide for developers

**Quick Links:**
- [GETTING-STARTED.md](./GETTING-STARTED.md) - Complete setup with local DB API ⭐
- [TOOLS-REFERENCE.md](./TOOLS-REFERENCE.md) - All 13 tools documented
- [API-INTEGRATION.md](./API-INTEGRATION.md) - API integration details
- [ENHANCEMENT-SUMMARY.md](./ENHANCEMENT-SUMMARY.md) - Recent enhancements
- [MCP Server Documentation](./MCP-SERVER.md) - User-facing docs

**More Documentation:**
- [Full Documentation Index](./docs/README.md) - All documentation
- [Quick Start Guide](./docs/QUICK-START.md) - Fast-track setup
- [Deploy to Claude Desktop](./docs/DEPLOY-TO-CLAUDE-DESKTOP.md) - Step-by-step
- [Testing Checklist](./docs/TESTING-CHECKLIST.md) - Quality assurance

**Strategic Docs:**
- [Decision Framework](./docs/DECISION-FRAMEWORK.md) - Choose your commercialization path
- [Commercialization Strategy](./docs/COMMERCIALIZATION-STRATEGY.md)
- [Marketplace Integration](./docs/MARKETPLACE-INTEGRATION-GUIDE.md)

## Contributing

This project is part of the Andamio ecosystem. See [CLAUDE.md](./CLAUDE.md) for development guidelines.

## License

TBD - See [DECISION-FRAMEWORK.md](./docs/DECISION-FRAMEWORK.md) for licensing options discussion

---

*Version: Phase 1 Complete - November 2025*
*Part of the [Andamio Platform](https://andamio.io)*
