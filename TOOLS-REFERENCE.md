# Andamio Lesson Coach - Tools Reference

Complete reference for all MCP tools available in the Andamio Lesson Coach.

## Lesson Generation Tools

### `validate-slt`
Validates if a Student Learning Target follows the "I can..." format and best practices.

**Parameters:**
- `slt` (string): The Student Learning Target to validate

**Returns:**
- Validation result (✅ Valid or ❌ Invalid)
- Message explaining the result
- Suggestions for improvement (if invalid)

**Example:**
```
validate-slt({
  slt: "I can create a new Module in Andamio"
})
```

---

### `suggest-lesson-type`
Recommends the most appropriate lesson type based on the SLT content.

**Parameters:**
- `slt` (string): The Student Learning Target to analyze

**Returns:**
- Recommended lesson type
- Rationale for the recommendation
- Alternative options (if applicable)

**Example:**
```
suggest-lesson-type({
  slt: "I can integrate the Andamio API into my application"
})
```

---

### `generate-lesson`
Generates a complete lesson based on an SLT and lesson type.

**Parameters:**
- `slt` (string, required): The Student Learning Target (must start with 'I can...')
- `lessonType` (enum, required): One of: `product-demo`, `developer-docs`, `how-to-guide`, `org-onboarding`
- `materials` (string, optional): Supporting materials (screenshots, code, docs links, or context)
- `moduleName` (string, optional): Module name for context
- `courseName` (string, optional): Course name for context

**Returns:**
- Complete lesson in markdown format
- Ready to be saved to `/courses/[course-name]/modules/[module-name]/lessons/`

**Example:**
```
generate-lesson({
  slt: "I can create a new Module in the Andamio Platform",
  lessonType: "product-demo",
  materials: "Screenshots of the Module creation interface",
  moduleName: "Platform Basics",
  courseName: "Andamio Course Creator Fundamentals"
})
```

---

## Lesson API Integration Tools

### `fetch-lesson`
Fetches a lesson from the Andamio DB API and converts it to markdown for editing.

**Parameters:**
- `courseNftPolicyId` (string): The course NFT policy ID
- `moduleCode` (string): The module code
- `moduleIndex` (number): The SLT index (0-based)

**Returns:**
- Lesson title, description, SLT text
- Image and video URLs (if present)
- Lesson status (Live or Draft)
- Full lesson content in markdown format

**Example:**
```
fetch-lesson({
  courseNftPolicyId: "your-policy-id",
  moduleCode: "MOD-101",
  moduleIndex: 0
})
```

---

### `fetch-module-lessons`
Fetches all lessons for a module from the Andamio DB API.

**Parameters:**
- `courseNftPolicyId` (string): The course NFT policy ID
- `moduleCode` (string): The module code

**Returns:**
- List of all lessons in the module
- Each lesson shows: title, SLT index, SLT text, description, status

**Example:**
```
fetch-module-lessons({
  courseNftPolicyId: "your-policy-id",
  moduleCode: "MOD-101"
})
```

---

### `create-lesson`
Creates a new lesson for an existing SLT. Auto-generates title from SLT text if not provided.

**Parameters:**
- `courseNftPolicyId` (string): The course NFT policy ID
- `moduleCode` (string): The module code
- `moduleIndex` (number): The SLT index (0-based)
- `title` (string, optional): Lesson title (defaults to SLT text)
- `description` (string, optional): Lesson description
- `markdownContent` (string, optional): Lesson content in markdown format
- `imageUrl` (string, optional): Image URL
- `videoUrl` (string, optional): Video URL

**Returns:**
- Confirmation of successful creation
- Created lesson metadata

**Example:**
```
create-lesson({
  courseNftPolicyId: "your-policy-id",
  moduleCode: "MOD-101",
  moduleIndex: 0,
  title: "Creating Your First Module",
  markdownContent: "# Creating Your First Module\n\nThis lesson teaches you..."
})
```

---

### `update-lesson`
Updates a lesson in the Andamio DB API. Provide markdown content which will be converted to Tiptap JSON.

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

