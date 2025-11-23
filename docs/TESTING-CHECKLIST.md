# Testing Checklist - Andamio Lesson Coach MCP

## Phase 1: Initial Validation

Use this checklist to validate the MCP server before broader deployment.

---

## Pre-Testing Setup

- [ ] Build completed successfully: `npm run build`
- [ ] Build artifacts exist in `/build/` directory
- [ ] No TypeScript compilation errors
- [ ] Node.js version 16+ confirmed: `node --version`

---

## Tool Testing

**Note:** The Lesson Coach now has **13 tools** across 3 categories. Test all tools below.

### Lesson Generation Tools (3)

#### 1. validate-slt Tool

#### Test Case 1.1: Valid SLT
- [ ] Input: `"I can create a new Module in the Andamio Platform"`
- [ ] Expected: Valid, with success message
- [ ] Actual result: _______________

#### Test Case 1.2: Missing "I can"
- [ ] Input: `"Create a new Module in the Andamio Platform"`
- [ ] Expected: Invalid, with suggestion to add "I can"
- [ ] Actual result: _______________

#### Test Case 1.3: Vague verb (understand)
- [ ] Input: `"I can understand how Modules work"`
- [ ] Expected: Invalid, warning about vague verb
- [ ] Actual result: _______________

#### Test Case 1.4: Too short
- [ ] Input: `"I can code"`
- [ ] Expected: Invalid, too vague
- [ ] Actual result: _______________

---

#### 2. suggest-lesson-type Tool

#### Test Case 2.1: Product Demo indicator
- [ ] Input: `"I can navigate the Andamio Platform dashboard"`
- [ ] Expected: Recommends "product-demo"
- [ ] Actual result: _______________

#### Test Case 2.2: Developer Docs indicator
- [ ] Input: `"I can integrate the Andamio API into my application"`
- [ ] Expected: Recommends "developer-docs"
- [ ] Actual result: _______________

#### Test Case 2.3: Organization indicator
- [ ] Input: `"I can set up my organization on Andamio"`
- [ ] Expected: Recommends "org-onboarding"
- [ ] Actual result: _______________

#### Test Case 2.4: General procedural
- [ ] Input: `"I can configure contribution treasury settings"`
- [ ] Expected: Recommends "how-to-guide"
- [ ] Actual result: _______________

---

#### 3. generate-lesson Tool

#### Test Case 3.1: Product Demo Lesson
- [ ] SLT: `"I can create a new Module in the Andamio Platform"`
- [ ] Type: `product-demo`
- [ ] Materials: (optional screenshots description)
- [ ] Expected: Markdown lesson with Platform-specific content
- [ ] Actual: Check lesson quality, structure, contribution language
- [ ] Manual editing needed: ___%
- [ ] Notes: _______________

#### Test Case 3.2: Developer Docs Lesson
- [ ] SLT: `"I can integrate Andamio transactions into my Next.js app"`
- [ ] Type: `developer-docs`
- [ ] Materials: Sample code snippet
- [ ] Expected: Technical lesson with code examples
- [ ] Actual: Check technical accuracy, code quality
- [ ] Manual editing needed: ___%
- [ ] Notes: _______________

#### Test Case 3.3: How-To Guide Lesson
- [ ] SLT: `"I can publish my first Course on Andamio"`
- [ ] Type: `how-to-guide`
- [ ] Materials: (optional)
- [ ] Expected: Step-by-step procedural lesson
- [ ] Actual: Check steps clarity, completeness
- [ ] Manual editing needed: ___%
- [ ] Notes: _______________

#### Test Case 3.4: Org Onboarding Lesson
- [ ] SLT: `"I can configure my organization's governance settings"`
- [ ] Type: `org-onboarding`
- [ ] Materials: Org context
- [ ] Expected: Organizational-focused lesson
- [ ] Actual: Check org framing, stakeholder focus
- [ ] Manual editing needed: ___%
- [ ] Notes: _______________

#### Test Case 3.5: Invalid SLT
- [ ] SLT: `"understand blockchain"`
- [ ] Expected: Error message with validation feedback
- [ ] Actual result: _______________

---

### Lesson API Integration Tools (5)

**Setup Required:** Set `ANDAMIO_JWT_TOKEN` in `.env` and ensure andamio-db-api is running on localhost:4000.

#### 4. fetch-lesson Tool

##### Test Case 4.1: Valid lesson fetch
- [ ] Input: Valid courseNftPolicyId, moduleCode, moduleIndex
- [ ] Expected: Returns lesson with title, description, SLT, content in markdown
- [ ] Actual result: _______________

