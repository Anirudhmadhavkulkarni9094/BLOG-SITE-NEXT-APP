import mongoose, { Schema, Document } from "mongoose";

// Interfaces
interface IAuthor {
  name: string;
  avatar: string;
  bio: string;
  profileLink: string;
}

interface ICoreParagraph {
  __typename: "CoreParagraph";
  rendered: string; // e.g., HTML string like <p>Hello</p> or <img>
  content: string;
}

interface ICoreImage {
  imageLink: string;
  caption: string;
  altText: string;
  credit: string;
  refLink: string;
}

type IContentBlock = ICoreParagraph | ICoreImage;

interface IFeaturedImage {
  imageLink: string;
  caption: string;
  altText: string;
  credit: string;
  refLink: string;
}

interface IRelatedArticle {
  title: string;
  link: string;
}

interface IBlog extends Document {
  title: string;
  slug: string;
  excerpt: string;
  views?: number;
  clicks?: number;
  lastViewedAt?: Date;
  viewSources?: { source: string; count: number }[];
  metaDescription: string;
  category: string;
  tags: string[];
  content: IContentBlock[];
  featuredImage: IFeaturedImage;
  author: IAuthor;
  readTime: string;
  status: "draft" | "published" | "private";
  relatedArticles: IRelatedArticle[];
  createdAt: Date;
  updatedAt: Date;
}

// Schema
const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String },
    metaDescription: { type: String },
    category: { type: String },
    tags: [{ type: String }],
    content: [
      {
        // CoreParagraph-specific fields
        __typename: { type: String },
        renderedContent: { type: String },
        content: { type: String },

        // CoreImage-specific fields
        imageLink: { type: String },
        caption: { type: String },
        altText: { type: String },
        credit: { type: String },
        refLink: { type: String },
      },
    ],
    featuredImage: {
      url: { type: String },
    },
    author: {
      name: { type: String },
      avatar: { type: String },
      bio: { type: String },
      profileLink: { type: String },
    },
    views: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 },
    lastViewedAt: { type: Date },

    viewSources: [
      {
        source: { type: String }, // e.g., 'homepage', 'related', 'tag'
        count: { type: Number, default: 0 },
      },
    ],
    readTime: { type: String },
    status: {
      type: String,
      enum: ["draft", "published", "private"],
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
export default mongoose.models.BlogCollection ||
  mongoose.model("BlogCollection", BlogSchema);
