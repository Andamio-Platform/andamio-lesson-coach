# Mint a Course Module to the Blockchain

**SLT:** I can create and mint a new Course Module in an existing course.

## Why This Matters

Minting a Course Module to the Cardano blockchain establishes the module as an on-chain credential that learners can earn. This unlocks the ability for contributors to work toward and claim blockchain-verified credentials.

## Prerequisites

- Connected wallet with at least 5 ADA
- Access token minted
- Existing course with at least one module set to APPROVED status
- Module must have title, description, and at least one SLT

## Steps

### 1. Navigate to Module Editor
**Where:** Sidebar → Studio → Your Course → Select Module

You'll see the module editor with:
- Module title and description
- Status selector
- SLT list
- "Mint Module Tokens" button (when status is APPROVED)

### 2. Verify Module Status
Set module status to **APPROVED** using the status dropdown.

Status flow:
- DRAFT → APPROVED (you approve when ready)
- APPROVED → ON_CHAIN (automatic after minting)

Verify:
- At least one SLT defined
- Title and description complete
- Status is APPROVED

### 3. Review Module Data
The transaction component displays:
- Policy ID (your course's NFT policy)
- Module code (e.g., "101", "202")
- SLTs (formatted for blockchain)
- Transaction cost estimate

### 4. Submit Transaction
Click "Mint Module Tokens"

**Cost:**
- Transaction fee: ~0.2 ADA
- Deposit: ~2 ADA (held with on-chain tokens)

The component fetches the unsigned transaction and opens your wallet.

### 5. Sign in Wallet
Verify in your wallet:
- Fee: ~0.2 ADA
- Deposit: ~2 ADA
- Module Tokens being minted
- Destination: Andamio validator address

Click "Sign" or "Confirm"

### 6. Confirmation
**Immediate:**
- Success notification
- Transaction hash with explorer link
- Page reload

**Status updates (automatic):**
- APPROVED → PENDING_TX (awaiting confirmation)
- PENDING_TX → ON_CHAIN (after ~1-2 minutes)

## What's Next

With your module on-chain:
- Learners can commit to assignments
- You review and accept/deny submissions
- Learners claim module credentials
- Module appears in your public course listing

## Technical Reference

**Transaction:** `MINT_MODULE_TOKENS`
**Endpoint:** `/api/nba/tx/course-creator/mint-module-tokens`
**Component:** `mint-module-tokens.tsx:66-117`

## Common Issues

**Button not visible:** Module status must be APPROVED
**"Insufficient ADA":** Add at least 5 ADA to wallet
**Stuck on PENDING_TX:** Check transaction on Cardano Explorer; may need manual reset if failed
