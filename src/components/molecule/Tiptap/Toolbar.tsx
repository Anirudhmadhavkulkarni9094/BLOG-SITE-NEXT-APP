import React from "react";
import { Level } from "@tiptap/extension-heading";
import { Editor } from "@tiptap/core"; // Import the Editor type

interface ToolbarProps {
  editor: Editor; // Replace 'any' with the specific type of the editor if known
  activeHeading: number | null;
  setActiveHeading: (level: number) => void;
}

export const Toolbar = ({ editor, activeHeading }: ToolbarProps) => {
  const buttonClass = (level: number) =>
    activeHeading === level ? "active" : "";

  const setHeading = (level: Level) => {
    editor?.chain().focus().toggleHeading({ level }).run();
  };

  return (
    <div className="flex flex-wrap justify-between gap-2">
      {([1, 2, 3, 4, 5, 6] as Level[]).map((level) => (
        <button
          key={level}
          className={`${buttonClass(level)} bg-white text-blue-800 border-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 py-2 rounded-md text-sm font-semibold`}
          onClick={() => setHeading(level)}
          title={`Heading ${level}`}
        >
          H{level}
        </button>
      ))}
    </div>
  );
};
