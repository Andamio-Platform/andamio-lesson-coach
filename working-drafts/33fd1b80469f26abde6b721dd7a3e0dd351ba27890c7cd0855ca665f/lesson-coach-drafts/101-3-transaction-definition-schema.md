---
courseNftPolicyId: "33fd1b80469f26abde6b721dd7a3e0dd351ba27890c7cd0855ca665f"
lesson: "101.3"
target_model: "developer-docs"
narrative: "Here's a first draft of a thing I'm working on...let's align on goals together and refine this thing."
vision: "Building packages for easy install - make it easy to build dapps...this means executing on-chain and off-chain logic as conveniently as possible. The structure of this schema allows to see the relationship between on-chain and off-chain data, and to recognize that all of it could happen on our API side - further abstracting the dev experience and expressing value for our APIs, all while keeping them easier to maintain. When we have just these definitions and our docs serving the ecosystem, good things will happen."
---

# Understand the Andamio Transaction Definition Schema

The purpose of this schema is to give the Andamio core development team a place to align on transaction design. 

Our goal if for developers to use our packages and APIs to handle both on-chain and off-chain logic without dealing with the complexity directly.

This schema is the interface contract - it shows the relationship between on-chain and off-chain data clearly. All execution happens API-side, abstracting away the hard parts while keeping our APIs maintainable. When we have just these definitions and our docs serving the ecosystem, we create massive value.

Here's a first draft. Let's align on goals and refine this together.

## Example: MINT_MODULE_TOKENS

Here's a complete transaction definition from the Andamio codebase:

```typescript
export const MINT_MODULE_TOKENS: AndamioTransactionDefinition = {
  txType: "MINT_MODULE_TOKENS",
  role: "course-creator",

  protocolSpec: {
    ...createProtocolSpec("v1", "course-creator.mint-module-tokens"),
    requiredTokens: ["global-state.access-token-user", "course.course-nft"],
  },

  buildTxConfig: {
    ...createSchemas({
      txParams: z.object({
        user_access_token: z.string().min(62),
        policy: z.string().length(56),
        module_infos: z.string().min(1), // JSON string of module details
      }),
    }),
    builder: {
      type: "api-endpoint",
      endpoint: "/tx/course-creator/mint-module-tokens"
    },
    estimatedCost: getProtocolCost("course-creator.mint-module-tokens"),
    inputHelpers: {
      module_infos: {
        helperName: "formatModuleInfosForMintModuleTokens",
        description: "Formats course modules into JSON string for transaction API",
        example: `const modules = await fetchModules(courseId);
const module_infos = formatModuleInfosForMintModuleTokens(modules);`,
      },
    },
  },

  onSubmit: [
    {
      def: "Update Course Module Status",
      method: "PATCH",
      endpoint: "/course-modules/{courseNftPolicyId}/{moduleCode}/status",
      pathParams: {
        courseNftPolicyId: "buildInputs.policy",
        moduleCode: "buildInputs.moduleCode",
      },
      body: {
        status: { source: "literal", value: "PENDING_TX" },
        pendingTxHash: { source: "context", path: "txHash" },
      },
    },
  ],

  onConfirmation: [
    {
      def: "Update Course Module Status",
      method: "PATCH",
      endpoint: "/course-modules/{courseNftPolicyId}/{moduleCode}/status",
      pathParams: {
        courseNftPolicyId: "buildInputs.policy",
        moduleCode: "buildInputs.moduleCode",
      },
      body: {
        status: { source: "literal", value: "ON_CHAIN" },
        moduleHash: { source: "onChainData", path: "mints[0].assetName" },
      },
    },
  ],

  ui: {
    buttonText: "Mint Module Tokens",
    title: "Mint Module Tokens",
    description: [
      "Minting a module token creates on-chain credentials for each course module.",
    ],
    footerLink: "https://docs.andamio.io/docs/protocol/v1/transactions/...",
    successInfo: "Module tokens minted successfully!",
  },

  docs: {
    protocolDocs: "https://docs.andamio.io/docs/protocol/v1/...",
    apiDocs: "https://api.andamio.io/docs#/transactions/mint-module-tokens",
  },
};
```

