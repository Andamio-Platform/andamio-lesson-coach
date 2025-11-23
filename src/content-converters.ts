/**
 * Content Converters: Tiptap JSON ↔ Markdown
 *
 * Converts between Tiptap's ProseMirror JSON format and Markdown
 * for lesson content editing.
 *
 * Tiptap JSON structure:
 * {
 *   type: "doc",
 *   content: [
 *     { type: "heading", attrs: { level: 1 }, content: [{ type: "text", text: "..." }] },
 *     { type: "paragraph", content: [{ type: "text", text: "..." }] },
 *     ...
 *   ]
 * }
 */

// =============================================================================
// Types
// =============================================================================

interface TiptapNode {
  type: string;
  attrs?: Record<string, unknown>;
  content?: TiptapNode[];
  text?: string;
  marks?: Array<{ type: string; attrs?: Record<string, unknown> }>;
}

interface TiptapDocument {
  type: "doc";
  content: TiptapNode[];
}

// =============================================================================
// Tiptap JSON to Markdown
// =============================================================================

/**
 * Convert Tiptap JSON to Markdown
 */
export function tiptapToMarkdown(json: Record<string, unknown> | null): string {
  if (!json || typeof json !== "object") {
    return "";
  }

  const doc = json as unknown as TiptapDocument;

  if (doc.type !== "doc" || !Array.isArray(doc.content)) {
    return "";
  }

  return doc.content.map((node) => nodeToMarkdown(node)).join("\n\n");
}

/**
 * Convert a single Tiptap node to Markdown
 */
function nodeToMarkdown(node: TiptapNode, listLevel = 0): string {
  switch (node.type) {
    case "heading":
      const level = (node.attrs?.level as number) || 1;
      const headingText = getTextContent(node);
      return "#".repeat(level) + " " + headingText;

    case "paragraph":
      return getFormattedText(node);

    case "bulletList":
      return (node.content || [])
        .map((item) => nodeToMarkdown(item, listLevel))
        .join("\n");

    case "orderedList":
      return (node.content || [])
        .map((item, index) => {
          const content = getTextContent(item);
          return `${index + 1}. ${content}`;
        })
        .join("\n");

    case "listItem":
      const indent = "  ".repeat(listLevel);
      const itemContent = (node.content || [])
        .map((child) => {
          if (child.type === "paragraph") {
            return getFormattedText(child);
          } else if (child.type === "bulletList" || child.type === "orderedList") {
            return "\n" + nodeToMarkdown(child, listLevel + 1);
          }
          return nodeToMarkdown(child, listLevel);
        })
        .join("");
      return `${indent}- ${itemContent}`;

    case "codeBlock":
      const language = (node.attrs?.language as string) || "";
      const code = getTextContent(node);
      return "```" + language + "\n" + code + "\n```";

    case "blockquote":
      const quoteText = (node.content || [])
        .map((child) => nodeToMarkdown(child))
        .join("\n");
      return quoteText
        .split("\n")
        .map((line) => "> " + line)
        .join("\n");

    case "horizontalRule":
      return "---";

    case "hardBreak":
      return "  \n";

    case "image":
      const src = (node.attrs?.src as string) || "";
      const alt = (node.attrs?.alt as string) || "";
      const title = node.attrs?.title ? ` "${node.attrs.title}"` : "";
      return `![${alt}](${src}${title})`;

    default:
      // For unknown node types, try to get text content
      return getTextContent(node);
  }
}

/**
 * Get formatted text content with marks (bold, italic, code, etc.)
 */
function getFormattedText(node: TiptapNode): string {
  if (!node.content) {
    return "";
  }

  return node.content
    .map((child) => {
      if (child.type === "text" && child.text) {
        let text = child.text;

        if (child.marks) {
          // Apply marks in order
          for (const mark of child.marks) {
            switch (mark.type) {
              case "bold":
                text = `**${text}**`;
                break;
              case "italic":
                text = `*${text}*`;
                break;
              case "code":
                text = `\`${text}\``;
                break;
              case "strike":
                text = `~~${text}~~`;
                break;
              case "link":
                const href = (mark.attrs?.href as string) || "";
                text = `[${text}](${href})`;
                break;
            }
          }
        }

        return text;
      } else if (child.type === "hardBreak") {
        return "  \n";
      } else {
        return nodeToMarkdown(child);
      }
    })
    .join("");
}

/**
 * Get plain text content from a node (no formatting)
 */
function getTextContent(node: TiptapNode): string {
  if (node.text) {
    return node.text;
  }

  if (node.content) {
    return node.content.map((child) => getTextContent(child)).join("");
  }

  return "";
}

// =============================================================================
// Markdown to Tiptap JSON
// =============================================================================

/**
 * Convert Markdown to Tiptap JSON
 */
