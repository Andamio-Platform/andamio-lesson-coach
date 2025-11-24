# Andamio Lesson Coach Refinement Process

This document defines how the Lesson Coach improves through iterative feedback loops with human content creators.

## Success Vision

**Target Quality**: 95% similarity between generated lessons and expert-edited versions
- 100% = zero human edits needed (unrealistic goal)
- 95% = minimal refinement needed (excellent success)
- Current baseline = TBD after first iteration

**Why This Matters**: Domain experts should spend time on expertise, not pedagogy. The coach handles structure, flow, and teaching principles so creators focus on domain-specific insights and examples.

## Directory Structure

```
/working-drafts/
  └── {courseNftPolicyId}/           # e.g., 33fd1b80469f26abde6b721dd7a3e0dd351ba27890c7cd0855ca665f/
      ├── lesson-coach-drafts/       # Coach-generated lessons (unchanged after generation)
      ├── {editor}-drafts/           # Human-edited versions (e.g., james-drafts/, harsha-drafts/)
      └── diff/                      # Analysis and improvement insights
          ├── {lesson}-analysis.md   # Per-lesson comparison
          ├── module-patterns.md     # Aggregated patterns across a module
          └── generator-updates.md   # Recommendations for src/generators
```

## File Naming Conventions

**Lesson Format**: `{moduleCode}-{moduleIndex}-{slug}.md`
- Example: `101-3-transaction-definition-schema.md`
- **Shorthand Reference**: "Lesson 101.3" (module 101, index 3)

**Frontmatter** (YAML, coach internal use only, not published):
```yaml
---
courseNftPolicyId: "33fd1b80469f26abde6b721dd7a3e0dd351ba27890c7cd0855ca665f"
lesson: "101.3"
target_model: "developer-docs"  # Generator in src/generators/ to improve
narrative: "Building on 101.2's validator concepts, this lesson enables students to write their own transaction definitions for the assignment"  # Optional: cross-lesson connections
vision: "Students need to understand transaction schemas to contribute to Cardano projects that use custom validators"  # Optional: why this lesson exists
---
```

**Metadata Field Definitions**:
- `courseNftPolicyId`: Parent course identifier (matches directory name)
- `lesson`: Human-readable reference (e.g., "101.3")
- `target_model`: Generator to improve based on this lesson's diff analysis
- `narrative`: Cross-lesson story arc or progression (added during editing)
- `vision`: Learning purpose and contribution context (can be pre-generation or added during editing)

## Refinement Loop Process

### For Humans (Content Creators)

**Step 1: Review Coach Output**
1. Find your lessons in `/working-drafts/{courseNftPolicyId}/lesson-coach-drafts/`
2. Each lesson has frontmatter with `lesson`, `target_model`, and course metadata

**Step 2: Create Your Draft Directory**
1. Create `/working-drafts/{courseNftPolicyId}/{yourname}-drafts/`
2. Copy lesson files from `lesson-coach-drafts/` into your directory

**Step 3: Edit Lessons**
1. Edit copied files in your drafts directory
2. Add `narrative` and `vision` fields if helpful
3. Focus on: domain-specific examples, organizational context, clarity improvements
4. Original coach drafts remain unchanged for comparison

**Step 4: Request Analysis**
1. When ready, ask the coach to analyze differences
2. Coach compares your drafts against original coach-generated versions

### For the Coach (AI Assistant)

**Step 1: Generate Initial Lessons**
1. Create lessons in `lesson-coach-drafts/` directory
2. Include complete frontmatter with at minimum: `courseNftPolicyId`, `lesson`, `target_model`
3. Do not modify these files after generation (they are the baseline)

**Step 2: Await Human Editing**
(Human creates their drafts directory and edits copies)

**Step 3: Analyze Differences** (when requested)

For each lesson pair (coach-draft vs human-draft):

1. **Categorize Changes**:
   - **Structural**: Headings, sections, organization
   - **Pedagogical**: Examples, explanations, learning flow
   - **Content**: Domain expertise, technical accuracy
   - **Language**: Tone, terminology, phrasing
   - **Contribution-framing**: Connection to Projects/contribution context

2. **Calculate Similarity Score**:
   - **100%**: No changes (perfect match)
   - **90-95%**: Minor refinements only (target range)
   - **70-89%**: Moderate changes needed
   - **50-69%**: Substantial revisions
   - **<50%**: Major rewrites

   **Scoring Method**:
   - Count meaningful changes (not whitespace/formatting)
   - Weight by importance: structural (high), content (high), language (medium), minor wording (low)
   - Formula: `100 - (weighted_changes / total_content * 100)`

3. **Create Analysis Files in `/diff/`**:

   **`{lesson}-analysis.md`**: Per-lesson breakdown
   ```markdown
   # Lesson {lesson} Analysis

   **Similarity Score**: X%
   **Target Model**: {target_model}

   ## Change Summary
   - Structural: X changes
   - Pedagogical: X changes
   - Content: X changes
   - Language: X changes
   - Contribution-framing: X changes

   ## Key Patterns
   1. [Specific pattern with example]
   2. [Specific pattern with example]

   ## Recommendations for Generator
   - [Specific improvement]
   - [Specific improvement]
   ```

   **`module-patterns.md`**: Aggregated insights across module
   ```markdown
   # Module {moduleCode} Pattern Analysis

   **Average Similarity**: X%
   **Lessons Analyzed**: X

   ## Cross-Lesson Patterns
   1. [Pattern appearing in multiple lessons]
   2. [Pattern appearing in multiple lessons]

   ## Generator-Specific Insights
   ### {target_model}
   - [What this generator does well]
   - [What needs improvement]
   ```

**Step 4: Update Generators** (when requested)

1. Read diff analysis files
2. Identify which generators need updates (from `target_model` fields)
3. Update generator prompts/logic in `src/generators/`
4. Update related documentation
5. Document changes made

**Step 5: Track Progress**

Maintain a running comparison:
- **Baseline** (first iteration): X% average similarity
- **Current** (latest iteration): Y% average similarity
- **Improvement**: +Z%

## Quality Indicators Beyond Similarity %

Track these patterns in diff analysis:
1. **Time saved**: How much editing time vs. writing from scratch?
2. **Change consistency**: Same types of edits across lessons (systemic issue) or unique per lesson?
3. **Value-add ratio**: Are human edits adding domain expertise (good) or fixing structure (coach issue)?
4. **Contribution framing**: How often does coach miss Project/contribution context?

## Iteration Cadence

**Module-by-Module Approach** (Recommended):
1. Generate all lessons for a module
2. Human edits all lessons in the module
3. Coach analyzes all module lessons together
4. Update generators based on module patterns
5. Move to next module (new generator versions apply)

**Alternative: Lesson-by-Lesson** (for rapid iteration):
- Analyze and update after each lesson
- Higher overhead, but faster feedback loops

**Alternative: Course-by-Course** (for comprehensive updates):
- Complete entire course before analysis
- Identify deepest patterns, but slower improvement cycle

## Success Criteria

**Short-term** (per module):
- Similarity scores trending upward
- Fewer structural/pedagogical changes needed
- More domain-specific edits (indicates coach handles pedagogy)

**Long-term** (across courses):
- 95%+ average similarity for well-defined lesson types
- Human editors focus 80%+ of time on domain expertise, not structure
- Generators produce consistent, high-quality output across different courses