# Complete the Assignment Commitment Loop

**SLT:** I can run an Assignment Commitment loop involving a student and a teacher.

**Note:** This SLT is too broad. Consider splitting into:
- "I can submit assignment evidence as a learner"
- "I can review and accept/deny assignments as an instructor"
- "I can update my assignment evidence after feedback"

## Why This Matters

The Assignment Commitment loop enables learners to prove capabilities and earn on-chain credentials through a review cycle between learners and instructors.

## Prerequisites

**Learners:** Wallet with 3+ ADA, access token, enrolled in course
**Instructors:** Wallet with 3+ ADA, access token, course creator/instructor role

## The Loop Overview

**Learner path:**
1. Write → Lock → Submit evidence (COMMIT_TO_ASSIGNMENT)
2. Wait for instructor review
3. If denied: Update (UPDATE_ASSIGNMENT) or Leave (LEAVE_ASSIGNMENT)
4. If accepted: Claim credential (BURN_LOCAL_STATE)

**Instructor path:**
1. Review evidence
2. Accept (ACCEPT_ASSIGNMENT) or Deny (DENY_ASSIGNMENT) with feedback

## Learner Steps

### 1. Submit Evidence
**Where:** Course → Module → Assignment

**Process:**
- Click "Start Assignment"
- Write evidence in rich text editor
- Click "Save Draft" (off-chain, no fees)
- Click "Lock Evidence" (generates hash)
- Click "Submit to Blockchain"

**Cost:** ~0.2 ADA fee + ~2 ADA deposit

**Status:** PENDING_APPROVAL (awaiting instructor)

### 2. Update Evidence (If Denied)
**When:** Status is ASSIGNMENT_DENIED

**Process:**
- Edit evidence based on feedback
- Lock new evidence
- Submit UPDATE_ASSIGNMENT transaction (~0.2 ADA)

**Status:** Returns to PENDING_APPROVAL

### 3. Leave Assignment (Optional)
**When:** Before acceptance

**Process:**
- Click "Leave Assignment"
- Sign transaction (~0.2 ADA fee)
- Deposit returned (~2 ADA)

## Instructor Steps

### 1. Navigate to Submissions
**Where:** Studio → Your Course → Instructor

You'll see all PENDING_APPROVAL submissions with learner info and evidence.

### 2. Review Evidence
Evaluate if evidence demonstrates all SLTs.

### 3. Accept or Deny

**Accept (ACCEPT_ASSIGNMENT):**
- Click "Accept Assignment"
- Add optional feedback
- Sign (~0.2 ADA fee)
- Status: ASSIGNMENT_ACCEPTED
- Learner can now claim credential

**Deny (DENY_ASSIGNMENT):**
- Click "Deny Assignment"
- Add specific feedback (recommended)
- Sign (~0.2 ADA fee)
- Status: ASSIGNMENT_DENIED
- Learner can update and resubmit

## Status Flow

**Success path:**
Draft → PENDING_APPROVAL → ASSIGNMENT_ACCEPTED → Claim credential

**Revision path:**
Draft → PENDING_APPROVAL → ASSIGNMENT_DENIED → Update → PENDING_APPROVAL → ASSIGNMENT_ACCEPTED → Claim credential

**Exit path:**
Any stage → LEAVE_ASSIGNMENT → Removed

## What's Next

**Learners:** Claim module credential via BURN_LOCAL_STATE
**Instructors:** Review more submissions, maintain quality standards
**Project:** Verified contributors access contribution opportunities

## Technical Reference

**Learner transactions:** COMMIT_TO_ASSIGNMENT, UPDATE_ASSIGNMENT, LEAVE_ASSIGNMENT
**Instructor transactions:** ACCEPT_ASSIGNMENT, DENY_ASSIGNMENT
**Component:** `assignment-commitment.tsx`
**Endpoints:** `/api/nba/tx/student/*` and `/api/nba/tx/course-creator/*`

## Common Issues

**Learner:**
- "Submit to Blockchain" disabled: Lock evidence first
- Insufficient funds: Add 3+ ADA to wallet
- Stuck on PENDING_TX: Check Cardano Explorer

**Instructor:**
- Can't see submissions: Verify instructor role and PENDING_APPROVAL status
- Accept/Deny buttons missing: Wait for blockchain confirmation
