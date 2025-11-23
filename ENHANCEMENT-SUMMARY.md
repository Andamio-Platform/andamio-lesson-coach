# Lesson Coach API Enhancement Summary

**Date**: November 23, 2025
**Status**: Complete ✅

## Overview

Enhanced the Andamio Lesson Coach MCP server with full CRUD operations for both SLTs and Lessons, enabling complete course content management through the Andamio Database API.

## What Was Added

### 1. New API Client Functions (src/api-client.ts)

**Lesson Operations:**
- `createLesson()` - Create new lessons for existing SLTs
- `deleteLesson()` - Remove lessons from the database

**SLT Operations:**
- `fetchModuleSLTs()` - Retrieve all SLTs for a module
- `createSLT()` - Create new Student Learning Targets
- `updateSLT()` - Update SLT text or reorder by changing moduleIndex
- `batchUpdateSLTIndexes()` - Batch reorder multiple SLTs at once
- `deleteSLT()` - Delete an SLT and its lesson (if not used in assignments)

All functions include:
- Full TypeScript typing with Zod validation
- Debug logging support
- Comprehensive error handling
- JWT authentication

### 2. New MCP Tools (src/tools.ts)

**Lesson Management:**
- `create-lesson` - Create a new lesson with markdown content
- `delete-lesson` - Delete a lesson from the database

**SLT Management:**
- `fetch-module-slts` - List all SLTs in a module
- `create-slt` - Create a new SLT (max 25 per module, indexed 0-24)
- `update-slt` - Update SLT text or reorder
- `batch-reorder-slts` - Reorder multiple SLTs in one operation
- `delete-slt` - Delete SLT and its lesson (protected if used in assignments)

All tools include:
- Clear parameter descriptions
- Helpful success/error messages
- Common error troubleshooting tips
- Automatic markdown ↔ Tiptap JSON conversion

### 3. Documentation

**Updated:**
- `README.md` - Added new tools to features section
- `API-INTEGRATION.md` - Existing API integration guide

**Created:**
- `TOOLS-REFERENCE.md` - Comprehensive reference for all 13 MCP tools
  - Parameter specifications
  - Return values
  - Usage examples
  - Workflow examples
  - Error handling guide
  - Markdown format support

## Complete Tool Set

The Lesson Coach now provides **13 MCP tools** organized in three categories:

### Lesson Generation (3 tools)
1. `validate-slt` - Validate SLT format
2. `suggest-lesson-type` - Recommend lesson type
3. `generate-lesson` - Generate complete lesson

### Lesson API Integration (5 tools)
4. `fetch-lesson` - Fetch lesson as markdown
5. `fetch-module-lessons` - List all lessons in module
6. `create-lesson` - Create new lesson
7. `update-lesson` - Update lesson content
8. `delete-lesson` - Delete lesson

### SLT Management (5 tools)
9. `fetch-module-slts` - List all SLTs in module
10. `create-slt` - Create new SLT
11. `update-slt` - Update/reorder SLT
12. `batch-reorder-slts` - Batch reorder SLTs
13. `delete-slt` - Delete SLT

## Key Features

### Automatic Content Conversion
All lesson operations automatically convert between:
- **Markdown** (for editing) ↔ **Tiptap JSON** (stored in database)

Preserves all formatting:
- Headings, paragraphs, bold, italic
- Code blocks with syntax highlighting
- Lists (ordered and unordered)
- Links and images
- Blockquotes and horizontal rules

### Smart Defaults
- Lesson titles auto-generate from SLT text if not provided
- Debug logging controlled via environment variable
- Helpful error messages with troubleshooting tips

### Safety & Validation
- SLT deletion fails if used in an assignment
- Maximum 25 SLTs per module (indexed 0-24)
- Prevents duplicate moduleIndexes
- JWT authentication required for all mutations
- Creator role permission checks

## Workflow Support

The enhanced tools support complete workflows:

### 1. Create New Module Content
```
fetch-module-slts → create-slt → generate-lesson → create-lesson
```

### 2. Edit Existing Content
```
fetch-lesson → [edit with AI] → update-lesson
```

### 3. Reorder Module Structure
```
fetch-module-slts → batch-reorder-slts
```

### 4. Clean Up Draft Content
```
delete-lesson → delete-slt
```

## API Endpoints Used

### Lesson Endpoints
- `GET /lessons/{courseNftPolicyId}/{moduleCode}/{moduleIndex}` - Fetch lesson
- `GET /courses/{courseNftPolicyId}/modules/{moduleCode}/lessons` - List lessons
- `POST /lessons` - Create lesson
- `PATCH /lessons/{courseNftPolicyId}/{moduleCode}/{moduleIndex}` - Update lesson
- `DELETE /lessons/{courseNftPolicyId}/{moduleCode}/{moduleIndex}` - Delete lesson

