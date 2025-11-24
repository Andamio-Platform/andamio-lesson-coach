# Pedagogical Approach: Specific to General

All four lesson types now follow the principle of teaching from **specific examples to general principles**.

## Why This Approach Works

1. **Concrete examples are easier to understand** than abstract concepts
2. **Learners can see the pattern** in real code/scenarios first
3. **Principles emerge naturally** from examining the example
4. **Transfer is easier** when you start with a working implementation

## Implementation by Lesson Type

### Developer Documentation (developer-docs.ts)

**Approach**: Example → Concepts → Patterns → Workflow

**Structure**:
```markdown
# Title

Brief intro

## Example: [Specific Implementation]
- Complete code from actual codebase
- "What this does" (behaviors)
- "What this does NOT do" (boundaries)

## Core Concepts
- Extract 3 key concepts FROM the example
- Reference specific parts of the example
- Show code snippets demonstrating each concept

## Implementation Workflow
- Step-by-step based on the example pattern

## Common Patterns
- Extract patterns FROM the example
- Show when to apply each pattern

## Real-World Application
- How to adapt the example to other scenarios
```

**Key Principle**: Start with MINT_MODULE_TOKENS or similar real implementation, then extract general principles.

### How-To Guide (how-to-guide.ts)

**Approach**: End Result → Steps → Variations

**Note**: How-to guides are inherently procedural, but when possible:
- Show the end result first
- Demonstrate with a specific scenario
- Break down the steps
- Apply to variations/edge cases

**Example**: "Run the Andamio DB API Locally"
- Could show the working stack first
- Then explain the 5 steps that got there
- Then show how to verify success

### Product Demo (product-demo.ts)

**Approach**: Show → Tell → Practice

**Structure**:
- Start with visual walkthrough (screenshots/recording)
- Demonstrate the feature with a specific example
- Break down what happened step-by-step
- Apply to common scenarios
- Let learners try it themselves

**Key Principle**: Visual first, explanation second. Show the feature working before explaining the UI.

### Organization Onboarding (org-onboarding.ts)

**Approach**: Case Study → Framework → Application

**Structure**:
- Start with a success story or concrete example
- Show how a similar organization accomplished this
- Extract the framework/process they used
- Apply to the learner's organizational context

**Key Principle**: Learn from organizations who've done it, extract their pattern, adapt to your context.

## Benefits of This Approach

### For Domain Experts (Course Creators)
- **Easier to provide examples** than write abstract concepts
- **Can reference existing code** instead of creating pedagogical examples
- **Less teaching expertise required** - just show what works

### For Learners (Students)
- **See real implementations** immediately
- **Understand context** before diving into details
- **Can reference the example** when implementing their own version
- **Build confidence** by seeing it work first

### For the Coach (AI Generator)
- **Templates guide example-first structure**
- **Prompts request specific examples**
- **Patterns emerge from examples** rather than being prescribed
- **More consistent output** when anchored to concrete examples

## Course Creator Guidelines

When using the lesson coach:

1. **Provide a real example** in the materials field when possible
2. **Reference actual code** from the codebase
3. **Show complete implementations**, not just snippets
4. **Explain what the example does AND doesn't do** (boundaries)
5. **Extract patterns** from the example rather than inventing abstract ones

## Implementation Notes

Each generator now includes:

```typescript
/**
 * PEDAGOGICAL APPROACH: [Specific approach for this type]
 * - [Key principle 1]
 * - [Key principle 2]
 * - [Key principle 3]
 */
```

This ensures the example-first approach is:
- **Documented** in the generator code
- **Visible** to developers maintaining the coach
- **Consistent** across all lesson types
- **Aligned** with pedagogical best practices

## Measuring Success

Good indicators that this approach is working:

1. **Fewer conceptual questions** - learners see it working
2. **More implementation questions** - learners are adapting the pattern
3. **Higher completion rates** - concrete examples are easier to follow
4. **Better retention** - learners remember the example

Bad indicators that need adjustment:

1. **Examples are too complex** - can't extract principles
2. **Examples are too specific** - can't generalize
3. **Missing the "what this does NOT do"** - boundaries unclear
4. **No workflow from example** - stuck in abstract
