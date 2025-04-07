'use client';

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';

interface BlogPreview {
  _id: string;
  title: string;
  slug: string;
  category: string;
  featuredImage: string;
  metaDescription: string;
  createdAt: string;
  readTime: number;
}

function formatReadTime(minutes: number): string {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const hrText = hrs > 0 ? `${hrs} hr${hrs > 1 ? 's' : ''}` : '';
  const minText = mins > 0 ? `${mins} min` : '';
  return [hrText, minText].filter(Boolean).join(' ');
}

export default function Home() {
  const [blogs, setBlogs] = useState<BlogPreview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/blog')
      .then((res) => setBlogs(res.data.blogs))
      .catch((err) => console.error("Error loading blogs", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Head>
        <title>Tech Coffee | Developer Blogs, Tech Articles & News</title>
        <meta name="description" content="Explore tech articles, development tips, and latest updates. Categorized blog content for every developer mind." />
        <meta name="keywords" content="Tech blogs, JavaScript, Web Development, Programming, Fullstack, Frontend, Backend" />
      </Head>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Welcome to Tech Coffee ☕</h1>
        <p className="text-center text-gray-600 mb-10 text-lg max-w-2xl mx-auto">
          Discover curated articles across all categories – from frontend and backend to design, tools, and dev lifestyle.
        </p>

        {loading ? (
          <p className="text-center text-gray-500">Loading articles...</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map(blog => (
              <Link href={`/blog/${blog.slug}`} key={blog._id} className="block border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition">
                <Image src={blog.featuredImage} alt={blog.title} width={400} height={200} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-1 text-gray-800">{blog.title}</h2>
                  <p className="text-sm text-gray-600 mb-2">{blog.category} • {formatReadTime(blog.readTime)}</p>
                  <p className="text-gray-700 text-sm line-clamp-3">{blog.metaDescription}</p>
                  <p className="text-xs text-gray-500 mt-2">{new Date(blog.createdAt).toDateString()}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
