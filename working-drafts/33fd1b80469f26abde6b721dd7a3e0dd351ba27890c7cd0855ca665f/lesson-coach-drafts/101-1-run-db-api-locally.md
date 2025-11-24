---
courseNftPolicyId: "33fd1b80469f26abde6b721dd7a3e0dd351ba27890c7cd0855ca665f"
lesson: "101.1"
target_model: "how-to-guide"
narrative: ""
vision: ""
---

# Run the Andamio DB API Locally

## Student Learning Target

I can run the Andamio DB API locally.

## Why This Matters for Your Contribution

Running the DB API locally is essential for contributing to the Andamio platform. Whether you're developing new features, fixing bugs, or testing integrations, you need a local instance to work with the complete stack without affecting production systems.

## Prerequisites

Before you begin, ensure you have:

- [ ] Node.js 20 or higher installed
- [ ] PostgreSQL database running locally
- [ ] Git installed and configured
- [ ] Basic familiarity with terminal commands

## Overview

You'll set up the Andamio platform monorepo, configure the database API, and verify it's running. The process takes about 10-15 minutes for first-time setup.

## Step-by-Step Instructions

### Step 1: Clone the Monorepo

**What to do:**
```bash
git clone git@github.com:Andamio-Platform/andamio-platform-monorepo.git
cd andamio-platform-monorepo
```

**Why it matters:**
The monorepo contains both the DB API and frontend template, configured as npm workspaces. This setup provides the type safety and integration you need for development work.

**Expected result:**
You should have a `andamio-platform-monorepo` directory with subdirectories that will be populated in the next step.

---

### Step 2: Run the Setup Script

**What to do:**
```bash
./scripts/setup.sh
```

**Why it matters:**
This script clones the actual repositories (andamio-db-api and andamio-t3-app-template) if they don't exist, setting up the workspace structure.

**Expected result:**
You'll see two new directories: `andamio-db-api/` and `andamio-t3-app-template/`

---

### Step 3: Configure Environment Variables

**What to do:**
```bash
cd andamio-db-api
cp .env.example .env
```

Then edit `.env` with your database details:
```
DATABASE_URL="postgresql://user:password@localhost:5432/andamio_dev"
JWT_SECRET="your-secure-random-string-here"
```

**Why it matters:**
The API needs database credentials to connect to PostgreSQL and a JWT secret for authentication. Without these, the API cannot start.

**Expected result:**
You have a configured `.env` file in the `andamio-db-api` directory.

---

### Step 4: Build for Local Development

**What to do:**
```bash
cd ..  # Back to monorepo root
./scripts/dev-setup.sh
```

**Why it matters:**
This builds the necessary packages, generates the Prisma client, and sets up npm workspace symlinks for type safety across the stack.

**Expected result:**
You'll see build output for multiple packages, ending with successful completion messages.

---

### Step 5: Start the API Server

**What to do:**
```bash
npm run dev:api
```

**Why it matters:**
This starts the tRPC/REST API server on localhost:4000, making it available for frontend development and testing.

**Expected result:**
Console output showing the server running on port 4000.

---

## Verification

You've successfully set up the DB API when:

- [ ] Server is running on http://localhost:4000
- [ ] Health check responds: http://localhost:4000/health
- [ ] Swagger UI loads: http://localhost:4000/swagger/index.html
- [ ] No database connection errors in the console

## Testing the API

Visit these endpoints to confirm everything works:

**Health Check:**
```bash
curl http://localhost:4000/health
```

**OpenAPI Documentation:**
Open http://localhost:4000/swagger/index.html in your browser to explore all available endpoints.

## Common Issues and Solutions

### Issue: Database connection refused
**Why it happens:** PostgreSQL isn't running or DATABASE_URL is incorrect
**How to fix it:**
- Verify PostgreSQL is running: `pg_isready`
- Check your DATABASE_URL format matches your actual database credentials

### Issue: Port 4000 already in use
**Why it happens:** Another process is using port 4000
**How to fix it:**
- Kill the existing process: `lsof -ti:4000 | xargs kill -9`
- Or change the port in the API configuration

### Issue: Prisma client not generated
**Why it happens:** Build step failed or was skipped
**How to fix it:**
```bash
cd andamio-db-api
npx prisma generate
```

## Tips from Experience

💡 **Keep both terminals visible**: Run the API in one terminal and keep it visible while developing. Error messages appear immediately when something breaks.

💡 **Use the Swagger UI**: It's the fastest way to test endpoints without writing frontend code. Great for exploring the API structure.

💡 **Watch for type changes**: When you modify API types, rebuild with `npm run build` in the andamio-db-api directory. The frontend will immediately have access to updated types.

## What You've Built

You now have a fully functional local instance of the Andamio DB API. This is your development environment for working on backend features, testing integrations, and building new capabilities.

## Next Steps

- Explore the API documentation at http://localhost:4000/swagger/index.html
- Try making a test API call
- Move on to running the T3 App Template to complete your local stack

---

*Part of What's New at Andamio > Andamio DB API and Template*
