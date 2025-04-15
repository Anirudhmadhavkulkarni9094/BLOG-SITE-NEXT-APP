import React from "react";

export const ImageUpload = ({ imageURL, setImageURL, editor }: any) => {
  const handleImageUpload = async (event:any) => {
    const file = event.target.files[0];
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
