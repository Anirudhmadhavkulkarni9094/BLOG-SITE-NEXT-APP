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
import Head from 'next/head';

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

function formatReadTime(minutes: number): string {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const hrText = hrs > 0 ? `${hrs} hr${hrs > 1 ? 's' : ''}` : '';
  const minText = mins > 0 ? `${mins} min` : '';
  return [hrText, minText].filter(Boolean).join(' ');
}
export default function Page(promiseProps: { params: Promise<{ slug: string }> }) {
  const { slug } = use(promiseProps.params);

  const [data, setData] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/api/blog-by-title?slug=${slug}`);
        setData(res.data.blog);
      } catch (err) {
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) return <p className="text-center py-10 text-gray-500">Loading...</p>;
  if (!data) return notFound();

  return (
    <>
      <Head>
        <title>{data.title} | Tech Coffee</title>
        <meta name="description" content={data.metaDescription || data.title} />
        <meta name="keywords" content={data.tags.join(', ')} />
        <meta property="og:title" content={data.title} />
        <meta property="og:description" content={data.metaDescription || data.title} />
        <meta property="og:image" content={data.featuredImage} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <article className="max-w-4xl mx-5 p-6 bg-white shadow-md rounded-2xl mt-6">
        {/* Title & Meta */}
        <header className="mb-6">
          <CoreTitle data={data} />
          <p className="text-sm text-gray-600 mb-2">
            Published on <time dateTime={data.createdAt}>{new Date(data.createdAt).toDateString()}</time> • {formatReadTime(data.readTime)} read
          </p>
          <CoreAuthor data={data} />
        </header>

        {/* Featured Image */}
        <div className="rounded-lg overflow-hidden shadow-sm mb-6">
          <Image
            src={data.featuredImage}
            alt={data.title}
            width={800}
            height={400}
            className="w-full h-auto object-cover"
            priority
          />
        </div>

        {/* Content */}
        <section className="prose max-w-none prose-lg prose-slate dark:prose-invert mb-8">
          {data.content.map((block) => {
            if (block.type === "CoreParagraph") {
              return <CoreParagraph block={block} key={block._id} />;
            }
            if (block.type === "CoreImage") {
              return (
                <CoreImage block={{ featuredImage: block.content, title: data.title }} key={block._id} />
              );
            }
            return null;
          })}
        </section>

        {/* Tags */}
        <footer className="mt-4">
          <CoreTags block={data} />
        </footer>
      </article>
    </>
  );
}
