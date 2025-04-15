"use client";

import React, { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { generateHTML } from '@tiptap/html'

// Lowlight Setup
import { createLowlight } from "lowlight";
import javascript from "highlight.js/lib/languages/javascript";
import html from "highlight.js/lib/languages/xml";

// Tiptap Pro Extensions
import Details from "@tiptap-pro/extension-details";
import DetailsContent from "@tiptap-pro/extension-details-content";
import DetailsSummary from "@tiptap-pro/extension-details-summary";
import DragHandle from "@tiptap-pro/extension-drag-handle";
import Emoji from "@tiptap-pro/extension-emoji";
import FileHandler from "@tiptap-pro/extension-file-handler";
import Mathematics from "@tiptap-pro/extension-mathematics";
import NodeRange from "@tiptap-pro/extension-node-range";
import TableOfContents from "@tiptap-pro/extension-table-of-contents";
import UniqueId from "@tiptap-pro/extension-unique-id";

// Tiptap Core Extensions
import BulletList from "@tiptap/extension-bullet-list";
import CharacterCount from "@tiptap/extension-character-count";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Color from "@tiptap/extension-color";
import Document from "@tiptap/extension-document";
import Dropcursor from "@tiptap/extension-dropcursor";
import Focus from "@tiptap/extension-focus";
import FontFamily from "@tiptap/extension-font-family";
import Heading, { Level } from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import OrderedList from "@tiptap/extension-ordered-list";
import Paragraph from "@tiptap/extension-paragraph";
import Placeholder from "@tiptap/extension-placeholder";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Typography from "@tiptap/extension-typography";
import Underline from "@tiptap/extension-underline";
import "./style.css";
// Create lowlight instance for CodeBlockLowlight
const lowlight = createLowlight();
lowlight.register("html", html);
lowlight.register("javascript", javascript);

const Tiptap = () => {
  const [activeHeading, setActiveHeading] = useState<number | null>(null);
  const [linkURL, setLinkURL] = useState<string>("");

  const extensions = [
    StarterKit.configure({
      bulletList: false,
      orderedList: false,
      codeBlock: false,
    }),
    BulletList,
    OrderedList,
    CodeBlockLowlight.configure({ lowlight }),
    Table.configure({ resizable: true }),
    TableHeader,
    TableRow,
    TableCell,
    CharacterCount,
    Color,
    Document,
    Dropcursor,
    Focus,
    FontFamily,
    Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
    Highlight,
    HorizontalRule,
    Image,
    Link.configure({ openOnClick: true }),
    Paragraph,
    Placeholder.configure({ placeholder: "Start typing your content..." }),
    Subscript,
    Superscript,
    TaskList,
    TaskItem,
    TextAlign.configure({ types: ["heading", "paragraph"] }),
    TextStyle,
    Typography,
    Underline,
  
    // TipTap Pro
    Details,
    DetailsContent,
    DetailsSummary,
    DragHandle,
    Emoji,
    FileHandler,
    Mathematics,
    NodeRange,
    TableOfContents,
    UniqueId,
  ];
  
  const editor = useEditor({
    extensions: extensions,
    content: `
      <h2>Welcome to Tiptap!</h2>
      <p>This editor is loaded with powerful extensions 🧩</p>
      <p>Experiment with headings and images:</p>
      <h1>Heading 1</h1>
      <h2>Heading 2</h2>
      <a href="https://tiptap.dev" target="_blank">Visit Tiptap</a>
    `,
  });

  // Functions for heading toggling
  const setHeading = (level: Level) => {
    editor?.chain().focus().toggleHeading({ level }).run();
  };

  // Function to insert a link into the editor
  const setLink = () => {
    if (!linkURL) return;
    const selection = editor?.state.selection;
    const isTextSelected = selection && selection.from !== selection.to;
    if (isTextSelected) {
      editor
        ?.chain()
        .focus()
        .setLink({ href: linkURL, target: "_blank" })
        .run();
    } else {
      editor
        ?.chain()
        .focus()
        .insertContent(`<a href="${linkURL}" target="_blank">${linkURL}</a>`)
        .run();
    }
    setLinkURL("");
  };



  // Function to handle local file upload and convert to Base64 for immediate insertion
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      editor?.chain().focus().setImage({ src: base64 }).run();
    };
    reader.readAsDataURL(file);
  };

  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [excerpt, setExcerpt] = useState<string>("");
  const [relatedArticles, setRelatedArticles] = useState<string[]>([]);
  // Track active heading level to show visual feedback in toolbar
  useEffect(() => {
    if (!editor) return;

    const updateActiveHeading = () => {
      const { $anchor } = editor.state.selection;
      const node = $anchor.parent;
      if (node.type.name === "heading") {
        setActiveHeading(node.attrs.level);
      } else {
        setActiveHeading(null);
      }
    };

    editor.on("transaction", updateActiveHeading);
    return () => {
      editor.off("transaction", updateActiveHeading);
    };
  }, [editor]);

  const buttonClass = (level: number) =>
    activeHeading === level ? "active" : "";

  const handleSave = async () => {
    if (!editor) return;
  
    const json = editor.getJSON();
  
    const blocks = json?.content?.map((node) => {
      const blockContent = node.content?.map((c) => c.text || "").join("") || "";
  
      return {
        type: node.type,
        content: blockContent,
        renderedContent: generateHTML({ type: "doc", content: [node] }, extensions),
      };
    });
  
    console.log(blocks);
  };

  return (
    <div className=" flex space-y-4 p-5">
      <div className="w-2/3">

  {/* Toolbar for headings */}
  
  {/* Editor Content */}
  <div className="prose max-w-none bg-white shadow-md p-4 rounded-lg">
    <EditorContent editor={editor} />

  </div>

  {/* Save Button */}
  <div className="mt-4 flex justify-center">
    <button
      onClick={handleSave}
      className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
    >
      Save
    </button>
  </div>
</div>
<div className="w-1/3">
<div className="flex flex-col space-x-2 items-start gap-5">
    
  <div className="flex justify-between gap-2">
    <button
      className={`${buttonClass(1)} bg-white text-blue-800 border-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 py-2 rounded-md text-sm font-semibold`}
      onClick={() => setHeading(1)}
      title="Heading 1"
      >
      H1
    </button>
    <button
      className={`${buttonClass(2)} bg-white text-blue-800 border-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 py-2 rounded-md text-sm font-semibold`}
      onClick={() => setHeading(2)}
      title="Heading 2"
      >
      H2
    </button>
    <button
      className={`${buttonClass(3)} bg-white text-blue-800 border-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 py-2 rounded-md text-sm font-semibold`}
      onClick={() => setHeading(3)}
      title="Heading 3"
      >
      H3
    </button>
    <button
      className={`${buttonClass(4)} bg-white text-blue-800 border-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 py-2 rounded-md text-sm font-semibold`}
      onClick={() => setHeading(4)}
      title="Heading 4"
      >
      H4
    </button>
    <button
      className={`${buttonClass(5)} bg-white text-blue-800 border-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 py-2 rounded-md text-sm font-semibold`}
      onClick={() => setHeading(5)}
      title="Heading 5"
      >
      H5
    </button>
    <button
      className={`${buttonClass(6)} bg-white text-blue-800 border-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 py-2 rounded-md text-sm font-semibold`}
      onClick={() => setHeading(6)}
      title="Heading 6"
      >
      H6
    </button>
  </div>

  {/* Link toolbar */}
  <div className="flex space-x-2 items-center">
    <input
      type="text"
      value={linkURL}
      onChange={(e) => setLinkURL(e.target.value)}
      placeholder="Enter link URL"
      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    <button
      onClick={setLink}
      className="bg-blue-500 text-white px-2 w-32 py-2 rounded-md text-sm font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
      Insert Link
    </button>
  </div>

  {/* Image Upload Toolbar */}
  <div className="flex flex-col space-y-2">
    <input
      type="file"
      accept="image/*"
      onChange={handleImageUpload}
      className="px-4 py-2 border border-gray-300 rounded-md cursor-pointer focus:ring-2 focus:ring-blue-500"
      />
  </div>
  <div>
  
  </div>

      </div>
<div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
        />
        <textarea
          placeholder="Excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
        />
        <input
          type="text"
          placeholder="Related Article URLs (comma-separated)"
          value={relatedArticles.join(", ")}
          onChange={(e) => setRelatedArticles(e.target.value.split(",").map((article) => article.trim()))}
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
        />
      </div>
</div>

      </div>

  );
};

export default Tiptap;
