# Lesson Types

This directory contains documentation about the four lesson types supported by the Andamio Lesson Coach.

## Architecture Note

The actual lesson generation logic is implemented in the **MCP server** (`/src/generators/`):
- `/src/generators/product-demo.ts`
- `/src/generators/developer-docs.ts`
- `/src/generators/how-to-guide.ts`
- `/src/generators/org-onboarding.ts`

This directory is for **reference documentation** about each lesson type.

## Four Lesson Types

**1. Product Demo** - Andamio Platform features
- Typical inputs: SLT + screenshot(s)
- Shows learners how to use Platform features

**2. Developer Documentation** - API integration and technical content
- Typical inputs: SLT + code snippet + documentation link
- Technical content for developers integrating with Andamio

**3. How To Guide** - Step-by-step procedural content
- Typical inputs: SLT + (optional) supporting materials
- Clear procedures for accomplishing specific tasks

**4. Organization Onboarding** - Getting started for organizations
- Typical inputs: SLT + (optional) organization-specific context
- Content for organizations setting up and using Andamio

## Adding Documentation (Optional)

If you want to create detailed reference docs for each lesson type, add files here:
- `product-demo.md`
- `developer-docs.md`
- `how-to-guide.md`
- `org-onboarding.md`

Each could include:
1. Purpose and use cases
2. Input requirements
3. Output structure
4. Pedagogical approach
5. Contribution-centered framing
6. Example SLTs and outputs
