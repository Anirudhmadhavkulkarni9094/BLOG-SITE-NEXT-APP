'use client';

import axios from 'axios';
import Image from 'next/image';
import React, { use, useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import CoreImage from '@/components/Atom/CoreImage/CoreImage';
import CoreParagraph from '@/components/Atom/CoreParagraph/CoreParagraph';
import CoreAuthor from '@/components/Atom/CoreAuthor/CoreAuthor';
import CoreTags from '@/components/Atom/CoreTags/CoreTags';
import CoreTitle from '@/components/Atom/CoreTitle/CoreTitle';

interface Blog {
  _id: string;
  title: string;
  slug: string;
  metaDescription: string;
  category: string;
  tags: string[];
  content: { type: string; content: string; _id: string }[];
  featuredImage: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
    profileLink: string;
  };
  readTime: number;
  createdAt: string;
}

export default function Page(promiseProps: { params: Promise<{  slug : string }> }) {
  const {  slug } = use(promiseProps.params);

  const [data, setData] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/api/blog-by-title?slug=${slug}`);
        setData(res.data.blog);
      } catch (err) {
        console.error("Error fetching blog:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!data) return notFound();

  return (
    <article className="max-w-4xl mx-auto p-6">
      {/* Title & Meta */}
      <header>
        <CoreTitle data={data}></CoreTitle>
        <p className="text-sm text-gray-600 mb-1">
          Published on {new Date(data.createdAt).toDateString()} • {data.readTime} min read
        </p>
        <CoreAuthor data={data}/>
      </header>

      {/* Featured Image */}
      <div className="">
        <Image
          src={data.featuredImage}
          alt={data.title}
          width={600}
          height={300}
          className=''
        />
      </div>

      {/* Content */}
      <section className="prose max-w-none prose-lg prose-slate">
        {data.content.map((block) => {
          if (block.type === "CoreParagraph") {
            return <CoreParagraph block={block} key={block._id}/>
          }
          if (block.type === "CoreImage") {
            return (
              <CoreImage block={{ featuredImage: block.content, title: data.title }} key={block._id}/>
            );
          }
          return null;
        })}
      </section>
      <CoreTags block={data}></CoreTags>
    </article>
  );
}