##### Test Case 4.2: Lesson not found
- [ ] Input: Non-existent moduleIndex
- [ ] Expected: 404 error with helpful message
- [ ] Actual result: _______________

##### Test Case 4.3: Invalid JWT
- [ ] Input: Expired or missing JWT token
- [ ] Expected: 403 error with token guidance
- [ ] Actual result: _______________

---

#### 5. fetch-module-lessons Tool

##### Test Case 5.1: Fetch all lessons in module
- [ ] Input: Valid courseNftPolicyId, moduleCode
- [ ] Expected: List of all lessons with metadata
- [ ] Actual result: _______________
- [ ] Number of lessons returned: _______________

##### Test Case 5.2: Module with no lessons
- [ ] Input: Valid module with 0 lessons
- [ ] Expected: Empty array or appropriate message
- [ ] Actual result: _______________

---

#### 6. create-lesson Tool

##### Test Case 6.1: Create new lesson
- [ ] Input: Valid SLT, markdown content
- [ ] Expected: Lesson created successfully
- [ ] Actual result: _______________
- [ ] Verify in database: _______________

##### Test Case 6.2: Create without content
- [ ] Input: Only SLT, no markdown content
- [ ] Expected: Lesson created with title from SLT
- [ ] Actual result: _______________

##### Test Case 6.3: Duplicate lesson
- [ ] Input: SLT that already has a lesson
- [ ] Expected: 409 Conflict error
- [ ] Actual result: _______________

---

#### 7. update-lesson Tool

##### Test Case 7.1: Update lesson content
- [ ] Input: New markdown content
- [ ] Expected: Lesson updated successfully
- [ ] Verify content converted to Tiptap JSON: _______________
- [ ] Actual result: _______________

##### Test Case 7.2: Publish lesson (set live: true)
- [ ] Input: live: true
- [ ] Expected: Lesson published
- [ ] Actual result: _______________

##### Test Case 7.3: Update non-existent lesson
- [ ] Input: Invalid moduleIndex
- [ ] Expected: 404 error
- [ ] Actual result: _______________

---

#### 8. delete-lesson Tool

##### Test Case 8.1: Delete existing lesson
- [ ] Input: Valid lesson identifiers
- [ ] Expected: Lesson deleted successfully
- [ ] Verify in database: _______________
- [ ] Actual result: _______________

##### Test Case 8.2: Delete non-existent lesson
- [ ] Input: Invalid moduleIndex
- [ ] Expected: 404 error
- [ ] Actual result: _______________

---

### SLT Management Tools (5)

#### 9. fetch-module-slts Tool

##### Test Case 9.1: Fetch all SLTs
- [ ] Input: Valid courseNftPolicyId, moduleCode
- [ ] Expected: List of SLTs with id, moduleIndex, sltText
- [ ] Actual result: _______________
- [ ] Number of SLTs: _______________

##### Test Case 9.2: Empty module
- [ ] Input: Module with no SLTs
- [ ] Expected: Empty array
- [ ] Actual result: _______________

---

#### 10. create-slt Tool

##### Test Case 10.1: Create new SLT
- [ ] Input: Valid "I can..." statement, moduleIndex
- [ ] Expected: SLT created successfully
- [ ] Actual result: _______________
- [ ] Verify in database: _______________

##### Test Case 10.2: Duplicate moduleIndex
- [ ] Input: moduleIndex that already exists
- [ ] Expected: 409 Conflict error
- [ ] Actual result: _______________

##### Test Case 10.3: Max SLTs (25) reached
- [ ] Input: Create 26th SLT
- [ ] Expected: 400 Bad Request error
- [ ] Actual result: _______________

---

#### 11. update-slt Tool

##### Test Case 11.1: Update SLT text
- [ ] Input: New SLT text
- [ ] Expected: SLT updated successfully
- [ ] Actual result: _______________

##### Test Case 11.2: Reorder SLT (change moduleIndex)
- [ ] Input: newModuleIndex
- [ ] Expected: SLT reordered successfully
- [ ] Actual result: _______________

##### Test Case 11.3: Reorder to occupied index
- [ ] Input: newModuleIndex that already exists
- [ ] Expected: 409 Conflict error
- [ ] Actual result: _______________

---

#### 12. batch-reorder-slts Tool

##### Test Case 12.1: Reorder multiple SLTs
- [ ] Input: Array of {id, moduleIndex} updates
- [ ] Expected: All SLTs reordered successfully
- [ ] Actual result: _______________
- [ ] Verify new order: _______________

##### Test Case 12.2: Duplicate indexes in batch
- [ ] Input: Updates with duplicate moduleIndexes
- [ ] Expected: 400 Bad Request error
- [ ] Actual result: _______________

