import mongoose, { Schema, Document } from "mongoose";

// Define interface for TypeScript
interface IBlog extends Document {
  title: string;
  category: string;
  content: { type: string; content: string }[];
  featuredImage: string;
  relatedArticles: { title: string; link: string }[];
  createdAt: Date;
  updatedAt: Date;
}

// Define schema
const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String },
    category: { type: String },
    content: [
      {
        type: { type: String, enum: ["CoreParagraph", "CoreImage"], required: true },
        content: { type: String },
      },
    ],
    featuredImage: { type: String },
    relatedArticles: [
      {
        title: { type: String },
        link: { type: String },
      },
    ],
  },
  { timestamps: true }
);

// Export model
export default mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);
