import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

interface HorizontalTextCardProps {
  post: {
    slug: string;
    _id: string;
    featuredImage: string;
    title: string;
    createdAt: string;
    author?: {
      name?: string;
    };
  };
  category: string;
}

function HorizontalTextCard({ post, category }: HorizontalTextCardProps) {
  return (
    <Link
              href={`/${category}/${post.slug}`}
              key={post._id}
              className="flex m-2 bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-36 h-36 relative shrink-0">
                <Image
                  src={post.featuredImage}
                  fill
                  alt={post.title}
                  className="object-cover"
                />
              </div>
              <div className="p-4 flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-semibold mb-1 text-gray-800 hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-500">{new Date(post.createdAt).toDateString()}</p>
                </div>
                <div className="text-sm text-gray-600 mt-2">
                  By <span className="font-medium">{post.author?.name || "Unknown"}</span>
                </div>
              </div>
            </Link>
  )
}

export default HorizontalTextCard
