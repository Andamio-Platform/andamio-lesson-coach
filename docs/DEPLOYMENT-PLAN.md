# Andamio Lesson Coach MCP - Deployment Plan

## Overview

This document outlines the deployment strategy for the Andamio Lesson Coach MCP server across different contexts and phases.

**Current Status**: Phase 1 - MCP scaffolding complete, ready for testing and deployment

## Deployment Contexts

### 1. Local Development (Current - READY)

**Purpose**: Development and testing of lesson generation capabilities

**Setup**:
- Already configured via `.mcp.json` in project root
- Claude Code can use the MCP server immediately
- No external deployment needed

**Testing**:
```bash
# Build the server
npm run build

# Test in Claude Code
# The server is automatically available via .mcp.json configuration
```

**Status**: ✅ Complete

---

### 2. Claude Desktop (Next - READY TO DEPLOY)

**Purpose**: Make the lesson coach available to all Claude Desktop conversations

**Target Users**:
- James (primary user for lesson creation)
- Future: Andamio team members creating course content

**Deployment Steps**:

1. **Build the production version**:
   ```bash
   npm run build
   ```

2. **Add to Claude Desktop config**:

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

3. **Restart Claude Desktop**

4. **Verify**:
   - Open Claude Desktop
   - Check for MCP server indicator
   - Test with: "Use the start-lesson-creation prompt"
   - Verify tools are available: `validate-slt`, `suggest-lesson-type`, `generate-lesson`

**Maintenance**:
- Rebuild after any code changes: `npm run build`
- Claude Desktop automatically picks up changes after restart

**Status**: 🟡 Ready to deploy (requires manual configuration)

---

### 3. NPM Package Distribution (Future)

**Purpose**: Allow other Andamio team members to install and use the lesson coach

**Timeline**: After Phase 1 validation (1-2 weeks of testing)

**Deployment Steps**:

1. **Prepare for publishing**:
   ```bash
   # Update package.json with proper metadata
   # - name: "andamio-lesson-coach" (check if available)
   # - version: Start at 0.1.0 for beta
   # - repository: Add GitHub URL
   # - homepage: Link to docs
   ```

2. **Publishing options**:

   **Option A: Public NPM**
   ```bash
   npm login
   npm publish
   ```

   **Option B: Private NPM (if sensitive)**
   ```bash
   npm publish --access restricted
   ```

   **Option C: GitHub Packages**
   - Scoped to @andamio organization
   - Private by default
   - Team access control

3. **User installation**:
   ```bash
   # Global installation
   npm install -g andamio-lesson-coach

   # Or npx for one-time use
   npx andamio-lesson-coach
   ```

4. **Claude Desktop config** (for npm users):
   ```json
   {
     "mcpServers": {
       "andamio-lesson-coach": {
         "command": "npx",
         "args": ["-y", "andamio-lesson-coach"]
       }
     }
   }
   ```

**Recommended Approach**: Start with GitHub Packages for team-only distribution

**Status**: 🔵 Planned for Phase 1 completion

---

### 4. Platform Integration (Phase 2+)

**Purpose**: Integrate lesson generation directly into Andamio Platform UI

**Architecture**:
```
Andamio Platform (Next.js)
    ↓ API call
MCP Bridge/Adapter
    ↓ stdio
Lesson Coach MCP Server
    ↓
Generated Lesson → Platform DB
```

**Integration Options**:

**Option A: Server-Side Integration**
- Platform backend spawns MCP server as child process
- Communicates via stdio
- Most direct integration

**Option B: REST API Wrapper**
- Wrap MCP server in Express/Fastify API
- Platform calls REST endpoints
- More flexible, easier to scale

**Option C: Direct Integration**
- Extract lesson generators as library
- Import directly into Platform codebase
- Simplest, but loses MCP benefits

**Recommended**: Option A (server-side) for Phase 2, Option B for scale

**Components to Deploy**:
1. MCP server (running on Platform infrastructure)
2. API bridge (if using Option B)
3. Platform UI components for:
   - SLT input/validation
   - Lesson type selection
   - Materials upload/input
   - Lesson preview/editing
   - Save to course/module

