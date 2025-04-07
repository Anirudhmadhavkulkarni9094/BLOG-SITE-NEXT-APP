import mongoose, { Schema, Document } from "mongoose";

// Interface
interface IBlog extends Document {
  title: string;
  slug: string;
  metaDescription: string;
  category: string;
  tags: string[];
  content: { type: "CoreParagraph" | "CoreImage"; content: string }[];
  featuredImage: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
    profileLink: string;
  };
  readTime: string;
  status: "draft" | "published";
  relatedArticles: { title: string; link: string }[];
  createdAt: Date;
  updatedAt: Date;
}

// Schema
const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    metaDescription: { type: String },
    category: { type: String },
    tags: [{ type: String }],
    content: [
      {
        type: {
          type: String,
          enum: ["CoreParagraph", "CoreImage"],
          required: true,
        },
        content: { type: String },
      },
    ],
    featuredImage: { type: String },
    author: {
      name: { type: String },
      avatar: { type: String },
      bio: { type: String },
      profileLink: { type: String },
    },
    readTime: { type: String },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    relatedArticles: [
      {
        title: { type: String },
        link: { type: String },
      },
    ],
  },
  { timestamps: true }
);

// Model
export default mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);
