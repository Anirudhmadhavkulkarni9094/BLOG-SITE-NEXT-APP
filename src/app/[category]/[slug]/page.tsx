"use client";

import axios from "axios";
import Image from "next/image";
import React, { use, useEffect, useState } from "react";
import { notFound } from "next/navigation";
import CoreImage from "@/components/Atom/CoreImage/CoreImage";
import CoreParagraph from "@/components/Atom/CoreParagraph/CoreParagraph";
import CoreAuthor from "@/components/Atom/CoreAuthor/CoreAuthor";
import CoreTags from "@/components/Atom/CoreTags/CoreTags";
import CoreTitle from "@/components/Atom/CoreTitle/CoreTitle";
import Head from "next/head";
import AdBlock from "@/components/molecule/AdBlock/AdBlock";
import PostContentList from "@/components/molecule/PostContent/PostContentList";

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
  relatedArticles: Blog[];
}

export default function Page(promiseProps: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(promiseProps.params);

  const [data, setData] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/api/blog-by-title?slug=${slug}`);
        setData(res.data.blog);
      } catch (err) {
        console.error(err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading)
    return <p className="text-center py-10 text-gray-500">Loading...</p>;
  if (!data) return notFound();
console.log(data.readTime)
  return (
    <>
      <Head>
        <title>{data.title} | Tech Coffee</title>
        <meta name="description" content={data.metaDescription || data.title} />
        <meta name="keywords" content={data.tags.join(", ")} />
        <meta property="og:title" content={data.title} />
        <meta
          property="og:description"
          content={data.metaDescription || data.title}
        />
        <meta property="og:image" content={data.featuredImage} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div className="flex flex-col lg:flex-row max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-8">
  {/* Main Article */}
  <article className="w-full lg:max-w-4xl bg-white shadow-md rounded-2xl p-4 sm:p-6">
    {/* Title & Meta */}
    <header className="mb-6">
      <CoreTitle data={data} />
      <p className="text-sm text-gray-600 mb-2">
        Published on{" "}
        <time dateTime={data.createdAt}>
          {new Date(data.createdAt).toDateString()}
        </time>{" "}
        • {data.readTime}
      </p>
      <CoreAuthor data={data} />
    </header>

    {/* Featured Image */}
    <div className="relative w-full rounded-lg overflow-hidden shadow-sm mb-6 aspect-video">
      <Image
        src={data.featuredImage}
        alt={data.title}
        fill
        className="object-cover"
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
            <CoreImage
              block={{ featuredImage: block.content, title: data.title }}
              key={block._id}
            />
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

  {/* Related Articles + Ads */}
  <aside className="w-full lg:w-1/3 flex flex-col gap-6">
    {data.relatedArticles.length > 0 && (
      <div className="bg-white shadow-md rounded-2xl p-4 sm:p-6">
        <h2 className="text-xl font-semibold mb-4">Related Articles</h2>
        {data.relatedArticles.map((related) => (
          <div key={related._id} className="flex flex-col sm:flex-row gap-4 mb-4">
            <Image
              src={related.featuredImage}
              alt={related.title}
              width={100}
              height={100}
              className="rounded-lg object-cover w-full sm:w-24 h-24"
            />
            <div>
              <h3 className="text-md font-semibold">{related.title}</h3>
              <p className="text-sm text-gray-500">{related.metaDescription}</p>
            </div>
          </div>
        ))}
      </div>
    )}

    {/* Ads */}
    <div className="flex flex-col gap-4 justify-between items-center">
      <AdBlock type="vertical" />
      <PostContentList />
      <AdBlock type="vertical" />
    </div>
  </aside>
</div>
    </>
  );
}
