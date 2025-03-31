import mongoose from "mongoose";

const BlogContentBlockSchema = new mongoose.Schema({
  __typename: { type: String, required: true }, // Block type (CoreParagraph, CoreImage, etc.)
  rawContent: { type: String, required: true }, // Raw text or media URL
  htmlContent: { type: String, required: true }, // Rendered HTML content
  altDescription: { type: String } // Alt text for images
});

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    tagList: [{ type: String }], // List of tags
    publishedAt: { type: Date, default: Date.now }, // Timestamp of publication
    contentBlocks: [BlogContentBlockSchema], // Array of content blocks
    isPublished: { type: Boolean, default: false } // Status of post
  },
  { timestamps: true } // Automatically adds `createdAt` & `updatedAt`
);

const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);

export default Blog;
