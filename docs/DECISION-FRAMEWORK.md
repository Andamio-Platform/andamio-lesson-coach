# Commercialization Decision Framework

Quick guide to help you choose the right path for productizing the Andamio Lesson Coach MCP.

---

## Key Decision Points

### Decision 1: Licensing Model

**Question**: How open do you want this to be?

| Option | Best For | Pros | Cons | Recommendation |
|--------|----------|------|------|----------------|
| **MIT (Fully Open)** | Community building, maximum adoption | - Fast adoption<br>- Community contributions<br>- Trust building | - Hard to monetize<br>- Anyone can compete<br>- No protection | ⭐ **If**: Priority is Andamio ecosystem growth |
| **AGPL + Commercial** | Open core with monetization | - Code visible<br>- Forces contributions<br>- Revenue from commercial use | - More complex<br>- Legal overhead<br>- May limit adoption | ⭐ **If**: Want to monetize while staying open |
| **Source Available (BSL)** | Clear monetization, visible code | - Clear commercial model<br>- Code visible for trust<br>- Converts to OSS later | - Not true open source<br>- May limit adoption | ⭐ **If**: Serious about revenue, willing to wait for trust |
| **Proprietary** | Maximum control and revenue | - Full control<br>- Clear pricing<br>- Competitive protection | - Harder to build trust<br>- No community<br>- Slower adoption | ❌ **Not recommended** for MCP tools |

**Our Recommendation**:
Start with **MIT** for the first 3-6 months to build community and validate product-market fit. Then evaluate moving to **AGPL + Commercial** if monetization becomes priority.

---

### Decision 2: Distribution Strategy

**Question**: Where should people get this?

| Channel | Timeline | Effort | Audience | Impact |
|---------|----------|--------|----------|--------|
| **NPM Public** | Week 1 | Low | Developers, power users | ⭐⭐⭐⭐⭐ Essential |
| **Smithery** | Week 2 | Medium | MCP users, Claude users | ⭐⭐⭐⭐ High value |
| **GitHub** | Week 1 | Low | Developers | ⭐⭐⭐⭐ Essential |
| **SaaS/Hosted** | Month 4-6 | High | Non-technical users | ⭐⭐⭐ Future opportunity |
| **Platform Plugins** | Month 6+ | High | Platform users | ⭐⭐⭐ Future opportunity |

**Our Recommendation**:
1. **Immediate**: NPM + GitHub + Smithery (free tier)
2. **Month 3-6**: Add SaaS hosted version (paid tier)
3. **Month 6+**: Platform integrations (Obsidian, Notion, etc.)

---

### Decision 3: Monetization Approach

**Question**: How should this make money?

#### Option A: Freemium

**Free Tier**:
- 10 lessons/month
- All lesson types
- Community support

**Pro Tier** ($29/month):
- Unlimited lessons
- Priority support
- Advanced templates

**Best for**: Individual creators, small teams

**Pros**: Low barrier to entry, clear upgrade path
**Cons**: Many users may never convert

---

#### Option B: Usage-Based

**Pricing**:
- $1-2 per lesson generated
- Prepaid credit packages
- Volume discounts

**Best for**: Sporadic users, testing

**Pros**: Pay-for-value, low commitment
**Cons**: Harder to predict revenue, may discourage usage

---

#### Option C: Seat-Based

**Pricing**:
- $15-25 per user/month
- Team plans (5+ seats)
- Enterprise (custom)

**Best for**: Organizations, course platforms

**Pros**: Predictable revenue, scales with teams
**Cons**: Higher barrier for individual users

---

#### Option D: Open Core

**Open Source**:
- Basic MCP server
- Standard lesson types
- Community support

**Commercial Add-ons**:
- Advanced lesson types
- Custom templates
- Analytics
- White labeling
- SLA support

**Best for**: Developers who want to contribute + businesses who want premium features

**Pros**: Best of both worlds
**Cons**: Complex to manage

---

**Our Recommendation**:
**Freemium** for first 6 months, then evaluate adding **Enterprise tier** for platforms/organizations.

Pricing sweet spot:
- Free: 10 lessons/month
- Pro: $29/month unlimited
- Enterprise: $299+/month with white label, SLA, custom features

