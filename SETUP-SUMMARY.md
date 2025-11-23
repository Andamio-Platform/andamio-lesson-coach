# Andamio Lesson Coach - Setup Summary

> **Quick Start:** See [GETTING-STARTED.md](./GETTING-STARTED.md) for complete setup instructions!

## What's Built

The Andamio Lesson Coach MCP server is fully integrated with the Andamio Database API, providing:

### Complete Lesson Management
- **Fetch lessons** from the API as markdown
- **Create new lessons** for existing SLTs
- **Edit lessons** using AI assistance
- **Update lessons** back to the database
- **Delete lessons** when needed

### Complete SLT Management
- **Fetch all SLTs** for a module
- **Create new SLTs** (max 25 per module)
- **Update SLT text** or reorder
- **Batch reorder** multiple SLTs at once
- **Delete SLTs** (with protection if used in assignments)

### Automatic Content Conversion
All content is automatically converted between Tiptap JSON (database format) and Markdown (editing format).

## Files Overview

**Core Implementation:**
- `src/api-client.ts` - API client with all CRUD operations
- `src/content-converters.ts` - Bidirectional Tiptap JSON ↔ Markdown converter
- `src/tools.ts` - 13 MCP tools for lesson and SLT management
- `src/index.ts` - MCP server entry point with dotenv config

**Documentation:**
- **`GETTING-STARTED.md`** - Complete setup guide ⭐
- **`TOOLS-REFERENCE.md`** - All 13 tools documented
- **`API-INTEGRATION.md`** - API integration details
- **`ENHANCEMENT-SUMMARY.md`** - Recent enhancements
- `README.md` - Project overview

**Configuration:**
- `.env.example` - Environment configuration template
- `.env` - Your local config (create from .env.example)

## Quick Setup

**For complete setup instructions, see [GETTING-STARTED.md](./GETTING-STARTED.md)**

### TL;DR

```bash
# 1. Install & build
npm install && npm run build

# 2. Configure
cp .env.example .env
# Add your JWT token to .env

# 3. Add to Claude Desktop config
# See GETTING-STARTED.md for details

# 4. Restart Claude Desktop
```

## All 13 MCP Tools

### Lesson Generation (3)
1. `validate-slt` - Validate SLT format
2. `suggest-lesson-type` - Recommend lesson type
3. `generate-lesson` - Generate complete lesson

### Lesson Management (5)
4. `fetch-lesson` - Get lesson as markdown
5. `fetch-module-lessons` - List all lessons in module
6. `create-lesson` - Create new lesson
7. `update-lesson` - Update lesson content
8. `delete-lesson` - Remove lesson

### SLT Management (5)
9. `fetch-module-slts` - List all SLTs
10. `create-slt` - Create new SLT
11. `update-slt` - Edit or reorder SLT
12. `batch-reorder-slts` - Batch reorder SLTs
13. `delete-slt` - Delete SLT and lesson

For detailed tool documentation, see [TOOLS-REFERENCE.md](./TOOLS-REFERENCE.md).

## Common Workflows

### Create Module Content
```
fetch-module-slts → create-slt → generate-lesson → create-lesson
```

### Edit Existing Content
```
fetch-lesson → [edit with AI] → update-lesson
```

### Reorganize Module
```
fetch-module-slts → batch-reorder-slts
```

## Documentation

- **[GETTING-STARTED.md](./GETTING-STARTED.md)** - Complete setup guide ⭐
- **[TOOLS-REFERENCE.md](./TOOLS-REFERENCE.md)** - All 13 tools documented
- **[API-INTEGRATION.md](./API-INTEGRATION.md)** - API integration details
- **[ENHANCEMENT-SUMMARY.md](./ENHANCEMENT-SUMMARY.md)** - Recent enhancements
- **[README.md](./README.md)** - Project overview

## Architecture

```
Claude Desktop
    ↓ (MCP Protocol)
Lesson Coach MCP Server (13 tools)
    ↓ (HTTP + JWT)
Andamio DB API (localhost:4000)
    ↓ (Prisma)
PostgreSQL Database
```

**Content Flow:**
```
Generate → Markdown → Convert → Tiptap JSON → Database
Database → Tiptap JSON → Convert → Markdown → Edit
```

## Status

✅ **Phase 1+ Complete - Ready for Development & Testing**

**Features:**
- ✅ 13 MCP tools implemented
- ✅ Full CRUD for SLTs and lessons
- ✅ Automatic content conversion
- ✅ Comprehensive documentation
- ✅ Local DB API integration

**Next Steps:**
1. Set up environment (see GETTING-STARTED.md)
2. Test with real course content
3. Generate and iterate on lessons
4. Provide feedback on quality
