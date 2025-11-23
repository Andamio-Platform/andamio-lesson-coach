# Lesson Length Guidelines

## Critical Constraint: 600-Word Maximum

All Andamio lessons must not exceed **600 words** in length.

## Why This Limit Matters

1. **Focused Learning**: Keeps each SLT tightly scoped to one specific capability
2. **Reduced Cognitive Load**: Learners can digest and apply without overwhelm
3. **Better Retention**: Shorter, focused lessons improve learning outcomes
4. **Assignment Alignment**: Lessons prepare for Module Assignments, not replace them
5. **Contribution Focus**: Emphasizes "learn what you need to contribute" not "learn everything"

## When Content Exceeds 600 Words

If lesson content approaches or exceeds 600 words, STOP and offer the user these alternatives:

### Option 1: Split into Multiple SLTs (Recommended)

**Example - Too Broad:**
- SLT: "I can run an Assignment Commitment loop involving a student and a teacher"
- Problem: Covers learner AND instructor workflows (resulted in 3,900 words)

**Better - Split:**
- SLT 1: "I can submit assignment evidence as a learner"
- SLT 2: "I can review and accept/deny assignment submissions as an instructor"
- SLT 3: "I can update my assignment evidence after receiving feedback"

Each becomes a focused ~400-600 word lesson.

### Option 2: Create More Succinct Sections

- Remove "nice to have" sections
- Eliminate redundant explanations
- Focus on essential steps only
- Link to external docs for deep dives
- Use bullet points instead of paragraphs

### Option 3: Recommend Different Lesson Type

Some content doesn't belong in lessons at all:
- **Reference material** → Link to external docs
- **Deep technical details** → Link to protocol specs or API docs
- **Comprehensive troubleshooting** → Create a separate troubleshooting guide
- **Examples and use cases** → Include 1-2 max, link to more

## How to Stay Under 600 Words

### Structure Efficiently

**Essential Sections (keep concise):**
- SLT statement (1 line)
- Why it matters (1 paragraph, ~50 words)
- Prerequisites (bulleted list)
- Core instruction (3-5 steps, ~300 words total)
- What's next (1 paragraph, ~50 words)

**Optional Sections (use sparingly):**
- Quick example (1 only, if absolutely needed)
- Common issue (1-2 max)
- Technical reference (links only, no explanations)

**Avoid These Sections:**
- Long overviews
- Multiple detailed examples
- Extensive troubleshooting
- Deep technical explanations
- Comprehensive best practices lists
- Step-by-step walkthrough of every edge case

### Writing Techniques

1. **Be Direct**: "Click the button" not "You'll need to navigate to the interface and locate the button in the upper right corner"
2. **Use Lists**: Bullet points are more scannable than paragraphs
3. **Front-load Value**: Lead with what they'll be able to do
4. **Link, Don't Explain**: Reference external docs for details
5. **Trust the Assignment**: The lesson teaches concepts; the assignment proves mastery

## Measuring Word Count

When generating lessons, estimate word count:
- ~5 words per line for paragraphs
- Count all words in code blocks and examples
- Include all section headers

If approaching 500 words during generation, wrap up immediately.
If exceeding 600 words, STOP and present alternatives to the user.

## Examples

### ❌ Too Long (3,900 words)

```markdown
# Complete the Assignment Commitment Loop

## Part 1: Learner Journey
### Step 1: Navigate to Assignment
### Step 2: Start Assignment
### Step 3: Write Evidence
### Step 4: Lock Evidence
### Step 5: Submit to Blockchain
### Step 6: Sign Transaction
### Step 7: Confirmation

## Part 2: Learner Options
### Option A: Update Assignment
### Option B: Leave Assignment

## Part 3: Instructor Journey
### Step 1: Navigate to Dashboard
### Step 2: Review Evidence
### Step 3A: Accept Assignment
### Step 3B: Deny Assignment
### Step 4: Confirmation

## Part 4: After Decision
[extensive content continues...]
```

**Problem**: Tries to teach 6+ distinct capabilities in one lesson

### ✅ Right Length (~400 words)

```markdown
# Submit Assignment Evidence as a Learner

## SLT
I can submit my assignment evidence to the blockchain.

## Why This Matters
Submitting evidence on-chain creates a permanent, verifiable record of your learning. This enables instructors to review your work and unlock your module credential.

## Prerequisites
- Connected wallet with at least 3 ADA
- Course enrollment complete
- Assignment draft written

## Steps

### 1. Review Your Evidence
Open the assignment page and review your draft. Make sure it demonstrates all SLTs for the module.

### 2. Lock Your Evidence
Click "Lock Evidence" to generate a cryptographic hash. This makes your evidence immutable before blockchain submission.

You'll see the evidence hash displayed and your content becomes read-only.

### 3. Submit to Blockchain
Click "Submit to Blockchain" to write your evidence hash on-chain.

Transaction cost:
- Fee: ~0.2 ADA
- Deposit: ~2 ADA (returned when you claim credential)

### 4. Sign Transaction
Your wallet will open. Verify the transaction details and sign.

### 5. Confirmation
After signing, you'll see:
- Success notification
- Transaction hash with explorer link
- Status updates to "Pending Approval"

## What's Next
Your instructor will review your evidence. You'll receive notification when they accept or request revisions.

See other lessons in this module for:
- Updating evidence if denied
- Claiming your credential after acceptance
```

**Why This Works**:
- Single focused capability
- ~380 words
- Clear steps without excessive detail
- Links to related SLTs instead of covering everything
- Assignment will test their actual competency

## For Course Creators

When writing lessons manually (not using the generator):
1. Write the lesson
2. Check word count
3. If > 600 words, identify which capabilities could be separate SLTs
4. Split and refactor
5. Link related SLTs to show progression

## For AI-Generated Lessons

The MCP server generators include this constraint in their documentation headers. When generating lessons, the AI should:
1. Monitor approximate word count during generation
2. Stop at ~500 words and evaluate
3. If content needs more, suggest splitting SLTs
4. Never deliver >600 word lessons without offering alternatives first
