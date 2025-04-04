/* eslint-disable */
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";
import { put } from "@vercel/blob";

export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.json();

    // Validate content array
    if (!data.content || !Array.isArray(data.content)) {
      return NextResponse.json({ error: "Invalid content format" }, { status: 400 });
    }

    // Process images in content
    const contentWithImages = await Promise.all(
      data.content.map(async (item: { type: string; content: string }) => {
        // Ensure item has a valid 'type' and 'content'
        if (!item || typeof item !== "object" || !item.type || !item.content) {
          return item;
        }

        // Upload images if the item is of type 'CoreImage'
        if (item.type === "CoreImage" && typeof item.content === "string" && item.content.startsWith("data:image")) {
          try {
            const res = await fetch(item.content);
            const file = await res.blob();

            const fileName = `blog-images/${Date.now()}.jpg`;
            const blob = await put(fileName, file, { access: "public" });

            return { ...item, content: blob.url }; // Replace base64 with image URL
          } catch (err) {
            console.error("Image upload failed:", err);
            return { ...item, content: "IMAGE_UPLOAD_FAILED" };
          }
        }
        return item;
      })
    );

    // Ensure contentWithImages is not empty before saving
    if (!contentWithImages.length) {
      return NextResponse.json({ error: "Content cannot be empty" }, { status: 400 });
    }

    // Save the blog
    const newBlog = new Blog({ ...data, content: contentWithImages });
    await newBlog.save();

    return NextResponse.json({ message: "Blog created!", blog: newBlog }, { status: 201 });
  } catch (error) {
    console.error("Error saving blog:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