**Data Flow**:
```
1. Course creator enters SLT in Platform UI
2. Platform validates via MCP tool: validate-slt
3. Platform suggests lesson type via MCP tool: suggest-lesson-type
4. Creator confirms and provides materials
5. Platform calls generate-lesson tool
6. Platform converts markdown → ProseMirror JSON
7. Platform saves to database
8. Creator can preview/edit in Platform editor
```

**Status**: 🔵 Planned for Phase 2 (after markdown ↔ ProseMirror JSON conversion)

---

## Deployment Phases

### Phase 1: Local Testing & Validation (Current)
**Timeline**: 1-2 weeks
**Goal**: Validate lesson quality and pedagogical effectiveness

**Tasks**:
- [x] Build MCP server scaffolding
- [x] Implement 3 core tools
- [x] Implement 4 lesson generators
- [x] Configure for local use
- [ ] Test with real SLTs from existing courses
- [ ] Validate generated lesson quality
- [ ] Iterate on prompts and pedagogical approach
- [ ] Deploy to Claude Desktop for daily use
- [ ] Create 5-10 test lessons across all types

**Validation Criteria**:
- Generated lessons require < 10% manual editing
- Lessons follow contribution-centered language
- Lessons enable students to complete assignments
- All 4 lesson types work reliably

---

### Phase 2: Platform Preparation (2-4 weeks)
**Goal**: Enable Platform to consume generated lessons

**Tasks**:
- [ ] Build markdown → ProseMirror JSON converter
- [ ] Build ProseMirror JSON → markdown converter (for editing)
- [ ] Test conversion with generated lessons
- [ ] Ensure no data loss in round-trip conversion
- [ ] Document Platform DB schema requirements
- [ ] Create Platform API endpoints for lesson import

**Deliverables**:
- Conversion utilities (separate package?)
- Platform API documentation
- Migration guide for existing lessons

---

### Phase 3: Platform UI Integration (3-4 weeks)
**Goal**: Ship lesson creation in Platform UI

**Tasks**:
- [ ] Design lesson creation workflow UI
- [ ] Implement SLT input/validation UI
- [ ] Implement lesson type selection UI
- [ ] Implement materials upload/input UI
- [ ] Implement lesson preview UI
- [ ] Integrate with Platform editor
- [ ] Deploy MCP server to Platform infrastructure
- [ ] Build API bridge (if needed)
- [ ] End-to-end testing

**Deliverables**:
- Platform UI for lesson creation
- Deployed MCP server
- User documentation
- Video walkthrough

---

### Phase 4: Enhanced Features (4+ weeks)
**Goal**: Polish and advanced capabilities

**Tasks**:
- [ ] Image upload and placement
- [ ] Rich text formatting preservation
- [ ] Lesson templates and customization
- [ ] Batch lesson generation
- [ ] Lesson analytics and improvement suggestions
- [ ] Multi-language support
- [ ] Collaborative lesson editing

---

## Technical Requirements by Phase

### Phase 1 (Current)
- [x] Node.js 16+
- [x] TypeScript compiler
- [x] MCP SDK
- [x] File system access (for reading vault content)
- [x] Claude Code/Desktop

### Phase 2
- [ ] ProseMirror JSON parser
- [ ] Markdown parser (with frontmatter support)
- [ ] Platform API access
- [ ] Database schema updates

### Phase 3
- [ ] Platform infrastructure access
- [ ] Process spawning capabilities (for MCP server)
- [ ] Platform authentication/authorization
- [ ] File upload handling (for screenshots)

### Phase 4
- [ ] Image processing (resize, optimize)
- [ ] Advanced text parsing
- [ ] Analytics infrastructure

---

## Deployment Checklist

### Pre-Deployment (All Phases)
- [ ] Update version in package.json
- [ ] Run build: `npm run build`
- [ ] Test all tools manually
- [ ] Test all prompts manually
- [ ] Verify all resources load correctly
- [ ] Update CHANGELOG.md
- [ ] Tag release in git

### Deployment to Claude Desktop
- [ ] Build production version
- [ ] Update Claude Desktop config
- [ ] Restart Claude Desktop
- [ ] Test 1-2 lesson generations
- [ ] Verify no errors in MCP server logs

