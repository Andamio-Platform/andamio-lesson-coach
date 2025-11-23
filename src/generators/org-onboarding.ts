/**
 * Organization Onboarding Lesson Generator
 *
 * Generates lessons for organizations getting started with Andamio.
 * Typical inputs: SLT + (optional) organization-specific context
 *
 * CRITICAL CONSTRAINT: Maximum 600 words
 * - If content exceeds 600 words, offer alternatives:
 *   1. Split into multiple SLTs (recommended)
 *   2. Create more succinct sections
 *   3. Focus on essential phases only
 */

export async function generateOrgOnboarding(
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

## Why This Capability Matters

The ability to ${lessonTitle} is foundational for your organization's successful use of Andamio. This capability enables you to [specific organizational benefit - to be customized by course creator].

## What This Enables for Your Organization

By building this capability, your organization will be able to:

- [Organizational benefit 1]
- [Organizational benefit 2]
- [Organizational benefit 3]

[Course creator: Customize based on organizational goals]

${materials ? `## Organization-Specific Context\n\n${materials}\n\n[Course creator: Add any organization-specific information, policies, or requirements]\n` : ""}

## Getting Started

### Prerequisites

Before you begin, ensure:

- [ ] [Organizational prerequisite 1]
- [ ] [Organizational prerequisite 2]
- [ ] [Organizational prerequisite 3]

[Course creator: Add organization-specific prerequisites]

### Key Stakeholders

This capability typically involves:

- **Role 1**: [Their responsibilities in this process]
- **Role 2**: [Their responsibilities in this process]
- **Role 3**: [Their responsibilities in this process]

[Course creator: Define organizational roles involved]

## Implementation Guide

### Phase 1: [Initial Setup]

**Objective**: [What this phase accomplishes]

**Steps**:
1. [Specific action]
2. [Specific action]
3. [Specific action]

**Success markers**:
- [How you know this phase is complete]

---

### Phase 2: [Next Phase]

**Objective**: [What this phase accomplishes]

**Steps**:
1. [Specific action]
2. [Specific action]
3. [Specific action]

**Success markers**:
- [How you know this phase is complete]

---

### Phase 3: [Final Phase]

**Objective**: [What this phase accomplishes]

**Steps**:
1. [Specific action]
2. [Specific action]
3. [Specific action]

**Success markers**:
- [How you know this phase is complete]

[Course creator: Adapt phases to organizational onboarding needs]

## Organizational Workflows

How this capability fits into your organization's processes:

### Workflow 1: [Process Name]
[Course creator: Describe how this capability integrates with existing org workflows]

**Touchpoints**:
- [Integration point 1]
- [Integration point 2]
- [Integration point 3]

### Workflow 2: [Another Process]
[Course creator: Another organizational workflow integration]

**Touchpoints**:
- [Integration point 1]
- [Integration point 2]
- [Integration point 3]

## Best Practices for Organizations

Based on successful implementations, organizations should:

1. **Practice 1**: [Organizational best practice and why]
2. **Practice 2**: [Organizational best practice and why]
3. **Practice 3**: [Organizational best practice and why]

[Course creator: Add organization-specific best practices]

## Common Challenges and Solutions

### Challenge: [Common organizational challenge]
**Why it happens**: [Context]
**How to address it**: [Solution approach]
**Who should be involved**: [Relevant stakeholders]

### Challenge: [Another challenge]
**Why it happens**: [Context]
**How to address it**: [Solution approach]
**Who should be involved**: [Relevant stakeholders]

[Course creator: Add challenges specific to organizational context]

## Team Coordination

### Communication Points
- [When to communicate with Team A]
- [When to communicate with Team B]
- [When to communicate with leadership]

### Decision Points
- [Decision 1]: [Who decides and when]
- [Decision 2]: [Who decides and when]
- [Decision 3]: [Who decides and when]

[Course creator: Define organizational communication and decision flows]

## Measuring Success

Your organization has successfully built this capability when:

- [ ] [Organizational success metric 1]
- [ ] [Organizational success metric 2]
- [ ] [Organizational success metric 3]

[Course creator: Define measurable organizational outcomes]

## Scaling This Capability

Once established, your organization can scale by:

1. [Scaling approach 1]
2. [Scaling approach 2]
3. [Scaling approach 3]

[Course creator: Provide guidance on organizational scaling]

## Resources and Support

### Internal Resources
- [Internal document/person 1]
- [Internal document/person 2]
- [Internal document/person 3]

### External Resources
- [External support 1]
- [External support 2]
- [External support 3]

[Course creator: Provide organization-specific resources]

## Action Plan

Next steps for your organization:

### Immediate (This Week)
1. [Action item 1]
2. [Action item 2]
3. [Action item 3]

### Short-term (This Month)
1. [Action item 1]
2. [Action item 2]
3. [Action item 3]

### Long-term (This Quarter)
1. [Action item 1]
2. [Action item 2]
3. [Action item 3]

[Course creator: Customize timeline based on organizational needs]

## What Your Organization Has Built

Your organization now has the capability to ${lessonTitle}. This positions you to [organizational impact and contribution potential].

## Next Steps

- Implement this capability across relevant teams
- Review the Module Assignment to demonstrate organizational readiness
- Connect this capability to other organizational capabilities in this Module

---

${courseName && moduleName ? `*Part of ${courseName} > ${moduleName}*` : ""}
*Generated with Andamio Lesson Coach*
`;
}