---

### Decision 4: Internal vs External Focus

**Question**: Is this primarily for Andamio or for the market?

| Approach | Andamio Focus | Market Focus | Recommended Action |
|----------|---------------|--------------|-------------------|
| **Internal Only** | 100% | 0% | Keep private, no marketplace |
| **Internal First** | 80% | 20% | Open source, free tier, no active selling |
| **Dual Purpose** | 50% | 50% | ⭐ **Freemium + Pro tier, active marketing** |
| **External Product** | 20% | 80% | Full SaaS, sales team, VC funding |

**Our Recommendation**:
**Dual Purpose** - Use internally for Andamio courses, but make available to market to:
1. Validate the contribution-centered pedagogy with broader audience
2. Generate additional revenue
3. Build Andamio brand awareness
4. Attract potential Andamio platform customers

This positions Andamio as both a platform AND a thought leader in education technology.

---

## Recommended Path Forward

### Phase 1: Open Source Foundation (Months 1-3)

**Goal**: Validate product-market fit, build community

**Actions**:
- [x] Build MCP server (DONE)
- [ ] Polish documentation
- [ ] Create professional README with screenshots
- [ ] Publish to NPM (MIT license)
- [ ] Submit to Smithery
- [ ] Announce on Twitter/X, Product Hunt
- [ ] Create landing page (simple, can use GitHub Pages)
- [ ] Add telemetry (opt-in) to understand usage

**Investment**: Minimal ($0-500)
- Domain name if needed
- Basic hosting
- Design assets (Canva/Figma)

**Success Metrics**:
- 100+ NPM downloads/week
- 50+ GitHub stars
- 10+ pieces of feedback
- 3+ case studies/testimonials

**Timeline**: 2-3 months

---

### Phase 2: Monetization Testing (Months 4-6)

**Goal**: Prove willingness to pay

**Actions**:
- [ ] Implement usage tracking
- [ ] Build simple SaaS wrapper (optional)
- [ ] Launch Pro tier ($29/month)
- [ ] Set up Stripe billing
- [ ] Create customer portal
- [ ] Email marketing to free users
- [ ] Content marketing (blog, videos)

**Investment**: $5k-15k
- Part-time dev help (if needed)
- Marketing tools (ConvertKit, etc.)
- Professional website
- Video production

**Success Metrics**:
- 50+ paying customers
- $1,500+ MRR
- <5% monthly churn
- 4+ star rating

**Timeline**: 3 months

---

### Phase 3: Scale & Expand (Months 7-12)

**Goal**: Build sustainable business

**Actions**:
- [ ] Hire support person (part-time)
- [ ] Build platform integrations
- [ ] Launch enterprise tier
- [ ] Active sales outreach
- [ ] Conference presence
- [ ] Partnership development

**Investment**: $30k-60k
- Team (1-2 people)
- Sales & marketing
- Infrastructure
- Legal & accounting

**Success Metrics**:
- 200+ paying customers
- $10k+ MRR
- 5+ enterprise deals
- 80%+ customer satisfaction

**Timeline**: 6 months

---

## Decision Matrix: Your Specific Situation

### Context Questions

**1. What's the primary goal for this tool?**
- [ ] Solve Andamio's internal content creation bottleneck
- [ ] Generate revenue from education market
- [ ] Establish Andamio as edtech thought leader
- [ ] All of the above ⭐

**If "All of the above"**: Dual-purpose approach with freemium model

---

**2. How much time can you invest in this as a product?**
- [ ] <5 hours/week (side project)
- [ ] 10-20 hours/week (significant focus)
- [ ] Full-time (primary business)

**If <5 hours**: Keep it simple, MIT license, free tier only, minimal marketing
**If 10-20 hours**: ⭐ Freemium model, active community building, test monetization
**If full-time**: Full commercial product, SaaS, sales team

---

**3. What's more valuable: adoption or revenue?**
- [ ] Adoption (get it in as many hands as possible)
- [ ] Revenue (need to monetize quickly)
- [ ] Both, but adoption first ⭐

**If adoption first**: MIT license, generous free tier, focus on marketplaces
**If revenue first**: Source-available or AGPL, aggressive paid tiers
**If both**: ⭐ Freemium with low free tier, active conversion optimization

