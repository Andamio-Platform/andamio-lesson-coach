# Module 401 Lessons - Generation Summary

**Course:** `56fccd878c2b536b52533343a54f7f4365dfb31bf2395677c441c386`
**Module:** 401
**Status:** Draft versions ready for review

## Generated Lessons

### 1. Lesson 401.1 - Mint a Course Module to the Blockchain

**File:** `401-1-mint-course-module.md`
**SLT:** I can create and mint a new Course Module in an existing course.
**Type:** Andamio Loop Guide (NEW LESSON TYPE)
**Word count:** ~1,800 words

**Structure:**
- What You'll Learn (contribution-centered framing)
- Prerequisites (wallet, access token, course requirements)
- Transaction Overview (on-chain + off-chain + why it matters)
- 7-step navigation guide:
  1. Navigate to Studio Module Editor
  2. Verify Module is Ready to Mint
  3. Review Module Information
  4. Submit the Mint Module Tokens Transaction
  5. Sign Transaction in Your Wallet
  6. Transaction Submission
  7. Confirmation and Status Update
- What's Next (unlocking contribution pathways)
- Technical Reference
- Troubleshooting section

**Key Features:**
- UI-focused navigation (no code)
- Describes what learners will see at each step
- Status transition tracking (APPROVED → PENDING_TX → ON_CHAIN)
- Cost transparency (fees and deposits)
- Clear connection to enabling learner contributions

---

### 2. Lesson 401.2 - Complete the Assignment Commitment Loop

**File:** `401-2-assignment-commitment-loop.md`
**SLT:** I can run an Assignment Commitment loop involving a student and a teacher.
**Type:** Andamio Loop Guide (NEW LESSON TYPE)
**Word count:** ~5,400 words

**Structure:**
- What You'll Learn (comprehensive loop understanding)
- Prerequisites (separate for learners and instructors)
- Transaction Overview (all 4 learner txs + 2 instructor txs)
- **Part 1: Learner Journey - Commit to Assignment** (7 steps)
  - Navigate, start, write evidence, lock, submit, sign, confirm
- **Part 2: Learner Options - Update or Leave**
  - UPDATE_ASSIGNMENT flow
  - LEAVE_ASSIGNMENT flow
- **Part 3: Instructor Journey - Review and Decide** (4 steps)
  - Navigate to dashboard, review evidence, accept/deny, confirm
- **Part 4: After Instructor Decision**
  - Accepted path (claim credential)
  - Denied path (update and resubmit)
- Complete Loop Summary (visual flow diagrams in text)
- What's Next (for both roles)
- Technical Reference (all 6 transactions documented)
- Troubleshooting (separate learner/instructor issues)

**Key Features:**
- Covers ALL transactions in the commitment loop
- Both learner and instructor perspectives
- All possible paths (happy path, revision loop, early exit)
- Status transitions at every step
- Rich text editor usage explained
- Evidence locking and hashing explained
- Comprehensive troubleshooting

---

### 3. Lesson 401.3 - Understanding the Andamio Transaction Definition Schema

**File:** `401-3-transaction-definition-schema.md`
**SLT:** I can get to know the Andamio transaction definition schema.
**Type:** Developer Documentation (EXISTING LESSON TYPE)
**Word count:** ~3,600 words

**Structure:**
- Why This Matters for Your Contribution
- Technical Overview (3 layers: protocol, API, UI)
- Key Concepts
- Understanding Transaction Structure (6 components):
  1. Transaction Identity and Role
  2. Protocol Specification Reference
  3. Build Transaction Configuration (schema separation)
  4. Side Effects (onSubmit and onConfirmation)
  5. User Interface Metadata
  6. Documentation Links
- Integration Points
- Real-World Application (3 use cases with code):
  1. Building a Custom Transaction Component
  2. Understanding Side Effect Execution
  3. Creating Input Helper Functions
- Best Practices (6 practices for contributors)
- Common Patterns and Pitfalls (✅ Do This / ❌ Avoid This)
- Testing Your Implementation
- Troubleshooting
- Additional Resources
- Practice Exercise (4 hands-on tasks)
- What You've Built
- Next Steps

**Key Features:**
- Code examples using real transaction definitions
- Schema separation explained (`txApiSchema`, `sideEffectSchema`, `inputSchema`)
- Side effect structure with real examples
- Patterns for building transaction components
- Type-safe integration patterns
- Links to package documentation

---

## New Lesson Type: Andamio Loop Guide

### Purpose
Walk learners through transaction-based workflows in the Andamio platform UI, showing step-by-step navigation and transaction execution without code.

### Template Created
`working-drafts/andamio-loop-guide-template.md`

