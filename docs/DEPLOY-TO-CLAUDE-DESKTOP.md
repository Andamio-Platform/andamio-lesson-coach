# Deploy to Claude Desktop - Step-by-Step Runbook

This runbook walks through deploying the Andamio Lesson Coach MCP to Claude Desktop.

**Estimated Time**: 10 minutes
**Prerequisites**: Node.js 16+, Claude Desktop installed

---

## Step 1: Build the Production Version

```bash
cd /Users/james/projects/01-projects/andamio-lesson-coach
npm run build
```

**Verify**:
```bash
ls -la build/
# Should see: index.js, tools.js, prompts.js, resources.js, generators/
```

Expected output: Build completes without errors, all files present.

---

## Step 2: Locate Claude Desktop Config File

**macOS**:
```bash
# Check if config file exists
cat ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

**If file doesn't exist**, create it:
```bash
# Create directory if needed
mkdir -p ~/Library/Application\ Support/Claude/

# Create empty config
echo '{"mcpServers":{}}' > ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

---

## Step 3: Backup Current Config (if exists)

```bash
# Create backup
cp ~/Library/Application\ Support/Claude/claude_desktop_config.json \
   ~/Library/Application\ Support/Claude/claude_desktop_config.json.backup.$(date +%Y%m%d-%H%M%S)
```

---

## Step 4: Add MCP Server Configuration

Open the config file in your editor:

```bash
open -a "TextEdit" ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

Or using vim/nano:
```bash
vim ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

### If config is empty or has no other servers:

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

### If you already have other MCP servers configured:

Add the `andamio-lesson-coach` entry to the existing `mcpServers` object:

```json
{
  "mcpServers": {
    "existing-server": {
      "command": "...",
      "args": ["..."]
    },
    "andamio-lesson-coach": {
      "command": "node",
      "args": [
        "/Users/james/projects/01-projects/andamio-lesson-coach/build/index.js"
      ]
    }
  }
}
```

**Important**: Ensure valid JSON (no trailing commas on last entry).

Save and close the file.

---

## Step 5: Verify Config Syntax

```bash
# Check JSON is valid
python3 -m json.tool ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

If valid, you'll see the formatted JSON. If invalid, you'll see an error.

---

## Step 6: Restart Claude Desktop

1. **Quit Claude Desktop completely**
   - Cmd+Q (not just close the window)
   - Or: Right-click icon in Dock → Quit

2. **Verify it's closed**
   ```bash
   ps aux | grep Claude
   # Should not show Claude Desktop process
   ```

3. **Restart Claude Desktop**
   - Open from Applications folder or Spotlight

---

## Step 7: Verify MCP Server is Running

1. Open Claude Desktop
2. Look for MCP indicator (usually bottom-left or in status area)
3. Check that server count increased by 1

---

## Step 8: Test Basic Functionality

Open a new conversation in Claude Desktop.

### Test 1: Check Tools are Available

**Prompt**:
```
What MCP tools do you have available?
```

Look for:
- `validate-slt`
- `suggest-lesson-type`
- `generate-lesson`

### Test 2: Validate an SLT

**Prompt**:
```
Use the validate-slt tool to check this SLT: "I can create a new Module in the Andamio Platform"
```

**Expected**: Should return valid with success message.

### Test 3: Generate a Simple Lesson

**Prompt**:
```
Use the generate-lesson tool with:
- slt: "I can navigate the Andamio Platform dashboard"
- lessonType: "product-demo"
```

**Expected**: Should return a markdown lesson.

### Test 4: Use Guided Workflow

**Prompt**:
```
Use the start-lesson-creation prompt
```

**Expected**: Should start interactive lesson creation workflow.

---

## Step 9: Test Resources (Optional)

**Prompt**:
```
Show me the coach://language-guide resource
```

**Expected**: Should display the language guide content.

---

## Step 10: Verify No Errors

Check for MCP-related errors:

1. **macOS Console App**:
   ```bash
   # Open Console.app
   open -a Console
   ```

2. Filter for "Claude" or "MCP"
3. Look for errors related to andamio-lesson-coach
4. Common errors:
   - "Cannot find module" → Check build/ directory exists
   - "ENOENT" → Check file paths in config
   - "Permission denied" → Check file permissions

---

## Troubleshooting

### Issue: MCP Server Not Appearing

**Solution**:
1. Verify config file syntax (Step 5)
2. Check path to build/index.js is correct
3. Restart Claude Desktop completely
4. Check Console.app for errors

### Issue: "Cannot find module" Error

**Solution**:
1. Rebuild: `npm run build`
2. Verify build artifacts: `ls -la build/`
3. Check that node_modules exists
4. Restart Claude Desktop

### Issue: Resources Not Loading

**Solution**:
1. Check that vault files exist:
   ```bash
   ls -la context/
   ls -la lesson-types/
   ```
2. Verify file permissions
3. Check Console.app for specific file errors

### Issue: Tools Work But Generate Poor Content

**Solution**:
This is expected in early testing. Document issues and iterate on generators in `src/generators/`.

### Issue: Claude Desktop Won't Start

**Solution**:
1. Restore backup config:
   ```bash
   cp ~/Library/Application\ Support/Claude/claude_desktop_config.json.backup.* \
      ~/Library/Application\ Support/Claude/claude_desktop_config.json
   ```
2. Restart Claude Desktop
3. Check for JSON syntax errors in config

---

## Rollback Procedure

If you need to remove the MCP server:

### Option 1: Remove Just This Server

Edit config file and remove the `andamio-lesson-coach` entry, then restart Claude Desktop.

### Option 2: Restore Backup

```bash
# List backups
ls -la ~/Library/Application\ Support/Claude/*.backup.*

# Restore specific backup
cp ~/Library/Application\ Support/Claude/claude_desktop_config.json.backup.TIMESTAMP \
   ~/Library/Application\ Support/Claude/claude_desktop_config.json

# Restart Claude Desktop
```

---

## Post-Deployment Checklist

After successful deployment:

- [ ] All 3 tools working (validate-slt, suggest-lesson-type, generate-lesson)
- [ ] All 5 prompts available (start-lesson-creation, + 4 generators)
- [ ] Resources load correctly
- [ ] No errors in Console.app
- [ ] Generated lessons are reasonable quality
- [ ] Documented any issues for improvement

---

## Next Steps

1. **Daily Use**: Use the lesson coach in your regular workflow
2. **Generate Test Lessons**: Create 8-12 lessons across all types
3. **Iterate**: Update generators based on output quality
4. **Track Issues**: Note any problems or enhancement ideas
5. **Validate Phase 1**: Assess against success criteria

See [TESTING-CHECKLIST.md](./TESTING-CHECKLIST.md) for comprehensive testing.

---

## Quick Reference

### Rebuild After Changes
```bash
cd /Users/james/projects/01-projects/andamio-lesson-coach
npm run build
# Then restart Claude Desktop
```

### Config File Location
```
~/Library/Application Support/Claude/claude_desktop_config.json
```

### Check Server Status
Look for MCP indicator in Claude Desktop UI

### View Logs
Console.app → Filter for "Claude" or "MCP"

---

**Last Updated**: 2025-11-14
**Status**: Ready for deployment
**Phase**: Phase 1 - Claude Desktop Deployment
