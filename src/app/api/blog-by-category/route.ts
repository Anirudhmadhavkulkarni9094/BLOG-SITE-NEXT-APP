import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    if (!category) {
      return NextResponse.json({ error: "Category is required" }, { status: 400 });
    }

    const blogs = await Blog.find({ category })
      .select("title featuredImage createdAt") // Only these fields
      .sort({ createdAt: -1 });

    const simplifiedBlogs = blogs.map((blog) => ({
      id: blog._id.toString(), // Convert ObjectId to string
      title: blog.title,
      featuredImage: blog.featuredImage,
      createdAt: blog.createdAt,
    }));

    return NextResponse.json({ blogs: simplifiedBlogs }, { status: 200 });
  } catch (error) {
    console.error("Error fetching blogs by category:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