##### Test Case 12.3: SLTs from different modules
- [ ] Input: SLTs from different modules
- [ ] Expected: 400 Bad Request error
- [ ] Actual result: _______________

---

#### 13. delete-slt Tool

##### Test Case 13.1: Delete unused SLT
- [ ] Input: SLT not used in assignment
- [ ] Expected: SLT and its lesson deleted
- [ ] Verify in database: _______________
- [ ] Actual result: _______________

##### Test Case 13.2: Delete SLT used in assignment
- [ ] Input: SLT that's part of an assignment
- [ ] Expected: 409 Conflict error (cannot delete)
- [ ] Actual result: _______________

---

## Resource Testing

### 4. Knowledge Base Resources

- [ ] `coach://readme` loads successfully
- [ ] `coach://language-guide` loads successfully
- [ ] `coach://context/readme` loads successfully
- [ ] `coach://lesson-types/overview` loads successfully
- [ ] `coach://claude-instructions` loads successfully
- [ ] All resources return markdown content
- [ ] No file read errors in logs

---

## Prompt Testing

### 5. start-lesson-creation Prompt

- [ ] Prompt loads successfully
- [ ] Interactive workflow begins
- [ ] Asks for SLT input
- [ ] Validates SLT using tool
- [ ] Suggests lesson type using tool
- [ ] Guides through material collection
- [ ] Generates lesson using appropriate generator
- [ ] Overall workflow feels natural
- [ ] Notes: _______________

### 6. generate-product-demo Prompt

- [ ] Prompt loads with required parameters
- [ ] Generates product demo lesson
- [ ] Includes contribution-centered language
- [ ] References Platform features appropriately
- [ ] Quality meets expectations
- [ ] Notes: _______________

### 7. generate-developer-docs Prompt

- [ ] Prompt loads with required parameters
- [ ] Generates technical documentation
- [ ] Includes code examples (if provided)
- [ ] Technical accuracy acceptable
- [ ] Quality meets expectations
- [ ] Notes: _______________

### 8. generate-how-to-guide Prompt

- [ ] Prompt loads with required parameters
- [ ] Generates procedural guide
- [ ] Steps are clear and actionable
- [ ] Includes verification criteria
- [ ] Quality meets expectations
- [ ] Notes: _______________

### 9. generate-org-onboarding Prompt

- [ ] Prompt loads with required parameters
- [ ] Generates onboarding content
- [ ] Focuses on organizational capabilities
- [ ] Addresses stakeholders appropriately
- [ ] Quality meets expectations
- [ ] Notes: _______________

---

## Quality Assessment

### Language & Tone

For each generated lesson, check:

- [ ] Uses contribution-centered language (not LMS patterns)
- [ ] Avoids "learning objectives" framing
- [ ] Focuses on "what can you do" not "what will you know"
- [ ] Connects to Project contribution
- [ ] Uses active voice and clear language
- [ ] Appropriate for target audience

### Structure & Content

- [ ] Clear introduction
- [ ] Well-organized sections
- [ ] Appropriate depth for SLT scope
- [ ] Includes examples where appropriate
- [ ] Has verification/success criteria
- [ ] Connects to Module Assignment
- [ ] Provides next steps or resources

### Pedagogical Effectiveness

- [ ] Enables the specific capability in the SLT
- [ ] Builds on assumed prerequisites appropriately
- [ ] Includes scaffolding for complex concepts
- [ ] Anticipates common questions/issues
- [ ] Provides troubleshooting guidance

---

## Performance Testing

### Lesson Generation Tools
- [ ] Tool response time: validate-slt < 1s
- [ ] Tool response time: suggest-lesson-type < 1s
- [ ] Tool response time: generate-lesson < 30s

### API Integration Tools
- [ ] Tool response time: fetch-lesson < 2s
- [ ] Tool response time: fetch-module-lessons < 3s
- [ ] Tool response time: create-lesson < 2s
- [ ] Tool response time: update-lesson < 2s
- [ ] Tool response time: delete-lesson < 2s
- [ ] Tool response time: fetch-module-slts < 2s
- [ ] Tool response time: create-slt < 2s
- [ ] Tool response time: update-slt < 2s
- [ ] Tool response time: batch-reorder-slts < 3s
- [ ] Tool response time: delete-slt < 2s

### General
- [ ] Resource load time < 1s per resource
- [ ] No memory leaks during extended use
- [ ] Server remains responsive after 10+ generations
- [ ] Server remains responsive after 20+ API calls

---

## Error Handling

### Expected Errors

- [ ] Invalid SLT returns helpful error
- [ ] Missing required parameters returns clear message
- [ ] Unknown lesson type returns error
- [ ] File not found errors are caught gracefully
- [ ] All errors provide actionable guidance

