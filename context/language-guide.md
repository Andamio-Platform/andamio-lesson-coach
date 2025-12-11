# Language Guide: Contribution-Centered vs LMS

This guide shows the language patterns that distinguish Andamio (contribution-centered) from traditional Learning Management Systems (LMS).

**Core Principle:** Learning happens in service of becoming a contributor to a Project.

---

## Quick Reference

### LMS Language (Avoid)
- "Complete this course"
- "Earn your certificate"
- "Pass the quiz"
- "Course requirements"
- "Learning objectives"
- "Enroll now"
- "Progress through modules"

### Contribution-Centered Language (Use)
- "Build capability to contribute"
- "Earn credentials that validate your expertise"
- "Demonstrate what you can do"
- "What you need to know to contribute"
- "Student Learning Targets" (SLTs - "I can" statements)
- "Join a Project"
- "Build expertise needed by Projects"

---

## Detailed Examples by Context

### 1. Lesson Introductions

❌ **LMS Pattern:**
> "Welcome to Module 3! In this lesson, you'll learn about UTXOs. By the end of this lesson, you'll understand how UTXOs work and be able to pass the quiz."

✅ **Contribution-Centered:**
> "Understanding UTXOs is essential for contributing to blockchain development projects. This lesson builds the expertise you need to work with UTXO-based systems in real project contexts."

**Why it works:** Connects knowledge to actual contribution, not just passing a test.

---

### 2. Student Learning Targets (SLTs)

❌ **LMS Pattern:**
> "Understand the concept of UTXOs"
> "Learn about blockchain transactions"
> "Complete all activities in this module"

✅ **Contribution-Centered:**
> "I can explain what a UTXO is"
> "I can trace a transaction through UTXO inputs and outputs"
> "I can identify when to use UTXO vs account-based models in a project"

**Why it works:** "I can" statements are specific, actionable capabilities that enable contribution.

---

### 3. Module Descriptions

❌ **LMS Pattern:**
> "This module covers the fundamentals of blockchain development. You will complete 5 lessons and 1 final assessment to receive your certificate."

✅ **Contribution-Centered:**
> "This Module builds your capability to contribute to blockchain development projects. You'll develop expertise in [specific capabilities], then demonstrate what you can do through a project-based Assignment. Successfully completing this Assignment earns you a blockchain credential."

**Why it works:** Frames modules as capability-building for contribution, not content consumption for certificates.

---

### 4. Assignment Framing

❌ **LMS Pattern:**
> "Assignment: Answer the following questions to test your knowledge. You must score 80% to pass."

✅ **Contribution-Centered:**
> "Assignment: Demonstrate your capability by [specific task]. This Assignment mirrors real contribution scenarios you'll encounter in Projects."

**Example:**
> "Assignment: Analyze a real UTXO transaction and document how value flows through inputs and outputs. This is exactly what you'd do when debugging transactions in a blockchain project."

**Why it works:** Assignments prove capability in realistic contribution contexts, not artificial test scenarios.

---

### 5. Navigation and Progress

❌ **LMS Pattern:**
> "You have completed 3 of 8 modules. Keep going!"
> "Next lesson"
> "Course completion: 37%"

✅ **Contribution-Centered:**
> "You've built expertise in 3 of 8 capability areas."
> "Continue building expertise"
> "Next: Build capability in [specific area]"

**Why it works:** Emphasizes capability building, not course completion metrics.

---

### 6. Motivational Language

❌ **LMS Pattern:**
> "Congratulations! You've finished the course. Download your certificate!"
> "Keep learning! Start the next course."
> "You're on a 7-day streak!"

✅ **Contribution-Centered:**
> "You've demonstrated the expertise needed for [Project type]. Ready to contribute?"
> "Build additional expertise needed by other Projects."
> "You've been actively building expertise for 7 days."

**Why it works:** Motivation comes from readiness to contribute, not gamification or completion metrics.

---

### 7. Prerequisites and Requirements

❌ **LMS Pattern:**
> "Prerequisites: You must complete Course 101 before taking this course."
> "Required: Complete all lessons before accessing the final exam."

✅ **Contribution-Centered:**
> "This builds on expertise from [previous Module]. If you can [specific SLTs from prerequisite], you're ready to continue."
> "Build expertise across all SLTs in this Module before demonstrating capability in the Assignment."

**Why it works:** Prerequisites are about having necessary capabilities, not bureaucratic course completion.

---

### 8. Credentials and Validation

