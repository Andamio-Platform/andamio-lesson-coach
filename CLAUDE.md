# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Andamio Lesson Coach is an AI-powered content generation tool that helps domain experts create high-quality, student-centered lessons without requiring teaching expertise. The coach bridges the gap between domain expertise and pedagogical design.

**Core Purpose:** Transform Student Learning Targets (SLTs) into complete lessons that enable contribution to Projects.

## Critical Framing

**Andamio is NOT a Learning Management System.** Learning happens in service of becoming a contributor to a Project. This must be implicit in all generated content.

**Andamio Structure Hierarchy:**
```
Projects (where contribution happens)
└── Courses (prerequisites to Projects)
    └── Modules (blockchain Credentials)
        ├── SLTs ("I can" statements)
        ├── Lessons (teaching content)
        └── Assignment (proof of capability)
```

**Module Definition:**
```
Module = SLTs + Assignment
```

## Repository Structure

This is an Obsidian vault structured for content creation and AI context management:

```
/context/              # Background materials, sample SLTs, module examples,
                       # language guides, platform docs, partnership examples

/lesson-types/         # Coach prompts for each of the 4 lesson types:
                       # product-demo, developer-docs, how-to-guide, org-onboarding

/courses/              # Generated lesson output organized as:
  [course-name]/
    modules/
      [module-name]/
        lessons/
          [slt-based-filename].md

/generated-lessons/    # Test output during development

/templates/            # Reusable templates (when created)
```

## Four Lesson Types

1. **Product Demo** - Andamio Platform features (SLT + screenshots)
2. **Developer Documentation** - Technical integration (SLT + code + docs)
3. **How To Guide** - Step-by-step procedures (SLT + materials)
4. **Organization Onboarding** - Getting started (SLT + org context)

Each lesson type has specific input requirements and pedagogical approaches defined in `/lesson-types/`.

## Core Principles for Content Generation

**1. Contribution-Centered**
- Every lesson connects to enabling contribution to a Project
- Use "learn to contribute" language, not "learn for learning's sake"

**2. SLT-Driven**
- Input: "I can [specific capability]"
- Output: Lesson that enables exactly that capability

**3. Assignment-Aware**
- Lessons prepare for the Module Assignment
- Focus on what learners need to prove they know

**4. NOT LMS Language**
- Avoid traditional LMS patterns and terminology
- Emphasize: "What do you need to know to contribute?"
- See `/context/language-guide.md` for examples (when created)

## Content Generation Workflow

1. Domain expert provides SLT: "I can [specific capability]"
2. Choose appropriate lesson type
3. Provide type-specific inputs (screenshots/code/links)
4. Coach generates 90% of lesson (structure, pedagogy, flow)
5. Course creator adds 10% (domain expertise, org context, examples)
6. Output saved to appropriate `/courses/[course-name]/modules/[module-name]/lessons/` directory

## Implementation Phases

**Phase 1 (Current):** Build context in Obsidian vault, define lesson types, test with sample SLTs
**Phase 2:** Markdown ↔ Prosemirror JSON conversion, Platform DB integration
**Phase 3:** Deploy to Platform UI
**Phase 4:** Enhanced features (image placement, formatted text)

## File Naming and Organization

- Lessons use SLT-based filenames
- Organized by course > module > lessons hierarchy
- All content in markdown format
- Test generation goes to `/generated-lessons/`

## Development Notes

- This is primarily a content/prompt engineering repository, not a code repository
- No build process, linting, or tests in traditional sense
- Quality measured by lesson output quality and pedagogical effectiveness
- Primary tool is markdown content creation within the vault structure
