---
courseNftPolicyId: "33fd1b80469f26abde6b721dd7a3e0dd351ba27890c7cd0855ca665f"
lesson: "101.2"
target_model: "how-to-guide"
narrative: ""
vision: ""
---

# Run the Andamio T3 App Template Locally

## Why This Matters for Your Contribution

The T3 App Template is your development environment for building and testing Andamio frontend features. Running it locally lets you see how API changes affect the UI, test new components, and develop features in the complete stack.

## Prerequisites

Before you begin, ensure you have:

- Andamio DB API running on localhost:4000 (see previous lesson)
- Cardano wallet browser extension installed (Eternl, Nami, Flint, etc.)
- The andamio-platform-monorepo already cloned and set up

## Overview

You'll configure the frontend to connect to your local API, start the development server, and verify the complete stack integration. This takes about 5 minutes once the API is running.

## Step-by-Step Instructions

### Step 1: Configure Frontend Environment

**What to do:**
```bash
cd andamio-t3-app-template
cp .env.example .env
```

Edit `.env` and set:
```
NEXT_PUBLIC_ANDAMIO_API_URL="http://localhost:4000/api/v0"
NEXT_PUBLIC_NETWORK="preprod"
```

The frontend needs to know where your local API is running. Unlike production where it points to a deployed API, local development uses localhost:4000.

**Expected result:**
You have a configured `.env` file pointing to your local API.

---

### Step 2: Install Dependencies (if needed)

**What to do:**
If you haven't run the setup scripts yet:
```bash
cd ..  # Back to monorepo root
npm install
```

npm workspaces creates symlinks so the frontend can import types directly from the API package, giving you full type safety.

**Expected result:**
All packages installed, with workspace symlinks created.

---

### Step 3: Start the Frontend Dev Server

**What to do:**
```bash
npm run dev
```

This starts Next.js on localhost:3000 with hot reload enabled. Changes you make to components will appear immediately.

**Expected result:**
Console output showing Next.js running on http://localhost:3000

---

### Step 4: Open and Test the App

**What to do:**
1. Open http://localhost:3000 in your browser
2. Click "Connect Wallet"
3. Select your Cardano wallet extension
4. Sign the authentication message

This verifies the complete authentication flow works: wallet connection → signature → JWT from API → authenticated session.

**Expected result:**
You're logged in and can see the main dashboard interface.

---

## You'll Know You are Successful When:

You've successfully set up the frontend when:

- App loads at http://localhost:3000
- You can connect your Cardano wallet
- Authentication completes successfully
- You can navigate the interface without errors
- Console shows no API connection errors

## Testing the Full Stack

Try these interactions to verify everything works:

**View Courses:**
Navigate to the courses page to see data fetched from your local API.

**Check Network Tab:**
Open browser DevTools → Network tab. API calls should go to `localhost:4000/api/v0/*`

**Test Type Safety:**
In your code editor, open a component that uses API types. IntelliSense should show full type information imported from `andamio-db-api`.

## Common Issues and Solutions

### Issue: API connection failed / 404 errors
**Why it happens:** API server isn't running or NEXT_PUBLIC_ANDAMIO_API_URL is wrong
**How to fix it:**
- Verify API is running: `curl http://localhost:4000/health`
- Check `.env` has the exact URL: `http://localhost:4000/api/v0`
- Restart the dev server after changing `.env`

### Issue: Wallet won't connect
**Why it happens:** Browser extension not installed or wrong network
**How to fix it:**
- Verify you have a Cardano wallet extension installed
- Switch wallet to Preprod network (matches NEXT_PUBLIC_NETWORK)
- Try a different wallet extension if issues persist

### Issue: Type errors in the code editor
**Why it happens:** Workspace symlinks not created or API not built
**How to fix it:**
```bash
cd andamio-db-api
npm run build
cd ..
npm install  # Refresh workspace links
```

### Issue: Changes to API types not reflecting in frontend
**Why it happens:** API package needs rebuilding
**How to fix it:**
```bash
cd andamio-db-api
npm run build
# Frontend will hot-reload with new types
```

## Tips from Experience

💡 **Run both servers in split terminals**: Keep API (left) and frontend (right) visible. You'll see errors immediately in the relevant terminal.

💡 **Use Preprod for development**: Always test with preprod network. It's safe, free test ADA is available, and it mirrors mainnet without risk.

💡 **Watch the Network tab**: DevTools → Network shows exactly what API calls are being made. Essential for debugging state management issues.

💡 **Type imports are immediate**: When the API builds successfully, new types are available instantly in the frontend. No restart needed thanks to hot reload.

## Understanding the Type Safety Flow

This is what makes the monorepo powerful:

1. You add an endpoint in `andamio-db-api/src/routers/`
2. Run `npm run build` in andamio-db-api
3. Import the type in frontend: `import { type MyType } from "andamio-db-api"`
4. Full autocomplete and type checking work immediately

You'll practice this workflow in upcoming lessons.

## What You've Built

You now have the complete Andamio development stack running locally: DB API + Frontend + Wallet Auth. You can develop features, test changes, and see the full user experience.

## Next Steps

- Explore the UI and understand the navigation
- Try creating test content (courses, modules)
- Move on to learning about the transaction definition schema
- Prepare to make your first API changes with full type safety

---

*Part of What's New at Andamio > Andamio DB API and Template*