❌ **LMS Pattern:**
> "Earn your certificate of completion"
> "Get certified"
> "This certificate proves you completed the course"

✅ **Contribution-Centered:**
> "Earn a blockchain credential that validates your expertise"
> "Get a credential that proves capability"
> "This credential validates that you can [specific capabilities]—exactly what Projects need"

**Why it works:** Credentials validate capability to contribute, not mere course completion.

---

### 9. Course and Project Relationship

❌ **LMS Pattern:**
> "Courses available for enrollment"
> "Browse our course catalog"
> "Take courses to advance your career"

✅ **Contribution-Centered:**
> "Courses that prepare you to contribute to Projects"
> "Build expertise needed by active Projects"
> "Develop capabilities that organizations are looking for in contributors"

**Why it works:** Courses explicitly serve Projects, not standalone learning.

---

### 10. Call-to-Action Language

❌ **LMS Pattern:**
> "Enroll now"
> "Start learning today"
> "Continue course"
> "Resume where you left off"

✅ **Contribution-Centered:**
> "Start building expertise"
> "Continue developing capabilities"
> "Return to building expertise"
> "Build on what you've already proven"

**Why it works:** Actions are about building capabilities, not consuming content.

---

## Writing Coach Prompts: Language Checklist

When generating lesson content, ensure you:

**✅ DO:**
* Connect every concept to real contribution scenarios
* Use "I can" statements for learning targets
* Frame Assignments as proof of capability
* Emphasize what learners can DO, not just know
* Reference Projects as the context where learning matters
* Use active, capability-building language
* Explain WHY something matters for contribution
* Use asterisk (*) for unordered lists (not hyphens -)
* Write brief 2-3 sentence introductions (not "Why This Matters for Your Contribution" headers)
* Focus on UX flow in transaction walkthroughs (not deep technical implementation)

**❌ AVOID:**
* "Complete this lesson/module/course"
* "Pass the test/quiz/exam"
* "Learn about..." (passive framing)
* Gamification language (streaks, badges, points)
* Completion percentages disconnected from capability
* Generic certificates or course completion
* Learning for its own sake without contribution context
* Re-stating the SLT in the lesson body
* Markdown checkboxes (- [ ]) - use asterisks for all lists
* Section headers like "Why This Matters for Your Contribution"
* Deep technical implementation details in transaction flow lessons

---

## Formatting Patterns

### Lesson Opening (Required Pattern)
✅ **Correct:**
```markdown
# [Lesson Title]

[2-3 sentence introduction that explains why this matters for contribution]

## Prerequisites
```

❌ **Incorrect:**
```markdown
# [Lesson Title]

## Student Learning Target

I can [...]

## Why This Matters for Your Contribution

[Lengthy explanation...]
```

### List Formatting (Required Pattern)
✅ **Use asterisks for all lists:**
```markdown
Prerequisites:
* Item one
* Item two
* Item three
```

❌ **Never use hyphens or checkboxes:**
```markdown
Prerequisites:
- Item one
- [ ] Item two (checkbox)
- Item three
```

### Transaction Lesson Pattern
For lessons about testing transaction flows:

✅ **Focus on UX:**
```markdown
1. Navigate to [page]
2. Click [button]
3. Sign transaction in wallet
4. Verify [outcome in UI]
```

❌ **Don't go deep into implementation:**
```markdown
1. The onSubmit side effect executes
2. Database state transitions to PENDING_TX
3. Monitoring service polls blockchain
4. The validator computes hash using...
```

---

## The Key Question

Every piece of content should answer:

**"What do you need to know to contribute to a Project?"**

NOT: "What do you need to know to complete this course?"

---

## Andamio Structure Reminder

```
Project (where contribution happens)
└── Course (prerequisite to joining Project)
    └── Module (earns blockchain credential)
        ├── SLTs ("I can" statements)
        ├── Lessons (optional teaching content)
        └── Assignment (proves capability)
```

**Module Definition:**
```
Module = SLTs + Assignment
```

Lessons are **optional**—we only create them when we need to teach something learners can't already prove through the Assignment.

---

## Testing Your Language

When you write lesson content, ask:

1. **Contribution test:** Does this clearly connect to contributing to a Project?
2. **Capability test:** Is it framed around what learners can DO?
3. **SLT alignment test:** Does it serve a specific "I can" statement?
4. **Assignment awareness test:** Does it prepare for proving capability?
5. **LMS pattern test:** Would this language fit in a traditional LMS? (If yes, revise!)

---

*This guide should inform all lesson content generated by the coach.*
