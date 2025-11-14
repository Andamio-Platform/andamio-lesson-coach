# MCP Marketplace Integration Guide

Quick reference for publishing the Andamio Lesson Coach to various MCP marketplaces and distribution channels.

---

## 1. NPM Public Package

### Preparation

**Update package.json**:
```json
{
  "name": "@andamio/lesson-coach",
  "version": "1.0.0",
  "description": "AI-powered lesson generation for educational content. Transform learning targets into high-quality, contribution-centered lessons.",
  "keywords": [
    "mcp",
    "education",
    "ai",
    "lesson-generation",
    "course-creation",
    "pedagogy",
    "claude",
    "andamio"
  ],
  "author": "Andamio <hello@andamio.io>",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/andamio/lesson-coach.git"
  },
  "homepage": "https://andamio.io/lesson-coach",
  "bugs": {
    "url": "https://github.com/andamio/lesson-coach/issues"
  }
}
```

### Check Package Name Availability

```bash
npm search @andamio/lesson-coach
# If name taken, try alternatives:
# - andamio-lesson-coach
# - @andamio/lesson-generator
# - @andamio/course-coach
```

### Publish

```bash
# Login to NPM
npm login

# Test package locally first
npm pack
# Creates: andamio-lesson-coach-1.0.0.tgz

# Test installation
npm install -g ./andamio-lesson-coach-1.0.0.tgz

# If all good, publish
npm publish --access public
```

### Post-Publication

- Add NPM badge to README
- Monitor download stats
- Set up Dependabot for security updates

---

## 2. Smithery (MCP Directory)

### Create Assets

**Directory structure**:
```
.smithery/
├── config.yaml
└── assets/
    ├── icon.png (256x256)
    ├── screenshot-1.png
    ├── screenshot-2.png
    └── demo-video.mp4 (optional)
```

### config.yaml

```yaml
name: andamio-lesson-coach
displayName: Andamio Lesson Coach
tagline: Transform learning targets into complete lessons with AI
description: |
  AI-powered lesson generation that helps domain experts create high-quality,
  student-centered educational content without requiring teaching expertise.

  Features:
  - 4 specialized lesson types (Product Demo, Developer Docs, How-To, Onboarding)
  - Built-in SLT (Student Learning Target) validation
  - Contribution-centered pedagogy
  - Smart lesson type suggestions
  - Quality-assured content generation

author:
  name: Andamio
  url: https://andamio.io
  email: hello@andamio.io

version: 1.0.0
license: MIT

icon: ./assets/icon.png

screenshots:
  - path: ./assets/screenshot-1.png
    caption: Generate lessons from learning targets
  - path: ./assets/screenshot-2.png
    caption: Four specialized lesson types

categories:
  - Education
  - Content Creation
  - Productivity

tags:
  - lesson-generation
  - education
  - course-creation
  - ai-assisted
  - pedagogy

installation:
  npm: "@andamio/lesson-coach"
  instructions: |
    Install via NPM:
    ```bash
    npm install -g @andamio/lesson-coach
    ```

    Or use with npx (no installation):
    ```bash
    npx @andamio/lesson-coach
    ```

configuration:
  claude_desktop: |
    Add to Claude Desktop config:
    ```json
    {
      "mcpServers": {
        "andamio-lesson-coach": {
          "command": "npx",
          "args": ["-y", "@andamio/lesson-coach"]
        }
      }
    }
    ```

pricing:
  model: freemium
  free_tier:
    - Basic lesson generation
    - 10 lessons per month
    - Community support
  paid_tiers:
    - name: Pro
      price: 29
      period: monthly
      features:
        - Unlimited lessons
        - All lesson types
        - Priority support
        - Custom templates
  url: https://andamio.io/pricing

support:
  documentation: https://docs.andamio.io/lesson-coach
  github: https://github.com/andamio/lesson-coach
  issues: https://github.com/andamio/lesson-coach/issues
  email: support@andamio.io

links:
  website: https://andamio.io
  demo: https://www.youtube.com/watch?v=demo-video
  blog: https://andamio.io/blog/introducing-lesson-coach
```

### Submission Process

