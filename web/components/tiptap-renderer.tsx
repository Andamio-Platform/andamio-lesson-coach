"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { all, createLowlight } from "lowlight";
import type { JSONContent } from "@tiptap/core";
import { useEffect, useState } from "react";

const lowlight = createLowlight(all);

interface TiptapRendererProps {
  content: JSONContent | null | undefined;
  className?: string;
}

/**
 * Read-only Tiptap renderer for displaying lesson content
 */
export function TiptapRenderer({ content, className }: TiptapRendererProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    console.log("TiptapRenderer mounted, content:", content);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false, // Disable default code block
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content: content ?? undefined,
    editable: false,
    editorProps: {
      attributes: {
        class: "tiptap-content",
      },
    },
    immediatelyRender: false,
  });

  // Update editor content when content prop changes
  useEffect(() => {
    if (editor && content && isMounted) {
      console.log("TiptapRenderer: Setting content", content);
      queueMicrotask(() => {
        try {
          editor.commands.setContent(content);
        } catch (error) {
          console.error("TiptapRenderer: Error setting content", error);
        }
      });
    }
  }, [editor, content, isMounted]);

  // Don't render during SSR
  if (!isMounted) {
    return (
      <div className={className}>
        <div className="h-32 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
      </div>
    );
  }

  if (!content) {
    console.log("TiptapRenderer: No content available");
    return (
      <div className={className}>
        <p className="text-slate-500 dark:text-slate-400 italic">No content available</p>
      </div>
    );
  }

  if (!editor) {
    console.log("TiptapRenderer: Editor not ready");
    return (
      <div className={className}>
        <p className="text-slate-500 dark:text-slate-400">Loading content...</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <EditorContent editor={editor} />
    </div>
  );
}
