import CoreHeader from '@/components/Atom/CoreHeader/CoreHeader';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import VerticleTextCard from '../VerticleTextCard/VerticleTextCard';

interface Article {
  _id: string;
  featuredImage: string;
  title: string;
  createdAt: string;
  metaDescription: string;
  slug: string;
  author?: {
    name: string;
    profileLink: string;
  };
}



interface FeaturedArticleLayoutProps {
  data: Article[];
}

function FeaturedArticleLayout({ data }: FeaturedArticleLayoutProps) {

    
    return (
        <div className="px-6 md:px-12 lg:px-24 w-full space-y-12 w-3/4">
        <CoreHeader title='Featured Article'/>
    
          {/* Primary Featured Article */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
           {data[0]?.featuredImage && <Image
              src={data[0]?.featuredImage}
              width={1200}
              height={600}
              className="w-full object-cover"
              alt={data[0]?.title || 'Default Image'}
            />}
            <div className="p-6 space-y-4">
              <h2 className="text-2xl font-semibold line-clamp-2">{data[0]?.title || ""}</h2>
              <p className="text-sm text-gray-500">
                Published on {new Date(data[0]?.createdAt).toDateString()} by{' '}
                <a
                  href={data[0]?.author?.profileLink}
                  className="text-blue-600 hover:underline"
                  target="_blank"
                >
                  {data[0]?.author?.name}
                </a>
              </p>
              <p className="text-gray-700">{data[0]?.metaDescription}</p>
            </div>
          </div>
    
          {/* Secondary Articles */}
          <div>
          <CoreHeader title='More Article'/>
          <div className="grid gap-8 md:grid-cols-2">
              {data.slice(1, 3).map((item) => (
                <VerticleTextCard item={item} key={item._id}/>
              ))}
            </div>
          </div>
        </div>
      )
    }
    
    export default FeaturedArticleLayout