**What this schema does:**
- **Accepts inputs**: `user_access_token`, `policy`, `module_infos`
- **Builds transaction**: Calls `/tx/course-creator/mint-module-tokens` endpoint
- **On submit**: Marks module status as `PENDING_TX` in database
- **On confirmation**: Updates module status to `ON_CHAIN`, stores `moduleHash` from blockchain
- **Frontend sees**: Button text, form inputs, cost estimate, success message

**What this schema does NOT do:**
- Construct the actual Cardano transaction (that's the endpoint's job)
- Validate business rules (that's the endpoint's job)
- Interact with the database directly (side effect endpoints do that)

## Core Schema Structure

Every transaction definition has five sections:

```typescript
const TRANSACTION_NAME: AndamioTransactionDefinition = {
  txType: "TRANSACTION_NAME",        // Unique identifier
  role: "course-creator",             // Who can execute this

  protocolSpec: {                     // Protocol requirements
    version: "v1",
    requiredTokens: [...],
  },

  buildTxConfig: {                    // How to build the transaction
    txParams: z.object({...}),        // Input schema (Zod)
    builder: { endpoint: "..." },     // Where to build it
    estimatedCost: {...},             // Cost estimate for UX
  },

  onSubmit: [...],                    // Database updates when submitted
  onConfirmation: [...],              // Database updates when confirmed

  ui: {...},                          // Frontend display metadata
  docs: {...},                        // Documentation links
};
```

## Design Principles

### 1. Schema Matches YAML Spec

Transaction definitions in TypeScript mirror YAML specs in documentation. Developers should be able to implement from YAML alone.

**YAML (docs):**
```yaml
MINT_MODULE_TOKENS:
  txType: MINT_MODULE_TOKENS
  role: course-creator
  buildTxConfig:
    endpoint: /tx/course-creator/mint-module-tokens
    txParams:
      user_access_token: string(min:62)
      policy: string(length:56)
      module_infos: string(min:1)
```

**TypeScript (implementation):**
```typescript
export const MINT_MODULE_TOKENS: AndamioTransactionDefinition = {
  txType: "MINT_MODULE_TOKENS",
  role: "course-creator",
  buildTxConfig: {
    ...createSchemas({
      txParams: z.object({
        user_access_token: z.string().min(62),
        policy: z.string().length(56),
        module_infos: z.string().min(1),
      }),
    }),
    builder: {
      type: "api-endpoint",
      endpoint: "/tx/course-creator/mint-module-tokens"
    },
  },
  // ...
};
```

### 2. Business Logic Lives Elsewhere

The schema is **declarative**. It says WHAT, not HOW.

**Schema says WHAT:**
```typescript
buildTxConfig: {
  builder: {
    type: "api-endpoint",
    endpoint: "/tx/course-creator/mint-module-tokens"
  }
}
```

**Endpoint implements HOW:**
```typescript
// In andamio-db-api/src/routers/transactions/course-creator/mint-module-tokens.ts
export async function mintModuleTokens(input: MintModuleTokensInput) {
  // Actual business logic:
  // - Parse module_infos JSON
  // - Validate course ownership
  // - Construct Lucid transaction
  // - Mint module tokens with metadata
  const tx = await lucid.newTx()
    .mintAssets(moduleTokens)
    .attachMetadata(721, moduleMetadata)
    .complete();

  return { unsignedCBOR: tx.toString() };
}
```

All imperative logic lives in:
- **Build endpoints** (`/tx/*`) - Construct unsigned transactions
- **Side effect endpoints** (`/course-modules/*`) - Update database
- **Monitoring service** - Poll blockchain, trigger side effects

### 3. Frontend Only Needs Schema

