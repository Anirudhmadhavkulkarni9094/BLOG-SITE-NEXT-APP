import { NextResponse } from "next/server";
import BlogCollection from "../../../models/Blog";
import { connectDB } from "@/lib/db";
import Blog from "../../../models/Blog";

export async function GET() {
  await connectDB();

  try {
    const categories = [
      "ai",
      "tech",
      "webdev",
      "mobile",
      "cloud",
      "cybersecurity",
      "datascience",
      "programming",
      "reviews",
      "web3",
      "career"
    ];

    const blogFetchPromises = categories.map((cat) =>
      BlogCollection.find({ category: cat }).select(
        "title slug readTime category tags featuredImage"
      )
    );

    const results = await Promise.all(blogFetchPromises);

    const categorizedBlogs: Record<string, any[]> = {};
    categories.forEach((cat, index) => {
      categorizedBlogs[cat] = results[index];
    });

    const availableCategoryPost = await BlogCollection.find().distinct("category");
    
    return NextResponse.json(
      { success: true, data: categorizedBlogs , categories : availableCategoryPost },
      { status: 200 }
    );
  } catch (error) {
    console.error("Blog retrieval error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