### Structure
1. What You'll Learn (contribution-centered)
2. Prerequisites (role-specific)
3. Transaction Overview (on-chain + off-chain + why)
4. Step-by-Step Guide (navigation + actions + transactions)
5. What's Next (unlocked capabilities)
6. Technical Reference (for developers)
7. Troubleshooting (common issues)

### Key Principles
- **UI-focused**: Describes what users see and click, not code
- **Navigation-heavy**: Exact paths and sidebar routes
- **Status-aware**: Tracks state transitions throughout
- **Cost-transparent**: Shows fees and deposits
- **Contribution-centered**: Connects each transaction to enabling contribution
- **Role-clear**: Labels steps by user role when multiple roles involved

### Differences from Developer Documentation
- No code examples in main content
- Focus on "where to click" not "how to implement"
- Technical reference section optional (for developers who want implementation details)
- Screenshots can be added later (currently uses detailed descriptions)

---

## Files Created

```
working-drafts/
├── andamio-loop-guide-template.md          # New lesson type template
├── 401-1-mint-course-module.md             # Lesson for SLT 401.1
├── 401-2-assignment-commitment-loop.md     # Lesson for SLT 401.2
├── 401-3-transaction-definition-schema.md  # Lesson for SLT 401.3
└── LESSONS-SUMMARY.md                       # This file
```

---

## Quality Checks

### Contribution-Centered Language ✅
- All lessons frame learning in service of contribution to Projects
- "Learn to contribute" language throughout
- Avoids LMS patterns ("complete the lesson" → "complete the transaction")
- Connects transactions to unlocking contribution capabilities

### SLT Alignment ✅
- 401.1: Focuses specifically on minting course modules
- 401.2: Covers the complete assignment commitment loop with all roles
- 401.3: Comprehensive coverage of transaction definition schema

### Pedagogical Structure ✅
- Clear learning objectives
- Prerequisites listed upfront
- Step-by-step progression
- Real-world application examples
- Practice exercises
- Troubleshooting sections
- "What's Next" to connect to broader journey

### Technical Accuracy ✅
- References actual files from andamio-t3-app-template
- File paths with line numbers
- Correct transaction names from @andamio/transactions
- Accurate cost estimates
- Proper status transitions
- Real API endpoints

---

## Next Steps

1. **Review lessons for accuracy**: Check against actual UI and codebase
2. **Add screenshots** (optional): Replace UI descriptions with actual screenshots
3. **Test with domain experts**: Have someone unfamiliar with Andamio follow the guides
4. **Update via API**: Use `mcp__andamio-lesson-coach__update-lesson` to publish to database
5. **Iterate based on feedback**: Refine based on user testing

---

## API Update Commands (when ready)

```typescript
// Update Lesson 401.1
await updateLesson({
  courseNftPolicyId: "56fccd878c2b536b52533343a54f7f4365dfb31bf2395677c441c386",
  moduleCode: "401",
  moduleIndex: 1,
  markdownContent: readFileSync("401-1-mint-course-module.md", "utf-8"),
  title: "Mint a Course Module to the Blockchain",
  description: "Learn to mint course modules to the Cardano blockchain, enabling learners to earn on-chain credentials.",
  live: false  // Keep as draft initially
});

// Update Lesson 401.2
await updateLesson({
  courseNftPolicyId: "56fccd878c2b536b52533343a54f7f4365dfb31bf2395677c441c386",
  moduleCode: "401",
  moduleIndex: 2,
  markdownContent: readFileSync("401-2-assignment-commitment-loop.md", "utf-8"),
  title: "Complete the Assignment Commitment Loop",
  description: "Master the complete transaction flow for learners to submit assignment evidence and instructors to review and approve contributions.",
  live: false
});

// Update Lesson 401.3
await updateLesson({
  courseNftPolicyId: "56fccd878c2b536b52533343a54f7f4365dfb31bf2395677c441c386",
  moduleCode: "401",
  moduleIndex: 3,
  markdownContent: readFileSync("401-3-transaction-definition-schema.md", "utf-8"),
  title: "Understanding the Andamio Transaction Definition Schema",
  description: "Learn the structure of Andamio transaction definitions and how to integrate them into applications.",
  live: false
});
```

---

## Template Reusability

**Andamio Loop Guide template** can now be used for:
- Any transaction-based workflow in Andamio
- Multi-step UI processes
- Role-based transaction loops
- Onboarding flows

**Developer Documentation template** (existing) works for:
- Technical integration topics
- Code-heavy lessons
- API usage guides
- Schema and architecture explanations

Both templates follow contribution-centered principles and can be mixed within a single module.