### Deployment to NPM
- [ ] Review package.json metadata
- [ ] Ensure build/ directory is included
- [ ] Test installation locally: `npm pack` → `npm install <tarball>`
- [ ] Publish: `npm publish`
- [ ] Verify on npmjs.com
- [ ] Test installation on clean machine
- [ ] Update documentation with install instructions

### Deployment to Platform
- [ ] Deploy MCP server to infrastructure
- [ ] Configure environment variables
- [ ] Test server connectivity
- [ ] Deploy API bridge (if used)
- [ ] Deploy UI components
- [ ] Run integration tests
- [ ] Monitor for errors
- [ ] Enable for beta users first

---

## Monitoring & Maintenance

### Metrics to Track

**Phase 1 (Local)**:
- Number of lessons generated
- Manual editing time per lesson
- Lesson types distribution
- Errors/validation failures

**Phase 2+ (Platform)**:
- Generation success rate
- Average generation time
- User satisfaction ratings
- Lessons published vs. drafted
- Most common error types

### Maintenance Tasks

**Weekly**:
- Review generated lesson quality
- Collect user feedback
- Monitor error logs

**Monthly**:
- Update language guide based on patterns
- Improve generator prompts
- Add new lesson templates
- Update documentation

**Per Release**:
- Test all generators
- Verify backward compatibility
- Update dependencies
- Security audit

---

## Rollback Procedures

### Claude Desktop
1. Remove MCP config from claude_desktop_config.json
2. Restart Claude Desktop
3. Revert to previous working version if needed

### NPM Package
1. Unpublish problematic version: `npm unpublish andamio-lesson-coach@<version>`
2. Publish fixed version with patch increment
3. Notify users to update

### Platform Integration
1. Feature flag to disable lesson coach
2. Revert Platform API changes
3. Restore previous lesson creation workflow
4. Fix issues and redeploy

---

## Success Criteria

### Phase 1
- ✅ MCP server runs without errors
- ⏳ Generate 10+ quality lessons
- ⏳ Lessons require < 10% manual editing
- ⏳ All 4 lesson types validated
- ⏳ Daily use in workflow for 2+ weeks

### Phase 2
- Successful markdown ↔ ProseMirror conversion
- No data loss in round-trip conversion
- Platform can import generated lessons
- Database schema supports all lesson types

### Phase 3
- Lesson coach live in Platform UI
- Course creators can generate lessons end-to-end
- Generation time < 30 seconds
- 90%+ satisfaction rating from creators

### Phase 4
- Image handling works reliably
- Advanced features used in 50%+ of lessons
- Multi-language support for 2+ languages
- Platform scales to 100+ concurrent lesson generations

---

## Open Questions & Decisions Needed

1. **NPM Package Naming**: Is "andamio-lesson-coach" available? Alternative names?

2. **Distribution Strategy**: Public NPM, private NPM, or GitHub Packages?

3. **Phase 2 Timing**: When should Platform integration begin? After X lessons generated?

4. **Conversion Library**: Should markdown ↔ ProseMirror be a separate npm package?

5. **MCP Server Hosting**: Where should Platform-integrated MCP server run?
   - Same container as Platform?
   - Separate service?
   - Serverless function?

6. **Authentication**: How should Platform authenticate to MCP server?
   - Same process (stdio) = no auth needed
   - Separate service = API key, JWT, etc.

7. **Image Handling**: Where are screenshot files stored in Phase 1?
   - Local file paths?
   - Base64 in materials field?
   - Upload to temporary storage?

---

## Next Steps (Immediate)

1. **Deploy to Claude Desktop** (today)
   - Update config file
   - Test workflow
   - Document any issues

2. **Generate Test Lessons** (this week)
   - 2-3 lessons per type (8-12 total)
   - Document quality and editing needs
   - Refine generators based on output

3. **Iterate on Prompts** (ongoing)
   - Track which generators need improvement
   - Update based on real lesson feedback
   - Maintain contribution-centered language

4. **Plan Phase 2 Kickoff** (2 weeks)
   - Review Phase 1 results
   - Decide on conversion strategy
   - Schedule Platform integration planning

---

**Last Updated**: 2025-11-14
**Status**: Phase 1 - MCP Scaffolding Complete
**Next Milestone**: Deploy to Claude Desktop and generate 10 test lessons
