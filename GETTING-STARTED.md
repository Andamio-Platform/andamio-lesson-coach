# Getting Started with Andamio Lesson Coach

**Quick setup guide for developers working with the Andamio platform.**

This guide assumes you have the `andamio-db-api` running locally. If not, set that up first.

---

## Prerequisites

- **Node.js** 18+ installed
- **Andamio DB API** running on `localhost:4000`
- **Database** with at least one course and module created
- **User account** with Creator role

---

## 1. Install & Build

```bash
# Clone or navigate to the repo
cd /Users/james/projects/01-projects/andamio-lesson-coach

# Install dependencies
npm install

# Build the MCP server
npm run build
```

---

## 2. Configure Environment

Create a `.env` file:

```bash
cp .env.example .env
```

Edit `.env`:

```bash
# Point to your local DB API
ANDAMIO_API_URL=http://localhost:4000/api/v0

# Generate a JWT token (instructions below)
ANDAMIO_JWT_TOKEN=your-jwt-token-here

# Optional: Enable debug logging
DEBUG=false
```

### Generate JWT Token

```bash
# Navigate to the DB API
cd ~/projects/01-projects/andamio-platform/andamio-platform-monorepo/andamio-db-api

# Generate token (replace with your actual user ID and wallet address)
npx tsx scripts/generate-test-jwt.ts <your-user-id> <your-wallet-address>

# Copy the output token to your .env file
```

**Important:** The user must have Creator role and permission to edit the course you're working with.

---

## 3. Set Up Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:

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

If you already have other MCP servers, just add the `andamio-lesson-coach` entry to the existing `mcpServers` object.

**Restart Claude Desktop** completely (quit and reopen, not just close the window).

---

## 4. Verify Installation

Open Claude Desktop and try:

```
List the available MCP tools from andamio-lesson-coach
```

You should see 13 tools:
- **Lesson Generation:** validate-slt, suggest-lesson-type, generate-lesson
- **Lesson Management:** fetch-lesson, fetch-module-lessons, create-lesson, update-lesson, delete-lesson
- **SLT Management:** fetch-module-slts, create-slt, update-slt, batch-reorder-slts, delete-slt

---

## 5. Quick Test

Get your course and module identifiers from your local database, then try:

### Test 1: Fetch SLTs

```
Use the fetch-module-slts tool with:
- courseNftPolicyId: "your-course-policy-id"
- moduleCode: "your-module-code"
```

### Test 2: Generate a Lesson

```
Use the generate-lesson tool to create a product-demo lesson for:
"I can create a new Module in the Andamio Platform"
```

### Test 3: Create a Lesson in the Database

```
Use the create-lesson tool with:
- courseNftPolicyId: "your-course-policy-id"
- moduleCode: "your-module-code"
- moduleIndex: 0
- markdownContent: "[paste the generated lesson from Test 2]"
```

---

## Common Workflows

### Workflow 1: Build a Module from Scratch

```bash
# Step 1: Create SLTs
Use create-slt to add:
- "I can create a new Module" (index 0)
- "I can add SLTs to a Module" (index 1)
- "I can create lessons for SLTs" (index 2)

# Step 2: Generate lessons
Use generate-lesson for each SLT

# Step 3: Save to database
Use create-lesson for each SLT with the generated content

# Step 4: Verify
Use fetch-module-lessons to see all lessons
```

### Workflow 2: Edit Existing Content

```bash
# Step 1: Fetch the lesson
Use fetch-lesson to get current content

# Step 2: Edit with AI
Ask Claude to improve the content

# Step 3: Update
Use update-lesson with the improved content

# Step 4: Publish
Use update-lesson with live: true
```

### Workflow 3: Reorganize Module

```bash
# Step 1: View current structure
Use fetch-module-slts

# Step 2: Reorder
Use batch-reorder-slts with new order

# Step 3: Verify
Use fetch-module-slts again to confirm
```

---

## Available Tools Reference

### Lesson Generation

| Tool | Purpose | Key Parameters |
|------|---------|----------------|
| `validate-slt` | Check if SLT follows "I can..." format | `slt` |
| `suggest-lesson-type` | Get lesson type recommendation | `slt` |
| `generate-lesson` | Create complete lesson | `slt`, `lessonType`, `materials` |

### Lesson Management

| Tool | Purpose | Key Parameters |
|------|---------|----------------|
| `fetch-lesson` | Get lesson as markdown | `courseNftPolicyId`, `moduleCode`, `moduleIndex` |
| `fetch-module-lessons` | List all lessons in module | `courseNftPolicyId`, `moduleCode` |
| `create-lesson` | Create new lesson | `courseNftPolicyId`, `moduleCode`, `moduleIndex`, `markdownContent` |
| `update-lesson` | Update lesson content | `courseNftPolicyId`, `moduleCode`, `moduleIndex`, `markdownContent` |
| `delete-lesson` | Remove lesson | `courseNftPolicyId`, `moduleCode`, `moduleIndex` |

### SLT Management

| Tool | Purpose | Key Parameters |
|------|---------|----------------|
| `fetch-module-slts` | List all SLTs | `courseNftPolicyId`, `moduleCode` |
| `create-slt` | Create new SLT | `courseNftPolicyId`, `moduleCode`, `moduleIndex`, `sltText` |
| `update-slt` | Edit or reorder SLT | `courseNftPolicyId`, `moduleCode`, `moduleIndex`, `sltText`, `newModuleIndex` |
| `batch-reorder-slts` | Reorder multiple SLTs | `updates: [{id, moduleIndex}]` |
| `delete-slt` | Delete SLT and lesson | `courseNftPolicyId`, `moduleCode`, `moduleIndex` |

