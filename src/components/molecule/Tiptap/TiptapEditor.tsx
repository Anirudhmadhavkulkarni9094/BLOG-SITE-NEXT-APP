"use client";
import React, { useState } from "react";
import { useEditor, EditorContent, JSONContent } from "@tiptap/react";
import { useRouter } from "next/navigation";
import { generateHTML } from "@tiptap/html";
import { createLowlight } from "lowlight";
import javascript from "highlight.js/lib/languages/javascript";
import html from "highlight.js/lib/languages/xml";
import { Extensions } from "./extensions";
import { Toolbar } from "./Toolbar";
import { LinkToolbar } from "./LinkToolbar";
import { ImageUpload } from "./ImageUpload";
import Sidebar from "./Sidebar"; // ⬅️ import Sidebar
import "./style.css";
import axios from "axios";

const lowlight = createLowlight();
lowlight.register("html", html);
lowlight.register("javascript", javascript);

const TiptapEditor = () => {
  const [activeHeading, setActiveHeading] = useState<number | null>(null);
  const [linkURL, setLinkURL] = useState<string>("");
  const [imageURL, setImageURL] = useState<string>("");
  const router = useRouter();
  const editor = useEditor({
    extensions: Extensions(lowlight),
    content: `
      <h2>Welcome to Tiptap!</h2>
      <p>This editor is loaded with powerful extensions 🧩</p>
      <p>Experiment with headings and images:</p>
      <h1>Heading 1</h1>
      <h2>Heading 2</h2>
      <a href="https://tiptap.dev" target="_blank">Visit Tiptap</a>
    `,
  });

  const [data, setData ] = useState<{
    title: string;
    excerpt: string;
    category: string;
    tags: string[];
    relatedArticles: { title: string; link: string }[];
    featuredImage?: { url: string } | null;
  }>({
    title: "",
    excerpt: "",
    category: "",
    tags: [],
    relatedArticles: [],
    featuredImage: null,
  });

  const handleSave = async () => {
    if (!editor) return;

    const json = editor.getJSON();
    const blocks = json?.content
      ?.map((node: JSONContent) => {
        const blockContent = node.content?.map((c: JSONContent) => c.text || "").join("") || "";
        return {
          type: node.type || "unknown",
          content: blockContent,
          renderedContent: generateHTML({ type: "doc", content: [node] }, Extensions(lowlight)),
        };
      })
      .filter((block) => {
        const alwaysIncludeTypes = ["image", "horizontalRule", "math", "codeBlock"];
        const shouldFilterText = ["paragraph", "heading"];
        return (

          block.content.trim() !== "" ||
          alwaysIncludeTypes.includes(block.type) ||
          !shouldFilterText.includes(block.type)
        );
      });

      axios.post("/api/blog", {
        ...data,
        content: blocks,
      }).then(res=>{console.log(res.data);
        router.push("/content-manager/posts");
      }).catch(er=>console.log(er.message));
    console.log({
        content :blocks,
        ...data
    });
  };

  return (
    <div className="flex space-y-4 p-5 gap-5">
      {/* Editor Section */}
      <div className="w-2/3">
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

      {/* Sidebar Section */}
      <div className="w-1/3 flex flex-col space-y-4 gap-5">
        {editor && <Toolbar editor={editor} activeHeading={activeHeading} setActiveHeading={setActiveHeading} />}
        {editor && <LinkToolbar linkURL={linkURL} setLinkURL={setLinkURL} editor={editor} />}
        {editor && <ImageUpload imageURL={imageURL} setImageURL={setImageURL} editor={editor} />}
        <Sidebar setData= {setData} data={data} />
      </div>
    </div>
  );
};

export default TiptapEditor;
