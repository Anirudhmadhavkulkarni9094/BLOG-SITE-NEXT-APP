import CoreHeader from '@/components/Atom/CoreHeader/CoreHeader';
import Image from 'next/image';
import React from 'react';
import VerticleTextCard from '../VerticleTextCard/VerticleTextCard';

interface BlogPreview {
  _id: string;
  title: string;
  slug: string;
  category: string;
  author: {
    name: string;
  };
  featuredImage: string;
  metaDescription: string;
  createdAt: string;
  readTime: number;
}

interface TechnologyLayoutProps {
  data: BlogPreview[];
}

function TechnologyLayout({ data }: TechnologyLayoutProps) {
  if (!data || data.length === 0) return null;

  const articleCount = data.length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
      <CoreHeader title={data[0].category} />

      {articleCount === 1 && (
        <div className="w-full space-y-4 border p-4 rounded-lg">
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl shadow-md">
            <Image
              src={data[0].featuredImage || "/fallback-image.png"}
              alt={data[0].title || "Article image"}
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-2">
            <p className="text-xl font-semibold">{data[0].title}</p>
            <p className="text-gray-700">{data[0].metaDescription}</p>
            <div className="text-sm text-gray-500">
              <span>{data[0].readTime} min read</span>
              <span> • by {data[0].author?.name}</span>
            </div>
          </div>
        </div>
      )}

      {articleCount === 2 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.map((item) => (
              <VerticleTextCard key={item._id} item={item} />
          ))}
        </div>
      )}

      {articleCount > 2 && (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Featured Article */}
          <div className="lg:w-2/3 space-y-4 border p-4 rounded-lg">
          <VerticleTextCard key={data[0]._id} item={data[0]} />

          </div>

          {/* Side Cards */}
          <div className="lg:w-1/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            {data.slice(1, 5).map((item) => (
              <VerticleTextCard key={item._id} item={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default TechnologyLayout;
