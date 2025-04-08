import CoreHeader from '@/components/Atom/CoreHeader/CoreHeader';
import Image from 'next/image';
import React from 'react';

interface Article {
  _id: string;
  featuredImage?: string;
  title: string;
  metaDescription: string;
  readTime: string;
  author?: {
    name: string;
  };
}

function TechnologyLayout({ data }: { data: any[] }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
        <CoreHeader title='Technology Corner'/>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left - Featured Article */}
        <div className="lg:w-2/3 space-y-4 border-1 p-4 rounded-lg">
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl shadow-md">
            <Image
              src={data[0]?.featuredImage || "/fallback-image.png"}
              alt={data[0]?.title || "Article image"}
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-2">
          {data.slice(1, 5).map((item: Article) => (
            <div key={item._id} className="space-y-1">
            <p className="text-gray-700">{item?.metaDescription}</p>
            <div className="text-sm text-gray-500">
              <span>{item?.readTime} </span>
              <span>• by {item?.author?.name}</span>
            </div>
            </div>
            ))}
            </div>
        </div>

        {/* Right - Grid of 4 Articles */}
        <div className="lg:w-1/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {data.slice(1, 5).map((item) => (
            <div
              key={item._id}
              className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-300"
            >
              {item.featuredImage && (
                <div className="relative aspect-[16/9]">
                  <Image
                    src={item.featuredImage}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-3 space-y-1">
                <h3 className="text-md font-semibold text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{item.metaDescription}</p>
                <div className="text-xs text-gray-500">
                  {item.readTime} • {item.author?.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TechnologyLayout;