**Returns:**
- Confirmation of successful update
- Updated lesson metadata

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

---

### `delete-lesson`
Deletes a lesson from the Andamio DB API.

**Parameters:**
- `courseNftPolicyId` (string): The course NFT policy ID
- `moduleCode` (string): The module code
- `moduleIndex` (number): The SLT index (0-based)

**Returns:**
- Confirmation of successful deletion

**Example:**
```
delete-lesson({
  courseNftPolicyId: "your-policy-id",
  moduleCode: "MOD-101",
  moduleIndex: 0
})
```

---

## SLT Management Tools

### `fetch-module-slts`
Fetches all SLTs for a module from the Andamio DB API.

**Parameters:**
- `courseNftPolicyId` (string): The course NFT policy ID
- `moduleCode` (string): The module code

**Returns:**
- List of all SLTs in the module
- Each SLT shows: id, moduleIndex, sltText

**Example:**
```
fetch-module-slts({
  courseNftPolicyId: "your-policy-id",
  moduleCode: "MOD-101"
})
```

---

### `create-slt`
Creates a new SLT in a module (max 25 SLTs per module, indexed 0-24).

**Parameters:**
- `courseNftPolicyId` (string): The course NFT policy ID
- `moduleCode` (string): The module code
- `moduleIndex` (number): The SLT index (0-24)
- `sltText` (string): The SLT text (should start with 'I can...')

**Returns:**
- Created SLT with id, moduleIndex, and sltText
- Suggestion to create a lesson for this SLT

**Example:**
```
create-slt({
  courseNftPolicyId: "your-policy-id",
  moduleCode: "MOD-101",
  moduleIndex: 0,
  sltText: "I can create a new Module in the Andamio Platform"
})
```

**Common Errors:**
- SLT with this index already exists
- Module has reached max of 25 SLTs
- You don't have permission to edit this course

---

### `update-slt`
Updates an SLT's text or reorders it by changing its moduleIndex.

**Parameters:**
- `courseNftPolicyId` (string): The course NFT policy ID
- `moduleCode` (string): The module code
- `moduleIndex` (number): The current SLT index
- `sltText` (string, optional): Updated SLT text
- `newModuleIndex` (number, optional): New module index (for reordering)

**Returns:**
- Updated SLT with id, moduleIndex, and sltText

**Example:**
```
# Update SLT text
update-slt({
  courseNftPolicyId: "your-policy-id",
  moduleCode: "MOD-101",
  moduleIndex: 0,
  sltText: "I can create and configure a new Module"
})

# Reorder SLT
update-slt({
  courseNftPolicyId: "your-policy-id",
  moduleCode: "MOD-101",
  moduleIndex: 0,
  newModuleIndex: 2
})
```

**Common Errors:**
- New moduleIndex already exists
- SLT not found
- You don't have permission to edit this course

---

### `batch-reorder-slts`
Batch updates multiple SLT indexes at once (for reordering).

**Parameters:**
- `updates` (array): Array of objects with `id` and `moduleIndex`
  - `id` (string): The SLT ID
  - `moduleIndex` (number): The new module index (0-24)

**Returns:**
- Confirmation of successful reordering
- Count of updated SLTs

**Example:**
```
batch-reorder-slts({
  updates: [
    { id: "slt-id-1", moduleIndex: 2 },
    { id: "slt-id-2", moduleIndex: 0 },
    { id: "slt-id-3", moduleIndex: 1 }
  ]
})
```

**Common Errors:**
- Duplicate moduleIndexes in updates
- SLTs don't all belong to the same module
- You don't have permission to edit this course

---

### `delete-slt`
Deletes an SLT and its lesson (if exists). Fails if the SLT is used in an assignment.

**Parameters:**
- `courseNftPolicyId` (string): The course NFT policy ID
- `moduleCode` (string): The module code
- `moduleIndex` (number): The SLT index to delete (0-24)

**Returns:**
- Confirmation of successful deletion

**Example:**
```
delete-slt({
  courseNftPolicyId: "your-policy-id",
  moduleCode: "MOD-101",
  moduleIndex: 5
})
```

