import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import BlogCollection from "@/models/Blog";

export async function GET(request: Request) {
  try {
    // Ensure DB connection
    await connectDB();

    // Extract the category and slug from the URL
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/').filter(Boolean); // Split the URL path into parts
    const category = pathParts[pathParts.length - 2]; // Second to last part is the category
    const slug = pathParts[pathParts.length - 1]; // Last part is the slug

    console.log("Requested category:", category);  // Check category
    console.log("Requested slug:", slug);  // Check slug

    // Fetch blogs by the given category and slug
    const blog = await BlogCollection.findOne({ category, slug });

    if (!blog) {
      return NextResponse.json({ success: false, error: "No blog found for this category and slug" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: blog }, { status: 200 });
  } catch (error) {
    console.error("Blog retrieval error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
