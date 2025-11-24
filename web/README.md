# Andamio Lesson Laboratory - Web UI

A gorgeous, professional web interface for the Andamio Lesson Coach. This is NOT a chat interface - it's a laboratory where great professional work happens.

## Features

### Module Workshop
- **Smart SLT Creation**: Create Student Learning Targets with real-time validation
- **Inline Recommendations**: Get instant feedback and lesson type suggestions as you type
- **SLT Management**: View, edit, and organize all SLTs for a module
- **Guided Workflows**: Always know what to do next with contextual suggestions

### Lesson Forge
- **AI-Powered Generation**: Generate complete lessons from SLTs with pedagogical guidance
- **Side-by-Side Editing**: Edit markdown on the left, see live preview on the right
- **Integrated Feedback**: Provide feedback directly in the lesson view to refine content
- **Publish Controls**: Draft and publish workflow built into the interface

## Design Philosophy

This interface is designed to feel like a **professional laboratory**, not a typical AI chat:

- **Workflow-Driven**: Each screen suggests the next logical action
- **Clickable When Helpful**: Use buttons and selections for common workflows
- **Text Input When Appropriate**: Free-form input for creative content
- **Live Feedback**: See validation and suggestions in real-time
- **Side-by-Side Work**: Edit and preview simultaneously

## Getting Started

### Prerequisites
- Node.js 18+
- Running instance of andamio-db-api (on localhost:4000)
- Andamio Platform JWT token

### Installation

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Getting Your JWT Token

1. Log into the Andamio Platform
2. Navigate to Settings → API Access
3. Copy your JWT token
4. Paste it into the Laboratory authentication screen

## Technology Stack

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **shadcn/ui** for beautiful, accessible components
- **Sonner** for toast notifications
- **React Markdown** for lesson previews

## Project Structure

```
web/
├── app/
│   ├── api/[tool]/       # API routes connecting to MCP tools
│   ├── layout.tsx        # Root layout with Toaster
│   └── page.tsx          # Main entry point
├── components/
│   ├── lesson-laboratory.tsx  # Main lab container
│   ├── auth-panel.tsx         # JWT authentication
│   ├── module-workbench.tsx   # Module & SLT management
│   ├── lesson-workbench.tsx   # Lesson generation & editing
│   ├── slt-creator.tsx        # SLT creation with validation
│   ├── slt-list.tsx           # SLT display & management
│   ├── lesson-editor.tsx      # Side-by-side lesson editor
│   └── ui/                    # shadcn/ui components
└── lib/
    ├── api-client.ts          # Frontend API client
    ├── mcp-tools.ts           # MCP tools wrapper
    └── utils.ts               # Utilities
```

## Key User Flows

### 1. Creating SLTs
1. Enter module information (Course NFT Policy ID, Module Code)
2. Click "Create a New SLT"
3. Type your SLT (starting with "I can...")
4. Watch real-time validation and lesson type suggestions
5. Click "Create SLT"

### 2. Generating Lessons
1. Switch to "Lesson Forge" tab
2. Enter module info and SLT index
3. Select lesson type and add materials
4. Click "Generate Lesson"
5. Review the generated content
6. Edit and refine in the side-by-side editor
7. Save and publish when ready

### 3. Refining Lessons
1. Load an existing lesson
2. Edit markdown on the left
3. See live preview on the right
4. Add feedback in the feedback panel
5. Click "Refine Lesson" to improve with AI
6. Save changes and publish

## Environment Variables

```bash
# Required for API integration
ANDAMIO_API_URL=http://localhost:4000  # Your andamio-db-api instance
```

## Development

```bash
# Development mode with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Design System

The interface uses a laboratory-inspired design:

- **Colors**: Blue/indigo gradients for primary actions, slate for neutrals
- **Typography**: Geist Sans for UI, Geist Mono for code
- **Spacing**: Generous whitespace for professional feel
- **Components**: Custom shadcn/ui components with laboratory theming

## Roadmap

- [ ] Feedback refinement integration
- [ ] Batch operations for SLTs
- [ ] Lesson templates and snippets
- [ ] Collaborative editing features
- [ ] Analytics and usage insights
- [ ] Dark mode refinements

## License

Part of the Andamio Lesson Coach project. See parent directory for license information.

---

**Built with care for professional content creators**
