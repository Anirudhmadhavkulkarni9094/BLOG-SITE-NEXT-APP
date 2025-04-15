import React from "react";
import { Editor } from "@tiptap/core"; // Import the Editor type

interface ImageUploadProps {
  imageURL: string;
  setImageURL: (url: string) => void;
  editor: Editor; // Replace 'any' with the specific type of your editor if available
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ imageURL, setImageURL, editor }) => {
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {  // Your upload endpoint
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setImageURL(data.url); // Set image URL after successful upload
console.log(data.url)
      // Insert the image into the editor at the current cursor position
      editor.chain().focus().setImage({ src: data.url }).run();
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="image-upload">
        Upload
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {imageURL && <img src={imageURL} alt="Uploaded" className="mt-2 w-48 rounded-md" />}
    </div>
  );
};
