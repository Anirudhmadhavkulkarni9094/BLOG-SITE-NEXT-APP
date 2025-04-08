"use client";

import React, { useEffect, useState } from "react";
import Head from "next/head";
import axios from "axios";
import FeaturedArticleLayout from "@/components/molecule/FeaturedArticleLayout/FeaturedArticleLayout";
import TechnologyLayout from "@/components/molecule/TechnologyLayout/TechnologyLayout";
import ResearchLayout from "@/components/molecule/ResearchLayout/ResearchLayout";

interface BlogPreview {
  _id: string;
  title: string;
  slug: string;
  category: string;
  author:{
    name: string;
    profileLink: string;
  }
  featuredImage: string;
  metaDescription: string;
  createdAt: string;
  readTime: number;
}


export default function Home() {
  const [blogs, setBlogs] = useState<BlogPreview[]>([]);
  const [loading, setLoading] = useState(true);
  const [techBlog, setTechBlog] = useState<BlogPreview[]>([]);

 

  useEffect(() => {
    axios
      .get("/api/blog")
      .then((res) => setBlogs(res.data.blogs.slice(0, 3)))
      .catch((err) => console.error("Error loading blogs", err))
      .finally(() => setLoading(false));

    axios
      .get("/api/blog-by-category?category=Technology")
      .then((res) => setTechBlog(res.data.blogs))
      .catch((err) => console.error("Error loading blogs", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Head>
        <title>Tech Coffee | Developer Blogs, AI Research & Tech News</title>
        <meta
          name="description"
          content="Discover the latest in tech, AI research, development tools, and programming guides. Curated content for developers and enthusiasts."
        />
        <meta
          name="keywords"
          content="Tech blogs, AI, Web Development, JavaScript, Machine Learning, Programming, Developer Tools, Fullstack"
        />
        <meta
          property="og:title"
          content="Tech Coffee | Developer Blogs, AI Research & Tech News"
        />
        <meta
          property="og:description"
          content="Explore tech articles, AI innovations, and development tips. Stay ahead in tech with Tech Coffee."
        />
        <meta property="og:image" content="/seo-banner.png" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.techcoffee.dev/" />
      </Head>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to <span className="text-indigo-600">Tech Coffee ☕</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Curated reads across development, AI, research, and everything tech.
            Get your daily dose of tech inspiration.
          </p>
        </section>

        {loading ? (
          <p className="text-center text-gray-500">Loading articles...</p>
        ) : (
          <section className="flex items-center justify-center">
            <div className="w-3/4">
            <FeaturedArticleLayout data={blogs} />
            </div>
            <div className="w-1/4 hidden lg:block">
            <ResearchLayout></ResearchLayout>
            </div>
          </section>
        )}
        {loading ? (
          <p className="text-center text-gray-500">Loading articles...</p>
        ) : (
          <section>
            <TechnologyLayout data={techBlog} />
          </section>
        )}
      </main>
    </>
  );
}
