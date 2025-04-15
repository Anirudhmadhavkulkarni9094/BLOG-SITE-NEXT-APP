import React from "react";
import { Editor } from "@tiptap/core"; // Import the Editor type

interface LinkToolbarProps {
  linkURL: string;
  setLinkURL: (url: string) => void;
  editor: Editor; // Ensure you import the correct Editor type from the library
}

export const LinkToolbar = ({ linkURL, setLinkURL, editor }: LinkToolbarProps) => {
  const setLink = () => {
    if (!linkURL) return;
    const selection = editor?.state.selection;
    const isTextSelected = selection && selection.from !== selection.to;
    if (isTextSelected) {
      editor?.chain().focus().setLink({ href: linkURL, target: "_blank" }).run();
    } else {
      editor?.chain().focus().insertContent(`<a href="${linkURL}" target="_blank">${linkURL}</a>`).run();
    }
    setLinkURL("");
  };

  return (
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
  );
};
