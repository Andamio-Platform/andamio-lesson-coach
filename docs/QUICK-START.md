# Quick Start Guide - Andamio Lesson Coach MCP

## For Local Development (Claude Code)

The MCP server is already configured in `.mcp.json` and ready to use!

### 1. Build the Server

```bash
npm run build
```

### 2. Use in Claude Code

The server is automatically available. Try these commands in Claude Code:

```
Use the start-lesson-creation prompt
```

```
Use the validate-slt tool to check: "I can create a new Module in the Andamio Platform"
```

```
Use the suggest-lesson-type tool for this SLT: "I can integrate Andamio API into my application"
```

### 3. Generate Your First Lesson

```
Use the generate-lesson tool to create a product-demo lesson for:
"I can navigate the Andamio Platform dashboard"
```

---

## For Claude Desktop

### 1. Build the Server

```bash
cd /Users/james/projects/01-projects/andamio-lesson-coach
npm run build
```

### 2. Configure Claude Desktop

**macOS**: Edit `~/Library/Application Support/Claude/claude_desktop_config.json`

Add this configuration:

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

If you already have other MCP servers configured, add the `andamio-lesson-coach` entry to the existing `mcpServers` object.

### 3. Restart Claude Desktop

Completely quit and restart Claude Desktop for the configuration to take effect.

### 4. Verify Installation

Open a new conversation in Claude Desktop and check for the MCP indicator (usually in the bottom-left).

Try this prompt:

```
Use the start-lesson-creation prompt to help me create a lesson
```

You should see the MCP server respond with the lesson creation workflow.

---

## Testing the Installation

### Test 1: Validate an SLT

**Prompt**:
```
Use the validate-slt tool to check this SLT: "I can understand blockchain"
```

**Expected Result**:
Should return invalid with suggestions (because "understand" is too vague).

### Test 2: Get Lesson Type Suggestion

**Prompt**:
```
Use the suggest-lesson-type tool for: "I can create a new Module in the Andamio Platform"
```

**Expected Result**:
Should recommend "product-demo" with rationale.

### Test 3: Generate a Simple Lesson

**Prompt**:
```
Use the generate-lesson tool with:
- slt: "I can create a new Module in the Andamio Platform"
- lessonType: "product-demo"
```

**Expected Result**:
Should return a complete lesson in markdown format.

### Test 4: Use Guided Workflow

**Prompt**:
```
Use the start-lesson-creation prompt
```

**Expected Result**:
Should start an interactive workflow asking for your SLT.

---

## Available Resources

You can access these knowledge base resources:

- `coach://readme` - Main overview
- `coach://language-guide` - Contribution-centered language patterns
- `coach://context/readme` - Context materials overview
- `coach://lesson-types/overview` - Lesson type descriptions
- `coach://claude-instructions` - Project instructions

**Example**:
```
Show me the coach://language-guide resource
```

---

## Lesson Types & When to Use Them

### 1. Product Demo
**Use for**: Andamio Platform feature demonstrations
**Inputs**: SLT + screenshots (optional)
**Example SLT**: "I can create a new Module in the Andamio Platform"

### 2. Developer Documentation
**Use for**: Technical integration and API usage
**Inputs**: SLT + code examples + docs links (optional)
**Example SLT**: "I can integrate the Andamio API into my Next.js application"

### 3. How-To Guide
**Use for**: Step-by-step procedures and workflows
**Inputs**: SLT + supporting materials (optional)
**Example SLT**: "I can set up a contribution treasury for my Project"

### 4. Organization Onboarding
**Use for**: Getting started with Andamio as an organization
**Inputs**: SLT + organization context (optional)
**Example SLT**: "I can configure my organization's first Course on Andamio"

---

## Development Workflow

### Watch Mode (for development)

```bash
npm run dev
```

This will rebuild automatically when you make changes to TypeScript files.

### After Making Changes

1. Stop watch mode (Ctrl+C)
2. Build: `npm run build`
3. Restart Claude Desktop (if using Claude Desktop)
4. Test your changes

---

## Troubleshooting

### "MCP server not found" in Claude Desktop

1. Check config file location:
   ```bash
   cat ~/Library/Application\ Support/Claude/claude_desktop_config.json
   ```

2. Verify the path to `build/index.js` is correct

3. Ensure the build succeeded:
   ```bash
   ls -la /Users/james/projects/01-projects/andamio-lesson-coach/build/
   ```

4. Restart Claude Desktop completely (quit, not just close window)

### "Error reading file" in resources

The MCP server needs to read vault files. Ensure:
1. Files exist in expected locations
2. Paths in `src/resources.ts` are correct
3. Files have read permissions

### Build Errors

```bash
# Clean and rebuild
rm -rf build/
npm run build
```

### Tool Not Working

Check the MCP server logs (varies by client):
- Claude Desktop: Check Console.app for errors
- Claude Code: Errors appear in terminal output

---

## Next Steps

After verifying the installation:

1. **Generate test lessons** - Create 2-3 lessons for each type
2. **Evaluate quality** - How much manual editing is needed?
3. **Iterate on prompts** - Improve generators based on output
4. **Build real content** - Use for actual course development

See [DEPLOYMENT-PLAN.md](./DEPLOYMENT-PLAN.md) for the full roadmap.

---

## Getting Help

- Check [MCP-SERVER.md](../MCP-SERVER.md) for detailed tool documentation
- Review [CLAUDE.md](../CLAUDE.md) for project context
- See generated lessons in `/generated-lessons/` for examples