1. **Fork Smithery registry** (if GitHub-based submission)
2. **Add your config** to the appropriate directory
3. **Submit PR** with your listing
4. **Respond to review** feedback
5. **Wait for approval** and publication

Or use Smithery's web interface if available.

---

## 3. GitHub Marketplace

### Create GitHub App (if interactive features needed)

For passive listing, just ensure:
- [ ] Comprehensive README.md
- [ ] LICENSE file
- [ ] Example usage
- [ ] Screenshots in repo
- [ ] GitHub topics/tags

**Add topics to repo**:
```
Settings → Topics
Add: mcp, education, ai, lesson-generation, claude-code, etc.
```

### GitHub Packages (Alternative to NPM)

```bash
# Configure for GitHub Packages
npm config set @andamio:registry https://npm.pkg.github.com

# Publish
npm publish
```

In package.json:
```json
{
  "name": "@andamio/lesson-coach",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  }
}
```

---

## 4. Anthropic MCP Registry (Future)

**Watch for**: Official Anthropic MCP registry announcement

**Likely requirements**:
- Verified authorship
- Security review
- Usage metrics
- Support commitment
- Terms of service compliance

**Preparation**:
- Build track record on Smithery
- Gather user testimonials
- Document security practices
- Prepare for review process

---

## 5. Claude.ai App Store (Future)

If Anthropic launches an app store for Claude.ai:

**Requirements** (speculative):
- Hosted MCP server (not local)
- OAuth integration
- Usage metering
- Revenue sharing agreement
- Content moderation
- Privacy compliance

**Preparation**:
- Build SaaS version (see COMMERCIALIZATION-STRATEGY.md)
- Implement OAuth
- Ensure scalability
- Legal review

---

## Distribution Checklist

### Pre-Publication
- [ ] Build succeeds: `npm run build`
- [ ] Package.json metadata complete
- [ ] README.md professional and comprehensive
- [ ] LICENSE file present
- [ ] Example usage documented
- [ ] Screenshots created (high quality)
- [ ] Demo video recorded (optional but recommended)
- [ ] Security review completed
- [ ] Testing on clean machine

### NPM
- [ ] Package name available
- [ ] NPM account created
- [ ] Test with `npm pack` and local install
- [ ] Publish: `npm publish`
- [ ] Verify on npmjs.com
- [ ] Test install: `npm install -g @andamio/lesson-coach`
- [ ] Update README with NPM badge

### Smithery
- [ ] Create .smithery/ directory
- [ ] Create config.yaml
- [ ] Create icon (256x256 PNG)
- [ ] Create screenshots
- [ ] Submit to registry
- [ ] Respond to review feedback
- [ ] Announce publication

### GitHub
- [ ] Repository is public
- [ ] Topics/tags added
- [ ] README has screenshots
- [ ] Issues template created
- [ ] Contributing guide (if accepting PRs)
- [ ] Code of conduct
- [ ] Star the repo yourself 😄

### Marketing
- [ ] Landing page live
- [ ] Blog post written
- [ ] Social media announcement
- [ ] Product Hunt submission
- [ ] Hacker News post
- [ ] Reddit posts (r/ClaudeAI, r/MachineLearning, etc.)
- [ ] Email existing Andamio users

---

## Asset Requirements

### Icon
- **Size**: 256x256px minimum
- **Format**: PNG with transparency
- **Style**: Simple, recognizable, professional
- **Colors**: Match Andamio brand
- **File size**: < 100KB

### Screenshots
- **Size**: 1280x720 or 1920x1080
- **Format**: PNG or JPG
- **Content**:
  - Screenshot 1: Main UI/workflow
  - Screenshot 2: Sample output
  - Screenshot 3: Configuration (optional)
- **Annotations**: Add callouts/highlights for key features
- **File size**: < 500KB each

### Demo Video
- **Length**: 60-90 seconds
- **Format**: MP4
- **Content**:
  - 0-10s: Hook (problem statement)
  - 10-40s: Solution demo (quick walkthrough)
  - 40-60s: Key benefits
  - 60-90s: Call to action
- **Quality**: 1080p minimum
- **Audio**: Clear voiceover or text overlay
- **File size**: < 50MB (or host on YouTube)

---