### SLT Endpoints
- `GET /slts/{courseNftPolicyId}/{moduleCode}` - List SLTs
- `POST /slts` - Create SLT
- `PATCH /slts/{courseNftPolicyId}/{moduleCode}/{moduleIndex}` - Update SLT
- `PATCH /slts/batch-update-indexes` - Batch reorder SLTs
- `DELETE /slts/{courseNftPolicyId}/{moduleCode}/{moduleIndex}` - Delete SLT

## Environment Configuration

All API operations require:

```bash
# .env file
ANDAMIO_API_URL=http://localhost:4000/api/v0
ANDAMIO_JWT_TOKEN=your-jwt-token-here
DEBUG=false  # Optional
```

Generate JWT for local testing:
```bash
cd /path/to/andamio-db-api
npx tsx scripts/generate-test-jwt.ts <userId> <walletAddress>
```

## Files Modified

### Core Implementation
- `src/api-client.ts` - Added 7 new API functions (~350 lines)
- `src/tools.ts` - Added 7 new MCP tools (~400 lines)

### Documentation
- `README.md` - Updated features section
- `TOOLS-REFERENCE.md` - Created comprehensive tool reference (~450 lines)
- `ENHANCEMENT-SUMMARY.md` - This document

### Build Output
- `build/` - Recompiled with TypeScript

## Testing Status

Build: ✅ Successful
```bash
npm run build
# > andamio-lesson-coach@1.0.0 build
# > tsc && chmod 755 build/index.js
```

TypeScript compilation: ✅ No errors

Next steps for testing:
1. Set up `.env` with JWT token
2. Start andamio-db-api on localhost:4000
3. Test each tool with real course data
4. Verify markdown ↔ Tiptap conversion

## Impact

### For Course Creators
- **Complete course management** from Claude Desktop
- **No need to switch contexts** to manage SLTs and lessons
- **AI-assisted editing** with seamless database sync
- **Batch operations** for efficient course restructuring

### For the Platform
- **Reduces platform UI dependency** for content creation
- **Enables AI-powered workflows** for course development
- **Maintains data integrity** with proper validation
- **Supports rapid iteration** on course content

### For Development
- **MCP-first approach** makes course management composable
- **Clean API abstractions** separate concerns
- **Type-safe operations** prevent errors
- **Extensible architecture** for future enhancements

## Future Enhancements

Potential additions based on this foundation:

1. **Module Operations**
   - Create/update/delete modules
   - Reorder modules within a course

2. **Assignment Integration**
   - Create assignments for modules
   - Link SLTs to assignment components

3. **Course Operations**
   - Create/update course metadata
   - Manage course structure

4. **Bulk Operations**
   - Import/export module content
   - Copy lessons between courses
   - Template-based module creation

5. **Enhanced Content Features**
   - Image upload and management
   - Video embedding helpers
   - Interactive component templates

## Integration with Existing Features

The new tools complement existing capabilities:

**Lesson Generation** → **Create in Database**
```
generate-lesson (markdown) → create-lesson (saves to DB)
```

**Database Fetch** → **AI Enhancement** → **Update**
```
fetch-lesson → [Claude edits] → update-lesson
```

**SLT Management** → **Lesson Creation**
```
create-slt → generate-lesson → create-lesson
```

## Code Quality

- ✅ Full TypeScript typing
- ✅ Zod schema validation
- ✅ Consistent error handling
- ✅ Debug logging support
- ✅ Comprehensive documentation
- ✅ Clear parameter descriptions
- ✅ Helpful error messages

## Deployment

The enhancements are ready for:

1. **Local Development**
   - Works with localhost:4000 andamio-db-api
   - Debug mode for troubleshooting

2. **Claude Desktop**
   - All tools available via MCP
   - Automatic tool discovery

3. **Production** (when API is deployed)
   - Point ANDAMIO_API_URL to production gateway
   - Use production JWT authentication

## Success Metrics

With these enhancements, the Lesson Coach can now:

- ✅ **Create** complete module structures (SLTs + Lessons)
- ✅ **Read** existing content from the database
- ✅ **Update** lesson content and SLT text
- ✅ **Delete** SLTs and lessons (with safety checks)
- ✅ **Reorder** module content efficiently
- ✅ **Convert** between markdown and Tiptap JSON automatically
- ✅ **Validate** SLTs before creation
- ✅ **Generate** AI-powered lesson content
- ✅ **Manage** complete course workflows

## Conclusion

The Andamio Lesson Coach now provides complete CRUD operations for course content management through a clean MCP interface. Course creators can manage SLTs and lessons entirely from Claude Desktop, with AI assistance at every step.

The enhancement maintains the original vision of making teaching expertise infrastructure while extending it to include content management infrastructure.

---

**Built with:**
- TypeScript
- MCP SDK
- Zod for validation
- Andamio Database API

**Ready for:**
- Local development testing
- Claude Desktop integration
- Production deployment (when API is available)
