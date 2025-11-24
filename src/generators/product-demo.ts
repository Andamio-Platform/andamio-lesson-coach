/**
 * Product Demo Lesson Generator
 *
 * Generates lessons that show learners how to use Andamio Platform features.
 * Typical inputs: SLT + screenshot(s)
 *
 * CRITICAL CONSTRAINTS: Maximum 900 words total
 * - Main instructional content (up to "Try It Yourself" section): Maximum 600 words
 * - Supplementary sections ("Troubleshooting", "Common Scenarios", etc.): Up to 300 additional words
 * - If main content exceeds 600 words, offer alternatives:
 *   1. Split into multiple SLTs (recommended)
 *   2. Create more succinct sections
 *   3. Focus on essential steps only
 *
 * PEDAGOGICAL APPROACH: Show → Tell
 * - Start with visual walkthrough (screenshots/recording)
 * - Demonstrate the feature with a specific example
 * - Break down what happened step-by-step
 * - Apply to common scenarios
 */

export async function generateProductDemo(
  slt: string,
  materials?: string,
  moduleName?: string,
  courseName?: string
): Promise<string> {
  const lessonTitle = slt.replace(/^I can /i, "").trim();
  const titleCase = lessonTitle.charAt(0).toUpperCase() + lessonTitle.slice(1);

  return `# ${titleCase}

## Student Learning Target

${slt}

## Why This Matters for Your Contribution

Understanding how to ${lessonTitle} is essential for contributing to Projects on the Andamio Platform. This capability enables you to [specific contribution context - to be customized by course creator].

## What You'll Build Expertise In

By the end of this lesson, you'll have the capability to ${lessonTitle} in real project contexts.

## Platform Feature Overview

[Course creator: Add overview of the relevant Andamio Platform feature here]

${materials ? `## Visual Walkthrough\n\n${materials}\n\n[Course creator: Add screenshots with annotations showing each step]\n` : ""}

## Step-by-Step Guide

### Step 1: [Action Title]
[Course creator: Describe the first action the learner needs to take]

- What to do: [specific instruction]
- Why it matters: [connection to contribution]
- Look for: [what they should see on screen]

### Step 2: [Action Title]
[Course creator: Describe the next action]

- What to do: [specific instruction]
- Why it matters: [connection to contribution]
- Look for: [what they should see on screen]

### Step 3: [Action Title]
[Course creator: Continue with remaining steps]

## Common Scenarios

When you're contributing to a Project, you'll use this capability to:

1. **Scenario 1**: [Specific use case]
2. **Scenario 2**: [Specific use case]
3. **Scenario 3**: [Specific use case]

[Course creator: Customize these scenarios based on actual project needs]

## Troubleshooting

**Issue**: [Common problem learners encounter]
**Solution**: [How to resolve it]

**Issue**: [Another common problem]
**Solution**: [How to resolve it]

[Course creator: Add platform-specific troubleshooting tips]

## Try It Yourself

Now that you understand the steps, practice this capability:

1. [Specific practice task aligned with the SLT]
2. [Another practice task]
3. [Final practice task that mirrors real contribution]

## What You've Built

You now have the capability to ${lessonTitle}. This is a foundational skill for contributing to [Project type] on Andamio.

## Next Steps

- Practice this capability in different contexts
- Review the Module Assignment to see how you'll demonstrate this expertise
- Explore how this connects to other capabilities in this Module

---

${courseName && moduleName ? `*Part of ${courseName} > ${moduleName}*` : ""}
*Generated with Andamio Lesson Coach*
`;
}
