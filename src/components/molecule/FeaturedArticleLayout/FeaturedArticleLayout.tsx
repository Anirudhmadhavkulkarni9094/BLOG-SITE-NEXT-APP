import CoreHeader from '@/components/Atom/CoreHeader/CoreHeader';
import Image from 'next/image'
import React from 'react'

interface Article {
  _id: string;
  featuredImage: string;
  title: string;
  createdAt: string;
  metaDescription: string;
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
              <h2 className="text-2xl font-semibold">{data[0]?.title || ""}</h2>
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
                <div
                  key={item._id}
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                >
                 <div className="relative aspect-[3/2] w-full">
  <Image
    src={item.featuredImage}
    alt={item.title}
    fill
    className="object-cover rounded-t-lg"
    sizes="(max-width: 768px) 100vw, 600px"
    priority
  />
</div>
                  <div className="p-4 space-y-2">
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-500">
                      Published on {new Date(item?.createdAt).toDateString()} by{' '}
                      <a
                        href={item?.author?.profileLink}
                        className="text-blue-600 hover:underline"
                        target="_blank"
                      >
                        {item?.author?.name}
                      </a>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }
    
    export default FeaturedArticleLayout