### Edge Cases

- [ ] Very long SLT (500+ characters)
- [ ] Special characters in SLT
- [ ] Empty string inputs
- [ ] Undefined/null parameters
- [ ] Multiple simultaneous requests

---

## Integration Testing (Claude Desktop)

- [ ] MCP server appears in server list
- [ ] All tools are available
- [ ] All prompts are available
- [ ] All resources are available
- [ ] Can generate lessons successfully
- [ ] No console errors
- [ ] Restart persists configuration

---

## Real-World Testing

### API Integration Workflows

#### Workflow 1: Create Module from Scratch
- [ ] Use fetch-module-slts to check current state
- [ ] Use create-slt to add 3 SLTs
- [ ] Use generate-lesson for each SLT
- [ ] Use create-lesson to save each to database
- [ ] Use fetch-module-lessons to verify
- [ ] Overall workflow rating: ___/10
- [ ] Notes: _______________

#### Workflow 2: Edit Existing Content
- [ ] Use fetch-lesson to get existing lesson
- [ ] Edit content with AI assistance
- [ ] Use update-lesson to save changes
- [ ] Use fetch-lesson again to verify
- [ ] Overall workflow rating: ___/10
- [ ] Notes: _______________

#### Workflow 3: Reorganize Module
- [ ] Use fetch-module-slts to see current order
- [ ] Use batch-reorder-slts to rearrange
- [ ] Use fetch-module-slts to verify new order
- [ ] Overall workflow rating: ___/10
- [ ] Notes: _______________

---

### Generate Actual Course Content

Create lessons for an existing or planned course:

#### Lesson 1
- [ ] Course: _______________
- [ ] Module: _______________
- [ ] SLT: _______________
- [ ] Type: _______________
- [ ] Quality rating: ___/10
- [ ] Time to generate: ___s
- [ ] Manual editing needed: ___%
- [ ] Usable for course: Yes / No
- [ ] Notes: _______________

#### Lesson 2
- [ ] Course: _______________
- [ ] Module: _______________
- [ ] SLT: _______________
- [ ] Type: _______________
- [ ] Quality rating: ___/10
- [ ] Time to generate: ___s
- [ ] Manual editing needed: ___%
- [ ] Usable for course: Yes / No
- [ ] Notes: _______________

#### Lesson 3
- [ ] Course: _______________
- [ ] Module: _______________
- [ ] SLT: _______________
- [ ] Type: _______________
- [ ] Quality rating: ___/10
- [ ] Time to generate: ___s
- [ ] Manual editing needed: ___%
- [ ] Usable for course: Yes / No
- [ ] Notes: _______________

#### Lesson 4
- [ ] Course: _______________
- [ ] Module: _______________
- [ ] SLT: _______________
- [ ] Type: _______________
- [ ] Quality rating: ___/10
- [ ] Time to generate: ___s
- [ ] Manual editing needed: ___%
- [ ] Usable for course: Yes / No
- [ ] Notes: _______________

---

## Success Criteria

Phase 1+ testing is successful if:

### Lesson Generation
- [ ] All 3 generation tools work without errors
- [ ] All prompts work without errors
- [ ] All resources load successfully
- [ ] Generated lessons require < 10% manual editing
- [ ] Lessons follow contribution-centered language
- [ ] At least 8/10 quality rating on average
- [ ] Generation time < 30 seconds

### API Integration
- [ ] All 10 API tools work without errors
- [ ] Can create, read, update, delete SLTs
- [ ] Can create, read, update, delete lessons
- [ ] Markdown ↔ Tiptap JSON conversion works correctly
- [ ] Error messages are helpful and actionable
- [ ] Workflows feel natural and efficient

### Overall
- [ ] No critical bugs or blockers
- [ ] Documentation is clear and complete

---

## Issues & Improvements

Document any issues found or improvements needed:

### Critical Issues
1. _______________
2. _______________
3. _______________

### Enhancement Ideas
1. _______________
2. _______________
3. _______________

### Generator Improvements
- Product Demo: _______________
- Developer Docs: _______________
- How-To Guide: _______________
- Org Onboarding: _______________

---

## Next Steps After Testing

- [ ] Document all issues in GitHub Issues (if applicable)
- [ ] Prioritize improvements for next iteration
- [ ] Update generators based on feedback
- [ ] Refine prompts based on real usage
- [ ] Update documentation based on user questions
- [ ] Decide on Phase 2 timeline
- [ ] Plan NPM package deployment (if applicable)

---

**Testing Date**: _______________
**Tester**: _______________
**Version**: _______________
**Status**: Pass / Fail / Needs Improvement