This is the key insight: **just install the package, import the definition, and you're done.**

```typescript
import { MINT_MODULE_TOKENS } from "@andamio/transactions";

// Frontend automatically knows:
// - What inputs to collect (from txParams schema)
// - How to validate inputs (Zod validation)
// - Where to send them (builder.endpoint)
// - What it will cost (estimatedCost)
// - What to show user (ui.buttonText, ui.description)
// - What happens on submit/confirm (onSubmit, onConfirmation)
```

No frontend code needs to know about:
- Lucid transaction construction
- Cardano validators or smart contracts
- Database schemas or queries
- Business rules or validation logic

**This makes building Cardano dapps dramatically easier.** Install our package, reference our docs, and the complex blockchain logic is handled for you. Our APIs do the heavy lifting while remaining easy to maintain because all the logic lives in clearly defined places.

## Key Schema Components

### buildTxConfig

Defines how to construct the unsigned transaction:

```typescript
buildTxConfig: {
  // Input validation with Zod
  ...createSchemas({
    txParams: z.object({
      user_access_token: z.string().min(62),
      policy: z.string().length(56),
      module_infos: z.string().min(1),
    }),
  }),

  // Where to build the transaction
  builder: {
    type: "api-endpoint",
    endpoint: "/tx/course-creator/mint-module-tokens",
  },

  // Cost estimate for UX
  estimatedCost: getProtocolCost("course-creator.mint-module-tokens"),

  // Optional: Helper functions for complex inputs
  inputHelpers: {
    module_infos: {
      helperName: "formatModuleInfosForMintModuleTokens",
      description: "Formats course modules into JSON",
    },
  },
}
```

### onSubmit and onConfirmation

Side effects are database operations triggered at transaction lifecycle events:

```typescript
onSubmit: [
  {
    def: "Update Course Module Status",
    method: "PATCH",
    endpoint: "/course-modules/{courseNftPolicyId}/{moduleCode}/status",
    pathParams: {
      courseNftPolicyId: "buildInputs.policy",      // From original inputs
      moduleCode: "buildInputs.moduleCode",
    },
    body: {
      status: { source: "literal", value: "PENDING_TX" },
      pendingTxHash: { source: "context", path: "txHash" },  // From tx context
    },
  },
],

onConfirmation: [
  {
    def: "Update Course Module Status",
    method: "PATCH",
    endpoint: "/course-modules/{courseNftPolicyId}/{moduleCode}/status",
    pathParams: {
      courseNftPolicyId: "buildInputs.policy",
      moduleCode: "buildInputs.moduleCode",
    },
    body: {
      status: { source: "literal", value: "ON_CHAIN" },
      moduleHash: { source: "onChainData", path: "mints[0].assetName" },  // From blockchain
    },
  },
],
```

**Data sources:**
- `literal` - Hardcoded value
- `buildInputs` - Original transaction inputs
- `context` - Transaction context (txHash, userId, etc.)
- `onChainData` - Blockchain data (only in onConfirmation)

### ui Metadata

Describes how to render the transaction:

```typescript
ui: {
  buttonText: "Mint Module Tokens",
  title: "Mint Module Tokens",
  description: [
    "Minting a module token creates on-chain credentials for each course module.",
  ],
  footerLink: "https://docs.andamio.io/docs/protocol/v1/...",
  footerLinkText: "Tx Documentation",
  successInfo: "Module tokens minted successfully!",
}
```

## Implementation Workflow

### Adding a New Transaction

1. **Check YAML spec** in docs for transaction structure
2. **Create schema file** in `packages/andamio-transactions/src/definitions/`
3. **Match structure** from YAML to TypeScript
4. **Implement build endpoint** in `andamio-db-api/src/routers/transactions/`
5. **Implement side effect endpoints** in relevant routers
6. **Export from index** in `packages/andamio-transactions/src/index.ts`
7. **Test** using the frontend or Swagger

