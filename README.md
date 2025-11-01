# Andamio Lesson Coach

An AI-powered lesson content coach that helps domain experts create high-quality, student-centered lessons without requiring teaching expertise.

## The Hair on Fire Problem

**Not everyone is a teacher.**

Course creators are domain experts (blockchain developers, organizational leaders, technical specialists), not instructional designers. They know what people need to learn to contribute - they just don't know how to structure effective lessons.

**The coach bridges this gap:**
- Domain expert provides: What needs to be learned (the SLT, the expertise)
- Coach provides: How to teach it (structure, pedagogy, student-centered design)
- Result: High-quality lessons without requiring teaching expertise

## How It Works

**Input:** Student Learning Target (SLT) - "I can [specific capability]"
**Output:** Complete lesson in markdown format

**The coach handles (90%):** Lesson structure, pedagogy, flow, teaching best practices
**Course creator adds (10%):** Domain expertise, organization context, specific examples

## Critical Framing

Andamio is NOT a Learning Management System. Learning happens in service of someone becoming a contributor to a Project. This must be implicit in everything the coach creates.

**Andamio Structure:**
- **Projects** - Where actual contribution happens
- **Courses** - Can serve as prerequisites to joining Projects
- **Modules** - Each Module can be a Credential on the blockchain
- **SLTs** - "I can" statements at the core of UX
- **Lessons** - Optional, created when we need to teach (not just have them prove)
- **Assignments** - What learners do to prove what they know

**Module Definition:**
```
Module = SLTs + Assignment
```

## Lesson Types

Four core lesson types:

**1. Product Demo**
- Shows learners how to use Andamio Platform features
- Typical inputs: SLT + screenshot(s)

**2. Developer Documentation**
- Technical content for developers integrating with Andamio
- Typical inputs: SLT + code snippet + documentation link

**3. How To Guide**
- Step-by-step procedural content
- Typical inputs: SLT + (optional) supporting materials

**4. Organization Onboarding**
- Content for organizations getting started with Andamio
- Typical inputs: SLT + (optional) organization-specific context

## Key Principles

**1. Contribution-Centered**
- Every lesson connects to how this knowledge enables contribution to a Project
- Not "learn for learning's sake" but "learn to contribute"

**2. SLT-Driven**
- Input: "I can [specific capability]"
- Output: Lesson that enables that capability

**3. Assignment-Aware**
- Lessons prepare for the Module Assignment
- Focus on what learners need to prove they know

**4. NOT an LMS**
- Avoid LMS language and patterns
- Emphasize: "What do you need to know to contribute?"

## Directory Structure

```
/context/               # Background materials and guidelines
  sample-slts.md       # Real SLTs from existing courses
  module-examples.md   # Complete Module structures
  language-guide.md    # Contribution-centered vs LMS language
  platform-docs/       # Relevant Platform documentation

/lesson-types/         # Coach prompts for each lesson type
  product-demo.md
  developer-docs.md
  how-to-guide.md
  org-onboarding.md

/courses/              # Generated lesson output
  [course-name]/
    modules/
      [module-name]/
        lessons/
          [slt-based-filename].md

/generated-lessons/    # Test output during development

/templates/            # Reusable templates
```

## Implementation Phases

### Phase 1: Build Context in Obsidian Vault (Current)
- Create vault structure and context
- Define lesson types with coach prompts
- Test content generation with sample SLTs
- Start using for real course creation

### Phase 2: Import/Export Features
- Build markdown ↔ Prosemirror JSON conversion
- Integrate with Platform DB

### Phase 3: Deploy Agent to Platform
- Make accessible via Platform UI
- Production deployment

### Phase 4: Enhanced Features
- Image placement capability
- Formatted text handling
- User testing and iteration

## Usage

1. **Define your SLT**: "I can [specific capability]"
2. **Choose lesson type**: Product Demo, Developer Docs, How To Guide, or Org Onboarding
3. **Provide inputs**: SLT + type-specific materials (screenshots, code, links)
4. **Generate lesson**: Coach creates markdown lesson in appropriate Course > Module directory
5. **Customize (10%)**: Add domain-specific examples and organization context
6. **Use in Platform**: Lesson ready for Andamio Platform

## Why This Matters

Without the coach, domain experts either:
1. Spend months learning instructional design (slow, expensive)
2. Hire instructional designers (expensive, doesn't scale)
3. Create poor lessons that don't actually teach (learners struggle, credentials lose value)

**The coach makes teaching expertise infrastructure.**

---

*Version: Phase 1 - November 2025*
