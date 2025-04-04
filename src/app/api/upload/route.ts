import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Upload to Vercel Blob Storage
    const blob = await put(`blog-images/${Date.now()}-${file.name}`, file, {
      access: "public", // Make it publicly accessible
    });

    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