**Common Errors:**
- SLT is used in an assignment (cannot delete)
- SLT not found
- You don't have permission to edit this course

---

## Workflow Examples

### Creating a New Module with SLTs and Lessons

**Step 1: Create SLTs**
```
create-slt({
  courseNftPolicyId: "policy-id",
  moduleCode: "MOD-101",
  moduleIndex: 0,
  sltText: "I can create a new Module in Andamio"
})

create-slt({
  courseNftPolicyId: "policy-id",
  moduleCode: "MOD-101",
  moduleIndex: 1,
  sltText: "I can add SLTs to a Module"
})
```

**Step 2: Generate Lesson Content**
```
generate-lesson({
  slt: "I can create a new Module in Andamio",
  lessonType: "product-demo",
  materials: "Screenshots of Module creation flow"
})
```

**Step 3: Create Lessons in Database**
```
create-lesson({
  courseNftPolicyId: "policy-id",
  moduleCode: "MOD-101",
  moduleIndex: 0,
  markdownContent: "[Generated lesson content from step 2]"
})
```

### Editing an Existing Lesson

**Step 1: Fetch the Lesson**
```
fetch-lesson({
  courseNftPolicyId: "policy-id",
  moduleCode: "MOD-101",
  moduleIndex: 0
})
```

**Step 2: Edit with AI Assistance**
- Copy the markdown content
- Work with Claude to improve the lesson
- Apply lesson generation best practices

**Step 3: Update the Lesson**
```
update-lesson({
  courseNftPolicyId: "policy-id",
  moduleCode: "MOD-101",
  moduleIndex: 0,
  markdownContent: "[Edited content]",
  live: true
})
```

### Reordering SLTs

**Step 1: Fetch Current SLTs**
```
fetch-module-slts({
  courseNftPolicyId: "policy-id",
  moduleCode: "MOD-101"
})
```

**Step 2: Batch Reorder**
```
batch-reorder-slts({
  updates: [
    { id: "slt-id-1", moduleIndex: 1 },
    { id: "slt-id-2", moduleIndex: 0 }
  ]
})
```

---

## Environment Configuration

All API tools require proper configuration in your `.env` file:

```bash
# API URL (local development or production)
ANDAMIO_API_URL=http://localhost:4000/api/v0

# JWT Token for authentication
ANDAMIO_JWT_TOKEN=your-jwt-token-here

# Optional: Set to 'true' to enable debug logging
DEBUG=false
```

Generate a JWT token for local development:
```bash
cd /path/to/andamio-db-api
npx tsx scripts/generate-test-jwt.ts <userId> <walletAddress>
```

---

## Error Handling

All tools provide helpful error messages with:
- Clear explanation of what went wrong
- Common issues and solutions
- Hints for troubleshooting

**Common Error Types:**
- **404 Not Found**: Resource doesn't exist (wrong IDs, course, module, or SLT index)
- **403 Forbidden**: Permission denied (JWT expired or insufficient permissions)
- **409 Conflict**: Resource already exists (duplicate SLT index or lesson)
- **500 Server Error**: Server-side issue (check API logs)

---

## Content Format

### Supported Markdown Features

All lesson content supports these markdown features:

- **Headings**: `# H1`, `## H2`, `### H3`, etc.
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

### Conversion

Content is automatically converted between:
- **Markdown** (for editing) ↔ **Tiptap JSON** (stored in database)

The conversion preserves all formatting and structure.

---

## Next Steps

1. **Set up your environment**: Create `.env` file with API credentials
2. **Test with a course**: Use your course NFT policy ID
3. **Create SLTs**: Build out your module structure
4. **Generate lessons**: Use the lesson generation tools
5. **Create in database**: Save lessons to the Andamio Platform
6. **Iterate and refine**: Edit and improve based on testing

For more details, see:
- [API-INTEGRATION.md](./API-INTEGRATION.md) - API integration guide
- [README.md](./README.md) - Full project overview
- [SETUP-SUMMARY.md](./SETUP-SUMMARY.md) - Setup instructions