export function markdownToTiptap(markdown: string): TiptapDocument {
  const lines = markdown.split("\n");
  const content: TiptapNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Skip empty lines
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Headings
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const text = headingMatch[2];
      content.push({
        type: "heading",
        attrs: { level },
        content: parseInlineContent(text),
      });
      i++;
      continue;
    }

    // Horizontal rule
    if (line.match(/^(-{3,}|_{3,}|\*{3,})$/)) {
      content.push({ type: "horizontalRule" });
      i++;
      continue;
    }

    // Code blocks
    if (line.startsWith("```")) {
      const language = line.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      content.push({
        type: "codeBlock",
        attrs: language ? { language } : {},
        content: [{ type: "text", text: codeLines.join("\n") }],
      });
      i++; // Skip closing ```
      continue;
    }

    // Blockquotes
    if (line.startsWith("> ")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].startsWith("> ")) {
        quoteLines.push(lines[i].slice(2));
        i++;
      }
      content.push({
        type: "blockquote",
        content: [
          {
            type: "paragraph",
            content: parseInlineContent(quoteLines.join(" ")),
          },
        ],
      });
      continue;
    }

    // Unordered lists
    if (line.match(/^[\s]*[-*+]\s+/)) {
      const listItems: TiptapNode[] = [];
      while (i < lines.length && lines[i].match(/^[\s]*[-*+]\s+/)) {
        const itemText = lines[i].replace(/^[\s]*[-*+]\s+/, "");
        listItems.push({
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: parseInlineContent(itemText),
            },
          ],
        });
        i++;
      }
      content.push({
        type: "bulletList",
        content: listItems,
      });
      continue;
    }

    // Ordered lists
    if (line.match(/^[\s]*\d+\.\s+/)) {
      const listItems: TiptapNode[] = [];
      while (i < lines.length && lines[i].match(/^[\s]*\d+\.\s+/)) {
        const itemText = lines[i].replace(/^[\s]*\d+\.\s+/, "");
        listItems.push({
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: parseInlineContent(itemText),
            },
          ],
        });
        i++;
      }
      content.push({
        type: "orderedList",
        content: listItems,
      });
      continue;
    }

    // Regular paragraph
    const paragraphLines: string[] = [];
    while (i < lines.length && lines[i].trim() !== "" && !isSpecialLine(lines[i])) {
      paragraphLines.push(lines[i]);
      i++;
    }
    if (paragraphLines.length > 0) {
      content.push({
        type: "paragraph",
        content: parseInlineContent(paragraphLines.join(" ")),
      });
    }
  }

  return {
    type: "doc",
    content,
  };
}

/**
 * Check if a line starts a special block (heading, list, code, etc.)
 */
function isSpecialLine(line: string): boolean {
  return (
    line.match(/^#{1,6}\s+/) !== null ||
    line.match(/^[\s]*[-*+]\s+/) !== null ||
    line.match(/^[\s]*\d+\.\s+/) !== null ||
    line.startsWith("```") ||
    line.startsWith("> ") ||
    line.match(/^(-{3,}|_{3,}|\*{3,})$/) !== null
  );
}

/**
 * Parse inline content (bold, italic, links, code, etc.)
 */
function parseInlineContent(text: string): TiptapNode[] {
  const nodes: TiptapNode[] = [];
  let remaining = text;
  let pos = 0;

  while (pos < remaining.length) {
    // Try to match inline code first (highest priority)
    const codeMatch = remaining.slice(pos).match(/^`([^`]+)`/);
    if (codeMatch) {
      nodes.push({
        type: "text",
        text: codeMatch[1],
        marks: [{ type: "code" }],
      });
      pos += codeMatch[0].length;
      continue;
    }

    // Try to match bold
    const boldMatch = remaining.slice(pos).match(/^\*\*([^*]+)\*\*/);
    if (boldMatch) {
      nodes.push({
        type: "text",
        text: boldMatch[1],
        marks: [{ type: "bold" }],
      });
      pos += boldMatch[0].length;
      continue;
    }

    // Try to match italic
    const italicMatch = remaining.slice(pos).match(/^\*([^*]+)\*/);
    if (italicMatch) {
      nodes.push({
        type: "text",
        text: italicMatch[1],
        marks: [{ type: "italic" }],
      });
      pos += italicMatch[0].length;
      continue;
    }

    // Try to match strikethrough
    const strikeMatch = remaining.slice(pos).match(/^~~([^~]+)~~/);
    if (strikeMatch) {
      nodes.push({
        type: "text",
        text: strikeMatch[1],
        marks: [{ type: "strike" }],
      });
      pos += strikeMatch[0].length;
      continue;
    }

    // Try to match links
    const linkMatch = remaining.slice(pos).match(/^\[([^\]]+)\]\(([^)]+)\)/);
    if (linkMatch) {
      nodes.push({
        type: "text",
        text: linkMatch[1],
        marks: [{ type: "link", attrs: { href: linkMatch[2] } }],
      });
      pos += linkMatch[0].length;
      continue;
    }

    // No match - add regular character
    nodes.push({
      type: "text",
      text: remaining[pos],
    });
    pos++;
  }

  // Merge consecutive text nodes without marks
  const merged: TiptapNode[] = [];
  for (const node of nodes) {
    const last = merged[merged.length - 1];
    if (
      last &&
      last.type === "text" &&
      node.type === "text" &&
      !last.marks &&
      !node.marks
    ) {
      last.text = (last.text || "") + (node.text || "");
    } else {
      merged.push(node);
    }
  }

  return merged;
}
