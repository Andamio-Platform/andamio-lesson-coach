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

### 1. validate-slt Tool

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

### 2. suggest-lesson-type Tool

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

### 3. generate-lesson Tool

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

- [ ] Tool response time: validate-slt < 1s
- [ ] Tool response time: suggest-lesson-type < 1s
- [ ] Tool response time: generate-lesson < 30s
- [ ] Resource load time < 1s per resource
- [ ] No memory leaks during extended use
- [ ] Server remains responsive after 10+ generations

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

Phase 1 testing is successful if:

- [ ] All tools work without errors
- [ ] All prompts work without errors
- [ ] All resources load successfully
- [ ] Generated lessons require < 10% manual editing
- [ ] Lessons follow contribution-centered language
- [ ] At least 8/10 quality rating on average
- [ ] Generation time < 30 seconds
- [ ] No critical bugs or blockers

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
