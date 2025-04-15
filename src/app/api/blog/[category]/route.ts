import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import BlogCollection from "@/models/Blog";

export async function GET(request: Request) {
  try {
    // Ensure DB connection
    await connectDB();

    // Extract the category from the URL params (since we're in the new App Directory, use request.url)
    const url = new URL(request.url);
    const category = url.pathname.split('/').pop();  // Extract category from the URL

    console.log("Requested category:", category);  // Check category

    // Fetch blogs by the given category
    const blogs = await BlogCollection.find({ category });

    if (blogs.length === 0) {
      return NextResponse.json({ success: true, error: "No blogs found for this category" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: blogs }, { status: 200 });
  } catch (error) {
    console.error("Blog retrieval error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