For detailed tool documentation, see [TOOLS-REFERENCE.md](./TOOLS-REFERENCE.md).

---

## Lesson Types

### 1. Product Demo
**When to use:** Teaching Andamio Platform features
**Inputs:** SLT + screenshots (optional)
**Example:** "I can create a new Module in the Andamio Platform"

### 2. Developer Docs
**When to use:** Technical integration and API usage
**Inputs:** SLT + code examples + docs link
**Example:** "I can integrate the Andamio API into my Next.js app"

### 3. How-To Guide
**When to use:** Step-by-step procedures
**Inputs:** SLT + supporting materials
**Example:** "I can set up a contribution treasury for my Project"

### 4. Organization Onboarding
**When to use:** Getting started content for organizations
**Inputs:** SLT + org context
**Example:** "I can configure my organization's first Course"

---

## Content Format

All lessons use **Markdown** for editing, which is automatically converted to **Tiptap JSON** for database storage.

### Supported Features

- Headings: `# H1`, `## H2`, `### H3`
- Text formatting: `**bold**`, `*italic*`, `` `code` ``
- Lists: Ordered (`1.`) and unordered (`-`)
- Code blocks: ` ```language ... ``` `
- Links: `[text](url)`
- Images: `![alt](url)`
- Blockquotes: `> quote`
- Horizontal rules: `---`

---

## Troubleshooting

### JWT Token Issues

**Error:** "ANDAMIO_JWT_TOKEN environment variable is required"

**Solution:**
1. Make sure `.env` file exists
2. Verify `ANDAMIO_JWT_TOKEN=` has a value
3. Restart Claude Desktop after changing `.env`

**Error:** "Failed to fetch lesson (403)"

**Solution:**
1. JWT token may have expired (regenerate)
2. User doesn't have Creator role
3. User doesn't have permission to edit this course

### Database Connection

**Error:** "Failed to fetch lesson (404)"

**Solution:**
1. Verify `andamio-db-api` is running on localhost:4000
2. Check that course/module/SLT exists in database
3. Verify courseNftPolicyId and moduleCode are correct

**Error:** "ECONNREFUSED"

**Solution:**
1. Start the DB API: `cd ~/projects/01-projects/andamio-platform/andamio-platform-monorepo/andamio-db-api && npm run dev`
2. Verify it's running on port 4000
3. Check `.env` has correct `ANDAMIO_API_URL`

### Content Issues

**Error:** "Failed to create lesson (409 Conflict)"

**Solution:** Lesson already exists for this SLT. Use `update-lesson` instead or delete the existing lesson first.

**Error:** "Failed to create SLT (409 Conflict)"

**Solution:** An SLT with this moduleIndex already exists. Either:
- Choose a different moduleIndex
- Update the existing SLT instead
- Delete the existing SLT first

### Claude Desktop Issues

**MCP server not showing up:**

1. Verify config file path and content
2. Check that `build/index.js` exists
3. Completely quit and restart Claude Desktop
4. Check Console.app for errors (macOS)

**Tools working but returning errors:**

1. Enable debug mode: `DEBUG=true` in `.env`
2. Check terminal output for detailed errors
3. Verify database has the expected data

---

## Development Workflow

### Watch Mode

```bash
# Terminal 1: Run DB API
cd ~/projects/01-projects/andamio-platform/andamio-platform-monorepo/andamio-db-api
npm run dev

# Terminal 2: Watch for changes
cd ~/projects/01-projects/andamio-lesson-coach
npm run dev
```

### After Making Changes

1. Stop watch mode (Ctrl+C)
2. Build: `npm run build`
3. Restart Claude Desktop
4. Test your changes

### Enable Debug Logging

Set `DEBUG=true` in `.env` to see detailed API requests and responses.

---

## Understanding the Stack

```
Claude Desktop
    ↓ (MCP Protocol)
Lesson Coach MCP Server
    ↓ (fetch/create/update tools)
API Client (src/api-client.ts)
    ↓ (HTTP + JWT)
Andamio DB API (localhost:4000)
    ↓ (Prisma)
PostgreSQL Database
```

**Content Flow:**
```
Generate Lesson (Markdown)
    ↓
Create in Database (converts to Tiptap JSON)
    ↓
Fetch from Database (converts back to Markdown)
    ↓
Edit with AI
    ↓
Update in Database (converts to Tiptap JSON)
```

---

## Next Steps

Once you're comfortable with the basics:

1. **Review Examples:** Check `/generated-lessons/` for sample output
2. **Understand Principles:** Read [CLAUDE.md](./CLAUDE.md) for content guidelines
3. **Build Real Content:** Create lessons for your actual courses
4. **Provide Feedback:** Document what works and what doesn't

---

## Additional Documentation

- **[TOOLS-REFERENCE.md](./TOOLS-REFERENCE.md)** - Complete tool documentation with examples
- **[API-INTEGRATION.md](./API-INTEGRATION.md)** - API integration details
- **[ENHANCEMENT-SUMMARY.md](./ENHANCEMENT-SUMMARY.md)** - Recent enhancements
- **[README.md](./README.md)** - Full project overview
- **[docs/](./docs/)** - Comprehensive documentation

---

## Getting Help

**Issues with the Lesson Coach:**
- Check this guide first
- Review error messages carefully
- Enable debug mode for more details

**Issues with the DB API:**
- See andamio-db-api documentation
- Check database connection
- Verify user permissions

**Issues with Generated Content:**
- Review lesson type guidelines
- Check the SLT validation
- Try different lesson types

---

**Ready to start?** Jump to [Quick Test](#5-quick-test) and try your first lesson!
