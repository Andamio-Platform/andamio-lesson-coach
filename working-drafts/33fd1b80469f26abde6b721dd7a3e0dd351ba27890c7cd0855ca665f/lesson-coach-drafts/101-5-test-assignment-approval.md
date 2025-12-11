# Test Assignment Approval Transaction Lifecycle

The assignment approval transaction is how course creators issue credentials to students who've completed module assignments. Testing this locally lets you verify the complete attestation workflow: from student evidence submission through course creator review to on-chain credential issuance.

## Prerequisites

Before you begin, ensure you have:

* Completed SLT 4 (tested COMMIT_TO_ASSIGNMENT transaction)
* Student account with an assignment in "EVIDENCE_SUBMITTED" status
* Course creator account with permissions for the course
* Both DB API and T3 App running locally
* Browser DevTools ready to monitor network activity

## Overview

You'll switch to a course creator account, review a student's submitted evidence, execute an ACCEPT_ASSIGNMENT transaction, and verify the student receives their credential on-chain. The process takes 10-15 minutes including blockchain confirmation.

## Step-by-Step Instructions

### Step 1: Set Up Test Scenario (If Needed)

**What to do:**

You need a student with submitted evidence. If you completed SLT 4, you have a committed assignment. To get to "EVIDENCE_SUBMITTED" status:

1. As the student account: Execute UPDATE_ASSIGNMENT transaction
2. Submit evidence (text, links, or files)
3. Transaction confirms and status becomes "EVIDENCE_SUBMITTED"

Alternatively, manually update the database in Prisma Studio to set status to 'EVIDENCE_SUBMITTED'.

**Expected result:** At least one assignment commitment has status "EVIDENCE_SUBMITTED".

---

### Step 2: Switch to Course Creator Account

**What to do:**

1. Log out of the student account in the T3 app
2. Connect wallet with a course creator account
3. Verify you see course creator permissions in the UI

**Expected result:** You're logged in as a course creator with access to view pending assignments.

---

### Step 3: Review and Accept Assignment

**What to do:**

In the T3 App:

1. Navigate to "My Courses" or "Course Management"
2. Select the course where you're a creator
3. Go to "Pending Assignments" or "Review Submissions"
4. Find the student's submitted evidence
5. Click on the assignment to view full details
6. Review the student's submitted evidence
7. Click "Accept Assignment" button
8. Open Browser DevTools (Network + Console tabs)
9. Click "Build Transaction" in the modal
10. Sign the transaction in your wallet
11. Transaction submits to blockchain

**Expected result:** Transaction submitted successfully with tx hash displayed.

---

### Step 4: Monitor Confirmation

**What to do:**

1. Copy the transaction hash
2. Go to Cardano Preprod Explorer: https://preprod.cardanoscan.io
3. Search for your transaction
4. Wait for confirmation (1-3 minutes typically)
5. Once confirmed, check the transaction details:
   * Look for mints (the module credential NFT)
   * Look for metadata (assignment evidence hash)

**Expected result:** Transaction confirmed with module credential NFT minted to student's wallet.

---

### Step 5: Verify in Student Account

**What to do:**

Log back in as the student (or check in a different browser):

1. Navigate to "My Credentials" or "Completed Modules"
2. You should see the newly issued module credential
3. Credential shows module name, issue date, transaction hash

**In the student's Cardano wallet:**
* The module credential NFT is now in their wallet
* Asset name matches the module
* Can be used to unlock project opportunities

**Expected result:** Student can see and use their new module credential.

---

## Verification

You've successfully tested the assignment approval lifecycle when all of the following are true:

* Course creator account has appropriate permissions
* Student assignment was in "EVIDENCE_SUBMITTED" status
* ACCEPT_ASSIGNMENT transaction built successfully
* Transaction was signed and submitted to blockchain
* Transaction confirmed on Cardano Preprod
* Module credential NFT was minted to student's wallet
* Student can view their new credential in the UI and wallet

## Understanding the Complete Workflow

```
Student: MINT_LOCAL_STATE (enroll in course)
    ↓
Student: COMMIT_TO_ASSIGNMENT
    ↓ (status: COMMITTED)
Student: UPDATE_ASSIGNMENT (submit evidence)
    ↓ (status: EVIDENCE_SUBMITTED)
Course Creator: Reviews evidence
    ↓
Course Creator: ACCEPT_ASSIGNMENT
    ↓
Blockchain: Confirms transaction (mints module credential NFT)
    ↓
Student: Receives credential in wallet
    ↓
Student: Can use credential for project opportunities
```

## Common Issues and Solutions

### Issue: "You don't have permission to accept this assignment"

**Why it happens:** User is not a course creator for this course
**How to fix it:**
* Check CourseReferenceUTxO table in Prisma Studio for your user + course
* Verify you have creator role
* In development, manually add yourself to the table if needed

### Issue: Assignment not showing in "Pending" list

**Why it happens:** Assignment status isn't "EVIDENCE_SUBMITTED"
**How to fix it:**
* Check AssignmentCommitment status in Prisma Studio
* Verify student completed UPDATE_ASSIGNMENT transaction
* Manually set status if testing

### Issue: Transaction builds but wallet rejects

**Why it happens:** Insufficient ADA or wrong network
**How to fix it:**
* Ensure 10+ ADA in Preprod wallet (credential minting has costs)
* Verify wallet is on Preprod network
* Check you have the course NFT in your wallet (creator token)

### Issue: Student doesn't receive credential in wallet

**Why it happens:** Credential minted but not to correct address
**How to fix it:**
* Check transaction on Cardanoscan - where did the NFT go?
* Verify student's wallet address in database matches their actual wallet
* Check if credential is in their wallet but not showing (sync issue)

## Tips from Experience

💡 **Test the full student journey first**: Complete SLT 4 (commitment) and UPDATE_ASSIGNMENT before testing acceptance. Understanding the student experience makes testing the creator side easier.

💡 **Use two browser profiles**: Keep student logged in on one profile, course creator on another. This lets you quickly switch perspectives without re-authenticating.

💡 **Watch the mints on Cardanoscan**: The credential NFT mint is proof the transaction worked. Even if database side effects fail, the on-chain record is immutable.

## What You've Built

You now understand the complete assignment approval transaction lifecycle from the course creator perspective. You can trace how credentials are issued on-chain, verify the attestation workflow works correctly, and debug issues in the credential issuance process. This is the culmination of Andamio's learn-to-contribute model: students prove capabilities, creators attest, blockchain records it permanently.

## Next Steps

* Test the DENY_ASSIGNMENT transaction (reject with feedback)
* Explore how credentials unlock project opportunities
* Build a complete module workflow from enrollment to credential
* Consider contributing improvements to the transaction monitoring service

---

*Part of What's New at Andamio > Andamio DB API and Template*