## Marketplace Best Practices

### 1. Professional Presentation
- High-quality visuals
- Clear value proposition
- Professional writing
- Consistent branding

### 2. Clear Documentation
- Quick start guide
- Example use cases
- API reference
- Troubleshooting
- FAQ

### 3. Active Maintenance
- Respond to issues quickly (< 24 hours)
- Regular updates
- Changelog maintained
- Security patches prioritized

### 4. Community Building
- GitHub Discussions enabled
- Discord/Slack community
- Twitter presence
- Email newsletter

### 5. Social Proof
- User testimonials
- Case studies
- Usage statistics
- Media mentions

---

## Monitoring & Analytics

### Track These Metrics

**NPM**:
- Weekly/monthly downloads
- Version adoption rate
- Dependent packages

**Smithery/Marketplace**:
- Views
- Installs
- Ratings/reviews
- Search ranking

**GitHub**:
- Stars
- Forks
- Issues opened/closed
- Contributors

**Website**:
- Landing page visits
- Conversion to install
- Documentation views
- Support requests

### Tools
- NPM stats: https://npmtrends.com
- GitHub insights: Built-in analytics
- Google Analytics: For website
- PostHog: For product analytics
- Stripe: For revenue (if monetizing)

---

## Support Strategy

### Free Tier Support
- GitHub Issues only
- Community forum
- Documentation
- Response time: Best effort (2-3 days)

### Pro Tier Support
- Email support
- Priority GitHub issues
- Response time: 24 hours
- Monthly office hours (optional)

### Enterprise Support
- Dedicated Slack channel
- Phone/video support
- Response time: 4 hours
- Dedicated account manager
- Custom integrations

---

## Legal Requirements

### Before Publishing

**MIT License** (recommended for open source):
```
MIT License

Copyright (c) 2025 Andamio

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
[...]
```

**Or AGPL** (if wanting copyleft protection):
- Requires derivatives to be open source
- Can offer commercial license for proprietary use

**Terms of Service** (if hosted/SaaS):
- Usage limitations
- Acceptable use policy
- Data handling
- Liability disclaimers

**Privacy Policy** (if collecting data):
- What data is collected
- How it's used
- How it's protected
- User rights

---

## Revenue Integration

### For Paid Tiers

**Stripe Integration**:
```typescript
// Check user quota before generation
async function checkQuota(userId: string): Promise<boolean> {
  const subscription = await stripe.subscriptions.retrieve(user.stripeSubscriptionId);

  if (subscription.status !== 'active') {
    throw new Error('Subscription inactive');
  }

  const usage = await getMonthlyUsage(userId);
  const quota = getQuotaForPlan(subscription.items.data[0].price.id);

  return usage < quota;
}
```

**Usage Reporting**:
```typescript
// Report usage to Stripe (for metered billing)
await stripe.subscriptionItems.createUsageRecord(
  subscriptionItemId,
  {
    quantity: 1, // 1 lesson generated
    timestamp: Math.floor(Date.now() / 1000),
    action: 'increment',
  }
);
```

---

## Troubleshooting Common Issues

### "Package name already taken"
- Try scoped package: `@andamio/lesson-coach`
- Or different name: `andamio-lesson-generator`

### "Smithery submission rejected"
- Ensure all required fields in config.yaml
- Check image sizes and formats
- Verify installation instructions work
- Test on clean machine

### "Low discoverability"
- Optimize description for keywords
- Add more tags/categories
- Create blog posts and tutorials
- Engage on social media
- Submit to aggregators (Product Hunt, etc.)

### "Quality concerns from users"
- Add more examples to docs
- Create video walkthrough
- Improve error messages
- Add validation and guardrails
- Iterate based on feedback

---

## Next Steps

1. **This Week**: Publish to NPM
2. **Next Week**: Submit to Smithery
3. **This Month**: Create marketing materials
4. **Next Month**: Launch Pro tier (if monetizing)

See [COMMERCIALIZATION-STRATEGY.md](./COMMERCIALIZATION-STRATEGY.md) for full go-to-market plan.

---

**Last Updated**: 2025-11-14
**Status**: Ready for publication
**Next Action**: Choose package name and publish to NPM