---

**4. Do you want community contributions?**
- [ ] Yes, actively seeking contributions
- [ ] Maybe, open to it
- [ ] No, want to maintain full control

**If yes**: MIT or AGPL, clear contributing guide, good docs
**If maybe**: ⭐ Start MIT, can change later
**If no**: Proprietary or source-available

---

**5. How important is Andamio brand building?**
- [ ] Critical - this should elevate Andamio brand
- [ ] Important - nice side benefit
- [ ] Not important - standalone product

**If critical**: ⭐ Use Andamio branding, tie to Andamio story, leverage for platform awareness
**If important**: Can be standalone but mention Andamio origin
**If not important**: Separate brand entirely

---

## Our Specific Recommendation for Andamio

Based on context from CLAUDE.md and the Andamio ecosystem:

### Recommended Approach: **Strategic Open Core**

**Why**:
1. Andamio is building an ecosystem, not just a product
2. Contribution-centered pedagogy is differentiated and valuable
3. Tool can drive awareness and adoption of Andamio Platform
4. Revenue is good but not the only goal

**Specific Plan**:

#### Month 1-2: Open Foundation
- MIT license
- Free tier: 25 lessons/month (generous)
- NPM + Smithery + GitHub
- Focus: Get it into hands of educators and course creators
- Branding: "By Andamio, for the education community"
- Positioning: Example of contribution-centered tools

#### Month 3-4: Platform Integration
- Integrate into Andamio Platform UI
- Make it easy for Andamio course creators
- Document case studies from Andamio courses
- Position as "the lesson coach that powers Andamio courses"

#### Month 5-6: Monetization Testing
- Launch Pro tier: $29/month
  - Unlimited lessons
  - Priority support
  - Custom templates
  - Early access to features
- Target: Non-Andamio users who want premium features
- Andamio platform users: Get Pro features free (incentive to use Andamio)

#### Month 7-12: Enterprise & Expansion
- Enterprise tier for course platforms
- White label option
- Custom integrations
- Partnership with other education platforms
- Position Andamio as education innovation leader

**Revenue Model**:
- Individual creators: Free tier (generous) or Pro ($29/month)
- Andamio platform users: Pro features included
- Course platforms: Enterprise ($299-999/month)
- Integrations: Revenue share with platforms

**Strategic Value Beyond Revenue**:
1. **Marketing**: Every generated lesson promotes contribution-centered approach
2. **Lead Gen**: Pro users are prospects for Andamio Platform
3. **Validation**: External adoption validates Andamio pedagogy
4. **Community**: Build broader education innovation community
5. **Talent**: Attract contributors and team members

---

## Quick Decision Tree

```
START: What's your primary goal?

├─ Build Andamio ecosystem → Strategic Open Core ⭐
│  └─ MIT + Generous free tier + Platform integration + Selective monetization
│
├─ Generate revenue quickly → Commercial SaaS
│  └─ Source-available + Paid tiers + Active sales
│
└─ Maximum adoption → Pure Open Source
   └─ MIT + Free + Community-driven + Support/services revenue
```

---

## Next Action Items

Based on recommended **Strategic Open Core** approach:

### This Week
- [ ] Decide: Keep as "andamio-lesson-coach" or rebrand?
- [ ] Polish README with professional screenshots
- [ ] Create simple landing page (can use GitHub Pages)
- [ ] Publish to NPM (MIT license)
- [ ] Announce on social media

### Next Week
- [ ] Submit to Smithery
- [ ] Write blog post: "Introducing Andamio Lesson Coach"
- [ ] Create demo video (2-3 min)
- [ ] Email Andamio community

### This Month
- [ ] Generate 10+ case studies from real usage
- [ ] Implement basic telemetry (opt-in)
- [ ] Plan Platform integration
- [ ] Document for Andamio courses

### Month 2-3
- [ ] Integrate into Andamio Platform
- [ ] Prepare for Pro tier launch
- [ ] Build payment infrastructure
- [ ] Create enterprise offering

---

**Last Updated**: 2025-11-14
**Status**: Decision Framework Complete
**Recommended**: Strategic Open Core approach