### Example: Adding a New Transaction

**Step 1: Define schema**
```typescript
// packages/andamio-transactions/src/definitions/student/submit-assignment.ts
export const SUBMIT_ASSIGNMENT: AndamioTransactionDefinition = {
  txType: "SUBMIT_ASSIGNMENT",
  role: "student",
  buildTxConfig: {
    ...createSchemas({
      txParams: z.object({
        assignmentId: z.string(),
        submissionUrl: z.string().url(),
      }),
    }),
    builder: {
      type: "api-endpoint",
      endpoint: "/tx/student/submit-assignment",
    },
  },
  // ... rest of definition
};
```

**Step 2: Implement build endpoint**
```typescript
// andamio-db-api/src/routers/transactions/student/submit-assignment.ts
export async function buildSubmitAssignment(input: SubmitAssignmentInput) {
  // Business logic here
  const tx = await lucid.newTx()
    .payToAddress(assignmentAddress, { lovelace: 2000000n })
    .attachMetadata(721, { assignmentId: input.assignmentId })
    .complete();

  return { unsignedCBOR: tx.toString() };
}
```

**Step 3: Implement side effects**
```typescript
// andamio-db-api/src/routers/assignments.ts
export async function updateAssignmentStatus(data: UpdateAssignmentInput) {
  await db.assignment.update({
    where: { id: data.assignmentId },
    data: {
      status: data.status,
      submissionUrl: data.submissionUrl,
      submittedAt: new Date(),
    },
  });
}
```

## Common Patterns

### Pattern 1: Pending Status on Submit

```typescript
onSubmit: [
  {
    def: "Mark as pending",
    endpoint: "/endpoint",
    body: {
      status: { source: "literal", value: "PENDING_TX" },
    },
  },
],
```

UX shows immediate feedback while blockchain confirms.

### Pattern 2: Extract On-Chain Data

```typescript
onConfirmation: [
  {
    def: "Store blockchain data",
    body: {
      moduleHash: { source: "onChainData", path: "mints[0].assetName" },
      txTimestamp: { source: "onChainData", path: "timestamp" },
    },
  },
],
```

Database stores proof from blockchain.

### Pattern 3: Path Parameters from Inputs

```typescript
onConfirmation: [
  {
    endpoint: "/courses/{courseId}/modules/{moduleCode}",
    pathParams: {
      courseId: "buildInputs.courseId",
      moduleCode: "buildInputs.moduleCode",
    },
  },
],
```

RESTful endpoints using original inputs.

## What You've Built

You understand how transaction schemas serve as the interface contract between frontend and backend. This architecture enables:

**For dapp developers:**
- Install `@andamio/transactions` package
- Import definitions, use them immediately
- No need to understand Cardano transaction construction
- No need to manage blockchain/database coordination

**For the Andamio ecosystem:**
- Clear separation: schema (interface) vs implementation (business logic)
- APIs handle all complexity server-side
- Maintainable because logic is organized and documented
- Scalable because adding transactions is straightforward

**For you as a contributor:**
- Read existing transaction definitions
- Understand the separation between declarative schema and imperative logic
- Identify where business logic lives for each transaction
- Write new transaction definitions following this pattern

## Next Steps

This is work in progress. As we refine this architecture:

- Explore `packages/andamio-transactions/src/definitions/` for current examples
- Compare schemas to their build endpoint implementations
- Review how docs and definitions work together
- Provide feedback on this structure
- Consider how you'd use these packages in your own dapps

The vision: When developers can just install our package, reference our docs, and build Cardano dapps without dealing with transaction complexity, we'll know we've succeeded.

---

**Further Reading:**
- `packages/andamio-transactions/` - Transaction definitions
- `andamio-db-api/src/routers/transactions/` - Build endpoint implementations
- https://docs.andamio.io/docs/protocol/v1/transactions/ - Protocol specs

*Part of What's New at Andamio > Andamio DB API and Template*
