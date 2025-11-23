# Andamio Lesson Coach Documentation

## Start Here

🚀 **[GETTING-STARTED.md](../GETTING-STARTED.md)** - Complete setup guide for developers (with local DB API) ⭐

📋 **[TOOLS-REFERENCE.md](../TOOLS-REFERENCE.md)** - Comprehensive reference for all 13 MCP tools

⭐ **[QUICK-REFERENCE.md](./QUICK-REFERENCE.md)** - One-page overview of deployment options

---

## Documentation Index

### Setup & Installation

- **[GETTING-STARTED.md](../GETTING-STARTED.md)** - Complete setup guide ⭐
  - Install & build
  - Environment configuration
  - Claude Desktop setup
  - Quick tests and workflows
  - Troubleshooting

- **[TOOLS-REFERENCE.md](../TOOLS-REFERENCE.md)** - All 13 tools documented
  - Parameter specifications
  - Usage examples
  - Workflow examples
  - Error handling

- **[API-INTEGRATION.md](../API-INTEGRATION.md)** - API integration details
  - Setup instructions
  - Available endpoints
  - Content format conversion
  - Troubleshooting

- **[QUICK-START.md](./QUICK-START.md)** - Fast-track guide
  - Local development setup
  - Claude Desktop deployment
  - First lesson generation
  - Testing your installation

- **[DEPLOY-TO-CLAUDE-DESKTOP.md](./DEPLOY-TO-CLAUDE-DESKTOP.md)** - Step-by-step runbook
  - 10-step deployment process
  - Troubleshooting guide
  - Post-deployment verification

### Deployment & Operations

- **[DEPLOYMENT-PLAN.md](./DEPLOYMENT-PLAN.md)** - Comprehensive deployment strategy
  - 4 deployment contexts (Local, Desktop, NPM, Platform)
  - 4 phases with timelines and success criteria
  - Technical requirements per phase
  - Monitoring and maintenance
  - Rollback procedures

### Commercialization & Distribution

- **[DECISION-FRAMEWORK.md](./DECISION-FRAMEWORK.md)** - Choose your commercialization path ⭐
  - Licensing model decision tree
  - Distribution strategy options
  - Monetization approaches
  - Recommended path: Strategic Open Core

- **[COMMERCIALIZATION-STRATEGY.md](./COMMERCIALIZATION-STRATEGY.md)** - Full market strategy
  - 5 distribution channels
  - Pricing models and revenue projections
  - Go-to-market strategy by phase
  - Technical requirements for monetization
  - Competitive analysis

- **[MARKETPLACE-INTEGRATION-GUIDE.md](./MARKETPLACE-INTEGRATION-GUIDE.md)** - Practical publishing guide
  - NPM publication steps
  - Smithery integration
  - Asset requirements
  - Support strategy
  - Revenue integration

### Testing & Quality

- **[TESTING-CHECKLIST.md](./TESTING-CHECKLIST.md)** - Comprehensive testing protocol
  - Tool testing (3 tools)
  - Prompt testing (5 prompts)
  - Resource testing (5 resources)
  - Quality assessment criteria
  - Real-world lesson generation tracking

### User Documentation

- **[MCP-SERVER.md](../MCP-SERVER.md)** - User-facing MCP server documentation
  - Installation instructions
  - Available tools, resources, and prompts
  - Example usage
  - Troubleshooting

### Development Documentation

- **[CLAUDE.md](../CLAUDE.md)** - Project instructions for AI assistance
  - Project overview and structure
  - Core principles for content generation
  - Development workflow

- **[ENHANCEMENT-SUMMARY.md](../ENHANCEMENT-SUMMARY.md)** - Recent enhancements
  - New API capabilities
  - SLT and lesson management
  - Technical implementation details
  - Testing status

## Quick Links

### For Developers
- [TypeScript source](../src/)
- [Lesson generators](../src/generators/)
- [Build output](../build/)

### For Content Creators
- [Lesson types](../lesson-types/)
- [Context materials](../context/)
- [Sample courses](../courses/)

## Current Status

**Phase**: Phase 1+ Complete - MCP Server + Full API Integration
**Status**: Ready for local development and testing
**Features**:
- ✅ 13 MCP tools (lesson generation + full CRUD for SLTs and lessons)
- ✅ Automatic markdown ↔ Tiptap JSON conversion
- ✅ Complete API integration with andamio-db-api
- ✅ Comprehensive documentation

**Next Steps**:
1. Test with real course content
2. Generate lessons and iterate on quality
3. Validate workflows with content creators

See [DEPLOYMENT-PLAN.md](./DEPLOYMENT-PLAN.md) for full roadmap.
