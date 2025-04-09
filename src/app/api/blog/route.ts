/* eslint-disable */
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";
import { put } from "@vercel/blob";
import slugify from "slugify";
import readingTime from 'reading-time';

export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.json();
    console.log("Received data:", data);

    type Block =
      | { type: 'CoreParagraph' | 'CoreTitle'; content: string }
      | { type: 'CoreImage'; content: string }
      | { type: string; content: string };

    function calculateReadingTimeFromBlocks(blocks: Block[]): string {
      const textContent = blocks
        .filter(block => block.type === 'CoreParagraph' || block.type === 'CoreTitle')
        .map(block => block.content)
        .join(' ');

      const stats = readingTime(textContent);
      return stats.text; // e.g., "2 min read"
    }

    const {
      title,
      category,
      tags,
      content,
      featuredImage,
      relatedArticles = [],
    } = data;

    const readTime = calculateReadingTimeFromBlocks(content);
    if (!title || !category || !content) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const author = {
      name: "Anirudh Kulkarni",
      avatar: null,
      bio: "A passionate developer and tech enthusiast.",
      profileLink: "https://anirudh-kulkarni.vercel.app/",
    };

    const metaDescription = title;

    if (!Array.isArray(content)) {
      return NextResponse.json(
        { success: false, error: "Content must be an array" },
        { status: 400 }
      );
    }

    const slug = slugify(title, { lower: true, strict: true });

    const processedContent = await Promise.all(
      content.map(async (item: any) => {
        if (
          item.type === "CoreImage" &&
          typeof item.content === "string" &&
          item.content.startsWith("data:image/")
        ) {
          try {
            const res = await fetch(item.content);
            const file = await res.blob();
            const fileName = `blog-images/${Date.now()}.jpg`;
            const uploaded = await put(fileName, file, { access: "public" });
            return { ...item, content: uploaded.url };
          } catch (err) {
            console.error("Image upload failed:", err);
            return { ...item, content: "IMAGE_UPLOAD_FAILED" };
          }
        }
        return item;
      })
    );

    const newBlog = new Blog({
      title,
      slug,
      category,
      metaDescription,
      tags,
      content: processedContent,
      featuredImage: typeof featuredImage === "string" ? featuredImage : null,
      author,
      readTime,
      relatedArticles,
    });

    await newBlog.save();

    // Add blog summary to search index
    const fs = require("fs");
    const searchIndexPath = "public/search-index.json";
    let searchIndex = [];
    try {
      const existing = fs.readFileSync(searchIndexPath, "utf8");
      searchIndex = JSON.parse(existing);
    } catch (e) {
      console.log("Search index not found, creating new one.");
    }

    const summary = {
      title: newBlog.title,
      slug: newBlog.slug,
      metaDescription: newBlog.metaDescription,
      category: newBlog.category,
      tags: newBlog.tags,
      readTime: newBlog.readTime,
      featuredImage: newBlog.featuredImage,
      author: newBlog.author,
    };

    searchIndex.push(summary);
    fs.writeFileSync(searchIndexPath, JSON.stringify(searchIndex, null, 2));

    return NextResponse.json(
      {
        success: true,
        data: summary,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Blog creation error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}


export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find().sort({ createdAt: -1 });
    console.log(blogs)

    return NextResponse.json({ blogs }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

