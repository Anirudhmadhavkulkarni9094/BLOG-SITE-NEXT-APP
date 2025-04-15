import { NextResponse } from "next/server";
import { put } from "@vercel/blob"; // or your own blob upload logic
import {connectDB} from "../../../lib/db"; // your Mongo connect
import readingTime from "reading-time";
import slugify from "slugify";
import fs from "fs/promises";
import BlogCollection from "../../../models/Blog"
export async function POST(req: Request) {
  try {
    await connectDB();
    
    const data = await req.json(); // ✅ use this, not `req.body`
    const {
      title,
      category,
      tags,
      content,
      featuredImage,
      relatedArticles = [],
      status = "draft",
      excerpt = ""
    } = data;

    if (!title || !category || !Array.isArray(content)) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const textContent = content
      .filter((block) => block.type === "paragraph")
      .map((block) => block.content)
      .join(" ");
    const readTime = readingTime(textContent).text;

    const slugBase = slugify(title, { lower: true, strict: true });
    let slug = slugBase;
    const existing = await BlogCollection.findOne({ slug });
    if (existing) slug += `-${Date.now()}`;

    const metaDescription = excerpt || title;

    const author = {
      name: "Anirudh Kulkarni",
      avatar: null,
      bio: "A passionate developer and tech enthusiast.",
      profileLink: "https://anirudh-kulkarni.vercel.app/",
    };

    // Image uploads — if you expect base64, otherwise skip this
    const processedContent = content; // Assume already uploaded/hosted

    let processedFeaturedImage = featuredImage;
    if (featuredImage?.url?.startsWith("data:image/")) {
      try {
        const res = await fetch(featuredImage.url);
        const file = await res.blob();
        const fileName = `featured-images/${Date.now()}.jpg`;
        const uploaded = await put(fileName, file, { access: "public" });
        processedFeaturedImage = { url: uploaded.url };
      } catch (err) {
        console.error("Featured image upload failed:", err);
        processedFeaturedImage = { url: "UPLOAD_FAILED" };
      }
    }

    const newBlog = new BlogCollection({
      title,
      slug,
      excerpt,
      metaDescription,
      category,
      tags,
      content: processedContent,
      featuredImage: processedFeaturedImage,
      author,
      readTime,
      relatedArticles,
      status,
    });

    await newBlog.save();

    // Update search index
    const searchIndexPath = "public/search-index.json";
    let searchIndex = [];
    try {
      const existing = await fs.readFile(searchIndexPath, "utf8");
      searchIndex = JSON.parse(existing);
    } catch (e) {
      console.log("Search index not found, creating new one.", e);
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
    await fs.writeFile(searchIndexPath, JSON.stringify(searchIndex, null, 2));

    return NextResponse.json({ success: true, data: summary }, { status: 201 });
  } catch (error) {
    console.error("Blog creation error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}



export async function GET() {
  try {
    const blogs = await BlogCollection.find();
    console.log(blogs);
    return NextResponse.json({ success: true, data: blogs }, { status: 200 });
  } catch (error) {
    console.error("Blog retrieval error:", error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
