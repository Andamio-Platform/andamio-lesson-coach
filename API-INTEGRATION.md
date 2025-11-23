# Andamio Lesson Coach API Integration

This document explains how to use the Andamio Lesson Coach MCP server to fetch, edit, and update lessons from the Andamio Database API.

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and configure:

```bash
# API URL (local development or production)
ANDAMIO_API_URL=http://localhost:4000/api/v0

# JWT Token for authentication
ANDAMIO_JWT_TOKEN=your-jwt-token-here

# Optional: Set to 'true' to enable debug logging
DEBUG=false
```

### 3. Generate a JWT Token

You need a valid JWT token to authenticate with the Andamio Database API.

**For local development:**

```bash
cd /Users/james/projects/01-projects/andamio-platform/andamio-platform-monorepo/andamio-db-api
npx tsx scripts/generate-test-jwt.ts <userId> <walletAddress>
```

This will output a JWT token. Copy it to your `.env` file.

**Note:** The user ID must exist in your database and have Creator role to edit lessons.

### 4. Build the MCP Server

```bash
npm run build
```

## Available MCP Tools

### 1. `fetch-lesson`

Fetch a lesson from the Andamio DB API and convert it to markdown for editing.

**Parameters:**
- `courseNftPolicyId` (string): The course NFT policy ID
- `moduleCode` (string): The module code
- `moduleIndex` (number): The SLT index (0-based)

**Example:**
```
fetch-lesson({
  courseNftPolicyId: "your-policy-id",
  moduleCode: "MOD-101",
  moduleIndex: 0
})
```

**Returns:**
- Lesson title, description, SLT text
- Image and video URLs (if present)
- Lesson status (Live or Draft)
- Full lesson content in markdown format

### 2. `fetch-module-lessons`

Fetch all lessons for a module from the Andamio DB API.

**Parameters:**
- `courseNftPolicyId` (string): The course NFT policy ID
- `moduleCode` (string): The module code

**Example:**
```
fetch-module-lessons({
  courseNftPolicyId: "your-policy-id",
  moduleCode: "MOD-101"
})
```

**Returns:**
- List of all lessons in the module
- Each lesson shows: title, SLT index, SLT text, description, status

### 3. `update-lesson`

Update a lesson in the Andamio DB API. Provide markdown content which will be converted to Tiptap JSON.

**Parameters:**
- `courseNftPolicyId` (string): The course NFT policy ID
- `moduleCode` (string): The module code
- `moduleIndex` (number): The SLT index (0-based)
- `title` (string, optional): Updated lesson title
- `description` (string, optional): Updated lesson description
- `markdownContent` (string, optional): Updated lesson content in markdown format
- `imageUrl` (string, optional): Updated image URL
- `videoUrl` (string, optional): Updated video URL
- `live` (boolean, optional): Whether the lesson is live (published) or draft

**Example:**
```
update-lesson({
  courseNftPolicyId: "your-policy-id",
  moduleCode: "MOD-101",
  moduleIndex: 0,
  title: "Updated Lesson Title",
  markdownContent: "# Updated Content\n\nThis is the new content.",
  live: true
})
```

**Returns:**
- Confirmation of successful update
- Updated lesson metadata

## Workflow: Fetch → Edit → Update

Here's a typical workflow for editing a lesson:

### Step 1: Fetch the Lesson

```
Use: fetch-lesson
Input: courseNftPolicyId, moduleCode, moduleIndex
Output: Lesson content in markdown
```

### Step 2: Edit with AI Assistance

- Copy the markdown content
- Use Claude to help edit and improve the lesson
- Apply lesson generation best practices
- Ensure content aligns with SLT

### Step 3: Update the Lesson

```
Use: update-lesson
Input: courseNftPolicyId, moduleCode, moduleIndex, markdownContent (edited)
Output: Confirmation of update
```

## Content Format Conversion

The lesson coach automatically handles conversion between:

**Tiptap JSON** (stored in database)
↔
**Markdown** (used for editing)

### Supported Markdown Features

- **Headings**: `# H1`, `## H2`, etc.
- **Paragraphs**: Regular text
- **Bold**: `**bold text**`
- **Italic**: `*italic text*`
- **Code**: `` `inline code` ``
- **Code Blocks**:
  ```
  ```language
  code here
  ```
  ```
- **Lists**:
  - Unordered: `- item`
  - Ordered: `1. item`
- **Blockquotes**: `> quote`
- **Links**: `[text](url)`
- **Images**: `![alt](url)`
- **Horizontal Rule**: `---`

## Troubleshooting

### Error: "ANDAMIO_JWT_TOKEN environment variable is required"

**Solution:** Make sure you've created a `.env` file and added your JWT token:

```bash
ANDAMIO_JWT_TOKEN=your-token-here
```

### Error: "Failed to fetch lesson (404)"

**Possible causes:**
1. Wrong `courseNftPolicyId`, `moduleCode`, or `moduleIndex`
2. Lesson doesn't exist yet for this SLT

**Solution:**
- Verify the course and module codes
- Check that the SLT index exists
- Use `fetch-module-lessons` to see all available lessons

### Error: "Failed to update lesson (403)"

**Possible causes:**
1. JWT token expired
2. User doesn't have Creator role
3. User doesn't have permission to edit this course

**Solution:**
- Generate a new JWT token
- Verify the user has Creator role in the database
- Check course ownership/permissions

### Error: "Failed to update lesson (500)"

**Possible causes:**
1. Invalid markdown content that can't be converted to Tiptap JSON
2. Database connection issues
3. Server error

**Solution:**
- Check that markdown is well-formed
- Verify API server is running
- Check server logs for details

## Development Tips

### Enable Debug Mode

Set `DEBUG=true` in your `.env` file to see detailed API request/response logs.

### Working with Local API

If running the Andamio DB API locally:

```bash
ANDAMIO_API_URL=http://localhost:4000/api/v0
```

### Working with Production API

Point to the production API gateway:

```bash
ANDAMIO_API_URL=https://api.andamio.io/api/v0
```

**Note:** Production requires real user authentication via the gateway.

## Architecture

```
┌─────────────────────────────────────┐
│  Andamio Lesson Coach (MCP Server)  │
│  - fetch-lesson tool                │
│  - update-lesson tool               │
│  - Content converters               │
└──────────────┬──────────────────────┘
               │
               │ HTTP + JWT Auth
               ↓
┌─────────────────────────────────────┐
│     Andamio Database API            │
│  GET  /lessons/{id}                 │
│  PATCH /lessons/{id}                │
└──────────────┬──────────────────────┘
               │
               ↓
┌─────────────────────────────────────┐
│        PostgreSQL Database          │
│  - Lessons (contentJson: Tiptap)    │
│  - SLTs                             │
│  - Modules                          │
└─────────────────────────────────────┘
```

## Security Notes

- **Never commit `.env` file** - it contains your JWT token
- JWT tokens expire after 24 hours (by default)
- Only users with Creator role can edit lessons
- Course ownership is enforced by the API
- All API requests require authentication

## Future Enhancements

Potential improvements to this integration:

1. **Batch operations**: Update multiple lessons at once
2. **Lesson templates**: Apply templates to existing lessons
3. **Version history**: Track lesson changes over time
4. **Image upload**: Upload images directly from markdown
5. **SLT synchronization**: Auto-update lesson title when SLT changes
6. **Validation**: Pre-validate lesson content before update
7. **Draft mode**: Work on drafts without affecting live lessons

## Resources

- [Andamio DB API Documentation](../andamio-platform/andamio-platform-monorepo/andamio-db-api/README.md)
- [Tiptap Editor Documentation](https://tiptap.dev/)
- [MCP Protocol Specification](https://modelcontextprotocol.io/)
