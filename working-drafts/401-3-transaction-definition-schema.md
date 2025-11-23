# Understanding the Andamio Transaction Definition Schema

**SLT:** I can get to know the Andamio transaction definition schema.

## Why This Matters

Understanding the transaction definition schema enables you to build custom transactions, create UI components, and integrate Andamio transactions into external applications.

## Technical Overview

Andamio's unified transaction definition system integrates three layers:

1. **Protocol Layer** - On-chain structure (YAML specs)
2. **API Layer** - Transaction builders and side effects
3. **UI Layer** - User-facing metadata and components

The `@andamio/transactions` package provides TypeScript definitions that unify all three layers with type safety.

### Key Concepts

**Transaction Definitions:** Protocol refs, validation schemas, build config, side effects, UI metadata
**Side Effects:** Auto database updates on transaction submission/confirmation
**Schema Separation:** Distinct blockchain params vs. database side effect params
**Input Helpers:** Type-safe functions formatting Database API data for transactions

## Core Components

### 1. Identity and Role
```typescript
{ txType: "MINT_MODULE_TOKENS", role: "course-creator" }
```

### 2. Protocol Reference
Links to YAML spec defining on-chain behavior:
```typescript
protocolSpec: {
  version: "v1",
  yamlPath: "/yaml/transactions/v1/...",
  requiredTokens: ["access-token-user", "course-nft"]
}
```

### 3. Build Configuration
Three schemas:
- `txApiSchema` - Blockchain params only
- `sideEffectSchema` - Database params only (not sent to chain)
- `inputSchema` - Combined validation

```typescript
buildTxConfig: {
  txApiSchema: z.object({ user_access_token, policy, module_infos }),
  sideEffectSchema: z.object({ moduleCode }),
  builder: { endpoint: "/tx/course-creator/mint-module-tokens" },
  estimatedCost: { txFee: 200000, minDeposit: 2000000 }
}
```

### 4. Side Effects
Auto database updates:

**onSubmit** - After transaction submission:
```typescript
{ method: "PATCH", endpoint: "/course-modules/{id}/status",
  body: { status: "PENDING_TX", pendingTxHash: "..." } }
```

**onConfirmation** - After blockchain confirmation:
```typescript
{ body: { status: "ON_CHAIN", blockchainTxHash: "..." } }
```

### 5. UI Metadata
```typescript
ui: { buttonText: "Mint Module Tokens",
  title: "...", description: [...], footerLink: "..." }
```

## How to Use Transaction Definitions

### Building a Transaction Component
```typescript
import { getTransactionDefinition } from "@andamio/transactions";
import { AndamioTransaction } from "@/components/transactions/andamio-transaction";

export function MintModuleTokens({ courseNftPolicyId, moduleCode }) {
  const txDef = getTransactionDefinition("MINT_MODULE_TOKENS");

  const inputs = {
    user_access_token: buildUserAccessToken(...),
    policy: courseNftPolicyId,
    module_infos: formatModuleInfosForMintModuleTokens(modules),
    moduleCode: moduleCode  // Side effect param only
  };

  return <AndamioTransaction definition={txDef} inputs={inputs} />;
}
```

The component handles: validation, fetching unsigned CBOR, wallet signing, blockchain submission, side effects, and success/error UI.

### Debugging Side Effects
Status stuck at PENDING_TX?

Check the side effect flow:
- APPROVED (before transaction)
- PENDING_TX (after onSubmit)
- ON_CHAIN (after onConfirmation)

If stuck, blockchain may not have confirmed or monitoring service failed.

### Creating Input Helpers
Transform database data to transaction format:

```typescript
export function formatModuleInfosForMintModuleTokens(modules): string {
  return JSON.stringify(modules.map(m => ({
    moduleCode: m.moduleCode,
    moduleTitle: m.title,
    SLTs: m.studentLearningTargets.map(slt => ({
      SLT_id: slt.id, SLT: slt.slt
    }))
  })));
}
```

## Best Practices

1. **Use getTransactionDefinition()** - Never hardcode transaction data
2. **Separate schemas** - Use `createSchemas()` for blockchain vs side effect params
3. **Idempotent side effects** - Use PATCH, design for retry safety
4. **Validate inputs first** - Parse through `inputSchema` before submission
5. **Handle failures gracefully** - Critical side effects go in `onConfirmation`

## Common Patterns

### ✅ Access Schemas Programmatically
```typescript
const blockchainParams = txDef.buildTxConfig.txApiSchema;
const sideEffectParams = txDef.buildTxConfig.sideEffectSchema;
const allParams = txDef.buildTxConfig.inputSchema;
```

### ✅ Reference Context Correctly
```typescript
body: {
  status: { source: "literal", value: "PENDING_TX" },
  txHash: { source: "context", path: "txHash" },
  userAlias: { source: "context", path: "buildInputs.accessTokenAlias" }
}
```

## Practice Exercise

1. Load `COMMIT_TO_ASSIGNMENT` definition and identify: YAML path, endpoint, all params in each schema, side effects
2. Trace `MINT_MODULE_TOKENS` lifecycle: inputs, builder endpoint, on-chain data, database updates, status transitions
3. Create type-safe input helper for a transaction
4. Build transaction component using `AndamioTransaction`

## Resources

- Package docs: `/packages/andamio-transactions/README.md`
- Protocol specs: `andamio-docs/public/yaml/transactions/`
- Live examples: `andamio-t3-app-template/src/components/transactions/`
