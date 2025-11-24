# New Lesson Types

Goal: use this space to draft new lesson types. When ready migrate the new type to an official "generator" in `src/generators`.


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


## API Update Commands (examples - generalize from these)

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
