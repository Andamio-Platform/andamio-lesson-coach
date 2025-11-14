/**
 * Developer Documentation Lesson Generator
 *
 * Generates technical lessons for developers integrating with Andamio.
 * Typical inputs: SLT + code snippet + documentation link
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

## Student Learning Target

${slt}

## Why This Matters for Your Contribution

The capability to ${lessonTitle} is critical for contributing to blockchain development projects. This technical knowledge enables you to [specific technical contribution context - to be customized by course creator].

## Technical Overview

[Course creator: Provide technical context for this capability]

### Key Concepts

1. **Concept 1**: [Brief explanation]
2. **Concept 2**: [Brief explanation]
3. **Concept 3**: [Brief explanation]

## Implementation Guide

${materials ? `### Code Example\n\n\`\`\`typescript\n${materials}\n\`\`\`\n\n[Course creator: Add code comments and explanations]\n` : ""}

### Understanding the Implementation

[Course creator: Walk through the code/implementation step by step]

1. **Component 1**: [What it does and why]
2. **Component 2**: [What it does and why]
3. **Component 3**: [What it does and why]

### Integration Points

When contributing to projects, you'll integrate this capability with:

- **System/Component 1**: [How it connects]
- **System/Component 2**: [How it connects]
- **System/Component 3**: [How it connects]

## Real-World Application

### Use Case 1: [Specific Scenario]
[Course creator: Describe a real project scenario where this capability is needed]

**Implementation:**
\`\`\`
[Code or commands]
\`\`\`

### Use Case 2: [Another Scenario]
[Course creator: Another real scenario]

**Implementation:**
\`\`\`
[Code or commands]
\`\`\`

## Best Practices

When you're contributing to projects, follow these practices:

1. **Practice 1**: [Technical best practice and why it matters]
2. **Practice 2**: [Technical best practice and why it matters]
3. **Practice 3**: [Technical best practice and why it matters]

[Course creator: Add domain-specific best practices]

## Common Patterns and Pitfalls

### ✅ Do This
[Course creator: Show correct patterns]

\`\`\`typescript
// Good example
[code]
\`\`\`

### ❌ Avoid This
[Course creator: Show anti-patterns]

\`\`\`typescript
// Bad example
[code]
\`\`\`

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

- [Link to API documentation]
- [Link to relevant GitHub repo]
- [Link to examples in production projects]

[Course creator: Add specific documentation links]

## Practice Exercise

Demonstrate this capability by:

1. [Specific coding task aligned with SLT]
2. [Integration task]
3. [Real-world scenario task]

## What You've Built

You now have the technical capability to ${lessonTitle}. This expertise is essential for contributing to blockchain development projects that require [specific technical contribution].

## Next Steps

- Implement this in a test environment
- Review the Module Assignment to see how you'll prove this capability
- Explore how this integrates with other technical capabilities in this Module

---

${courseName && moduleName ? `*Part of ${courseName} > ${moduleName}*` : ""}
*Generated with Andamio Lesson Coach*
`;
}
