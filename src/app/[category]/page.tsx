"use client";

import axios from "axios";
import React, { use, useEffect, useState } from "react";
import { Loader } from "lucide-react";
import HorizontalTextCard from "@/components/molecule/HorizontalTextCard/HorizontalTextCard";
import AdBlock from "@/components/molecule/AdBlock/AdBlock";

function Page(promiseProps: { params: Promise<{ category: string }> }) {
  const { category } = use(promiseProps.params);

  const [posts, setPosts] = useState<{ title: string; createdAt: string; views: number; _id: string; slug: string; featuredImage: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date"); // 'date' | 'views'

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `/api/blog-by-category?category=${category}`
        );
        setPosts(
          res.data.blogs.map((blog: { title: string; createdAt: string; views: number; _id: string; slug: string; featuredImage: string }) => ({
            title: blog.title,
            createdAt: blog.createdAt,
            views: blog.views,
            _id: blog._id,
            slug: blog.slug,
            featuredImage: blog.featuredImage,
          })) || []
        );
      } catch (err) {
        console.error("Error fetching blogs by category:", err);
        setError("Failed to load posts. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [category]);

  const filteredPosts = posts
    .filter((post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "date") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } else if (sortBy === "views") {
        return b.views - a.views;
      }
      return 0;
    });

  const renderPostList = () => (
    <div>
      {loading ? (
        <div className="flex justify-center py-10 text-gray-500 animate-pulse">
          <Loader className="animate-spin mr-2" />
          Loading posts...
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : filteredPosts.length === 0 ? (
        <p className="text-gray-600">No posts found for this category.</p>
      ) : (
        <div className="flex flex-col m-2 space-y-4">
          {filteredPosts.map((post) => (
            <HorizontalTextCard post={post} category={category} key={post._id} />
          ))}
        </div>
      )}
    </div>
  );

  const renderFilter = () => {
    return (
      <div className="">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 mb-4 border rounded-md"
        />

        {/* Sort */}
        <div className="mb-2">
          <label className="block font-medium mb-1">Sort By:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="date">Date (Newest)</option>
            <option value="views">Most Viewed</option>
          </select>
        </div>
      </div>
    );
  };

  return (
    <div className="px-4  flex gap-6 max-w-7xl mx-auto">
      {/* Left Sidebar */}
      <div className="w-1/4 p-2 rounded-xl shadow sticky top-4 h-screen">
        {renderFilter()}
      </div>
      {/* Main Content */}
      <div className="w-3/4">
        {renderPostList()}
        <AdBlock type="horizontal"/>
      </div>
      {/* Right Sidebar (optional) */}
      <div className="w-1/4 p-2 text-gray-500 italic">
      <AdBlock type="vertical"/></div>
    </div>
  );
}

export default Page;
