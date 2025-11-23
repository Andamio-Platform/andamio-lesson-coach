# Andamio Loop Guide Template

**Purpose:** Walk learners through a specific transaction flow in the Andamio platform, showing them how to navigate the UI and complete blockchain transactions.

**Use for:** Transaction-based lessons that require step-by-step UI navigation.

---

## Template Structure

```markdown
# [Lesson Title: Action-oriented based on SLT]

## What You'll Learn
[1-2 sentences: What capability this enables for contribution to Projects]

## Prerequisites
- [Required setup items]
- [Required tokens/status]
- [Role requirements]

## Transaction Overview
[Brief explanation of what this transaction accomplishes:
- On-chain: what gets written to blockchain
- Off-chain: what gets saved to database
- Why it matters for the Project/Course]

---

## Step-by-Step Guide

### Step 1: Navigate to [Location Name]
**Where:** `/path/to/page`
**How to get there:** [Describe navigation path, e.g., "Sidebar → Studio → Select your course"]

**What you'll see:**
[Description of the page/interface]

---

### Step 2: [Action Name - e.g., "Prepare Your Module Data"]
**What happens:** [Explanation of this step]

**Required information:**
- [Input field 1]: [What it is and example]
- [Input field 2]: [What it is and example]

**UI elements:**
[Describe buttons, forms, editors visible at this step]

---

### Step 3: [Action Name - e.g., "Submit Transaction"]
**What happens:** [Technical explanation]

**On-chain action:**
[What gets written to the Cardano blockchain]

**Transaction cost:**
- Transaction fee: ~[X] ADA
- Deposits: [Y] ADA (if applicable, note if refundable)

**UI elements:**
[Button text, transaction component displayed]

---

### Step 4: Sign Transaction in Your Wallet
**What you'll see:**
[Description of wallet popup and what information is shown]

**What to verify:**
- [Key detail 1 to check]
- [Key detail 2 to check]

---

### Step 5: Confirmation and Side Effects
**After submission:**
[What happens immediately - loading states, messages]

**Database updates:**
[What gets saved to the Andamio database automatically]

**Status changes:**
- Previous status: [X]
- New status: [Y]

**What you'll see:**
[Success message, page reload, updated UI state]

---

## What's Next

[What capability does this unlock?]
[What can the user do now that they couldn't before?]
[Next logical step in their journey]

---

## Technical Reference

**Transaction type:** `TRANSACTION_TYPE_NAME`
**Component:** `component-name.tsx:line-range`
**API endpoint:** `/api/path/to/endpoint`
**File location:** `/src/path/to/file`

---

## Troubleshooting

**[Common Issue 1]**
- Problem: [Description]
- Solution: [How to fix]

**[Common Issue 2]**
- Problem: [Description]
- Solution: [How to fix]
```

---

## Writing Guidelines

### Language Patterns
- Use contribution-centered language: "enable you to contribute," "unlock contribution capability"
- Avoid LMS language: Don't say "complete the lesson," say "complete the transaction"
- Focus on the Project: Connect each transaction to enabling contribution

### Navigation Instructions
- Always include exact paths: `/studio/course/[coursenft]/[modulecode]`
- Describe sidebar navigation clearly
- Note any auth requirements

### Transaction Details
- Always mention what goes on-chain vs. off-chain
- Include cost estimates (fees + deposits)
- Explain side effects (database updates)
- Show status transitions clearly

### Role Clarity
- If multiple roles involved, clearly label each step with the role
- Use consistent role names: "Course Creator," "Learner," "Instructor"

### UI Descriptions
- Describe what users will see at each step
- Name buttons, forms, and components accurately
- Explain what happens when they click/interact

### Technical References
- Include file paths for developers who want to understand implementation
- Reference transaction type names from `@andamio/transactions`
- Keep technical details in separate section at end
