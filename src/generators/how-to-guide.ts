/**
 * How-To Guide Lesson Generator
 *
 * Generates step-by-step procedural lessons.
 * Typical inputs: SLT + (optional) supporting materials
 *
 * CRITICAL CONSTRAINTS: Maximum 900 words total
 * - Main instructional content (up to "Verification" section): Maximum 600 words
 * - Supplementary sections ("Common Issues", "Tips from Experience", etc.): Up to 300 additional words
 * - If main content exceeds 600 words, offer alternatives:
 *   1. Split into multiple SLTs (recommended)
 *   2. Create more succinct sections
 *   3. Focus on essential steps only
 *
 * PEDAGOGICAL APPROACH: While how-to guides are naturally procedural,
 * consider starting with a concrete example when possible:
 * - Show the end result first
 * - Demonstrate with a specific scenario
 * - Then break down the steps
 * - Apply to variations/edge cases
 */

export async function generateHowToGuide(
  slt: string,
  materials?: string,
  moduleName?: string,
  courseName?: string
): Promise<string> {
  const lessonTitle = slt.replace(/^I can /i, "").trim();
  const titleCase = lessonTitle.charAt(0).toUpperCase() + lessonTitle.slice(1);

  return `# ${titleCase}

The ability to ${lessonTitle} is a key capability for contributing to Projects. This skill enables you to [specific contribution context - to be customized by course creator].

## Prerequisites

Before you begin, make sure you have:

* [Prerequisite 1]
* [Prerequisite 2]
* [Prerequisite 3]

[Course creator: List specific prerequisites based on the procedure]

## Overview of the Process

Here's what you'll do to ${lessonTitle}:

1. [High-level step 1]
2. [High-level step 2]
3. [High-level step 3]
4. [High-level step 4]

[Course creator: Provide process overview]

${materials ? `## Materials and Resources\n\n${materials}\n\n[Course creator: Add any supporting materials, templates, or resources]\n` : ""}

## Step-by-Step Instructions

### Step 1: [First Action]

**What to do:**
[Detailed instructions for this step]

**Why it matters:**
[Connection to contribution capability]

**Expected result:**
[What they should see/have after completing this step]

---

### Step 2: [Next Action]

**What to do:**
[Detailed instructions for this step]

**Why it matters:**
[Connection to contribution capability]

**Expected result:**
[What they should see/have after completing this step]

---

### Step 3: [Continue...]

**What to do:**
[Detailed instructions]

**Why it matters:**
[Connection to contribution capability]

**Expected result:**
[What they should see/have]

[Course creator: Continue with all necessary steps]

---

## You'll Know You are Successful When:

You've successfully completed this procedure when all of the following are true:

* [Success criterion 1]
* [Success criterion 2]
* [Success criterion 3]

[Course creator: Add specific success criteria]

## Real Project Examples

When contributing to Projects, you'll use this procedure in scenarios like:

### Scenario 1: [Project Context]
[Course creator: Describe how this procedure applies in a real project]

**Adaptation needed:**
* [How the procedure might vary]
* [What to adjust based on project needs]

### Scenario 2: [Another Context]
[Course creator: Another real-world application]

**Adaptation needed:**
* [How the procedure might vary]
* [What to adjust based on project needs]

## Common Issues and Solutions

### Issue: [Common Problem]
**Why it happens:** [Explanation]
**How to fix it:** [Solution]

### Issue: [Another Problem]
**Why it happens:** [Explanation]
**How to fix it:** [Solution]

[Course creator: Add procedure-specific troubleshooting]

## Tips from Experience

💡 **Tip 1**: [Practical advice based on real usage]

💡 **Tip 2**: [Another practical tip]

💡 **Tip 3**: [Best practice insight]

[Course creator: Add domain-specific tips and insights]

## Practice This Capability

Now apply what you've learned:

1. **Practice Task 1**: [Specific task that mirrors real contribution]
2. **Practice Task 2**: [Another practice task]
3. **Practice Task 3**: [Advanced application]

## What You've Built

You now have the capability to ${lessonTitle}. This procedural knowledge is essential for contributing effectively to [Project type].

## Next Steps

* Practice this procedure in different contexts
* Review the Module Assignment to see how you'll demonstrate this capability
* Consider how this procedure connects to other capabilities in this Module

---

${courseName && moduleName ? `*Part of ${courseName} > ${moduleName}*` : ""}
*Generated with Andamio Lesson Coach*
`;
}
