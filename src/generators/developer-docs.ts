/**
 * Developer Documentation Lesson Generator
 *
 * Generates technical lessons for developers integrating with Andamio.
 * Typical inputs: SLT + code snippet + documentation link
 *
 * CRITICAL CONSTRAINTS: Maximum 900 words total
 * - Main instructional content (up to "Testing Your Implementation" section): Maximum 600 words
 * - Supplementary sections ("Troubleshooting", "Additional Resources", etc.): Up to 300 additional words
 * - If main content exceeds 600 words, offer alternatives:
 *   1. Split into multiple SLTs (recommended)
 *   2. Create more succinct sections
 *   3. Focus on essential concepts only
 *
 * PEDAGOGICAL APPROACH: Specific Example → General Principles
 * - Start with a concrete, real example
 * - Show the complete code/implementation first
 * - Explain what it does and what it doesn't do
 * - Extract general principles from the example
 * - Provide patterns and workflow based on the example
 */

export async function generateDeveloperDocs(
  slt: string,
  materials?: string,
  moduleName?: string,
  courseName?: string
): Promise<string> {
  const lessonTitle = slt.replace(/^I can /i, "").trim();
  const titleCase = lessonTitle.charAt(0).toUpperCase() + lessonTitle.slice(1);

  return `# ${titleCase}

The capability to ${lessonTitle} is critical for contributing to blockchain development projects. This technical knowledge enables you to [specific technical contribution context - to be customized by course creator].

## Example: [Specific Implementation]

[Course creator: Provide a concrete, real-world example from the codebase]

Here's a complete implementation from [source]:

\`\`\`typescript
${materials || `// [Course creator: Add complete code example here]
// Show the actual implementation they'll work with
// Include imports, full function/class definition, and key details`}
\`\`\`

**What this does:**
[Course creator: Bullet points explaining the example]
* [Key behavior 1]
* [Key behavior 2]
* [Key behavior 3]

**What this does NOT do:**
[Course creator: Clarify boundaries and separation of concerns]
* [Not responsibility 1]
* [Not responsibility 2]
* [Not responsibility 3]

## Core Concepts

[Course creator: Extract the key concepts from the example above]

### 1. [Concept Name]

[Explanation of concept with reference to the example]

\`\`\`typescript
// Relevant snippet from example showing this concept
\`\`\`

### 2. [Concept Name]

[Explanation of concept with reference to the example]

\`\`\`typescript
// Relevant snippet from example showing this concept
\`\`\`

### 3. [Concept Name]

[Explanation of concept with reference to the example]

\`\`\`typescript
// Relevant snippet from example showing this concept
\`\`\`

## Implementation Workflow

[Course creator: Based on the example above, provide step-by-step workflow]

### Step 1: [First Action]

[Explanation based on the example]

### Step 2: [Next Action]

[Explanation based on the example]

### Step 3: [Continue...]

[Explanation based on the example]

## Real-World Application

### Applying This Pattern

[Course creator: Show how the example pattern applies to other scenarios]

**Scenario 1: [Related Use Case]**
[How to adapt the example for this scenario]

**Scenario 2: [Another Use Case]**
[How to adapt the example for this scenario]

## Best Practices

When you're contributing to projects, follow these practices:

1. **Practice 1**: [Technical best practice and why it matters]
2. **Practice 2**: [Technical best practice and why it matters]
3. **Practice 3**: [Technical best practice and why it matters]

[Course creator: Add domain-specific best practices]

## Common Patterns

[Course creator: Extract patterns from the example]

### Pattern 1: [Pattern Name]

\`\`\`typescript
// Pattern from example
[code snippet showing pattern]
\`\`\`

[When to use this pattern]

### Pattern 2: [Pattern Name]

\`\`\`typescript
// Another pattern from example
[code snippet showing pattern]
\`\`\`

[When to use this pattern]

### Pattern 3: [Pattern Name]

\`\`\`typescript
// Third pattern from example
[code snippet showing pattern]
\`\`\`

[When to use this pattern]

## Testing Your Implementation

Validate your capability by:

1. **Test 1**: [How to verify it works]
2. **Test 2**: [How to verify edge cases]
3. **Test 3**: [How to verify in production-like scenarios]

## Troubleshooting

**Issue**: [Common technical problem]
**Cause**: [Why it happens]
**Solution**: [How to fix it]

**Issue**: [Another common problem]
**Cause**: [Why it happens]
**Solution**: [How to fix it]

[Course creator: Add technical troubleshooting specific to this implementation]

## Additional Resources

* [Link to API documentation]
* [Link to relevant GitHub repo]
* [Link to examples in production projects]

[Course creator: Add specific documentation links]

## Practice Exercise

Demonstrate this capability by:

1. [Specific coding task aligned with SLT]
2. [Integration task]
3. [Real-world scenario task]

## What You've Built

You now have the technical capability to ${lessonTitle}. This expertise is essential for contributing to blockchain development projects that require [specific technical contribution].

## Next Steps

* Implement this in a test environment
* Review the Module Assignment to see how you'll prove this capability
* Explore how this integrates with other technical capabilities in this Module

---

${courseName && moduleName ? `*Part of ${courseName} > ${moduleName}*` : ""}
*Generated with Andamio Lesson Coach*
`;
}
