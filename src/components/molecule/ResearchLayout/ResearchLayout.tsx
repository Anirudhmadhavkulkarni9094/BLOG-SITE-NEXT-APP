import Link from 'next/link'
import React from 'react'

function ResearchLayout() {
   const data =  [
        {
            "author": {
                "name": "Anirudh Kulkarni",
                "avatar": null,
                "bio": "A passionate developer and tech enthusiast.",
                "profileLink": "https://anirudh-kulkarni.vercel.app/"
            },
            "_id": "67f415f4adde9a4b79173179",
            "title": "From REST to GraphQL: Migrating Your API Layer in Next.js",
            "slug": "from-rest-to-graphql-migrating-your-api-layer-in-nextjs",
            "metaDescription": "From REST to GraphQL: Migrating Your API Layer in Next.js",
            "category": "Technology",
            "tags": [
                "GraphQL",
                "Next.js",
                "Apollo",
                "Backend"
            ],
            "content": [
                {
                    "type": "CoreParagraph",
                    "content": "REST APIs have their limits. GraphQL solves over-fetching and under-fetching elegantly.",
                    "_id": "67f415f4adde9a4b7917317a"
                },
                {
                    "type": "CoreImage",
                    "content": "https://cdn.example.com/images/graphql-vs-rest.png",
                    "_id": "67f415f4adde9a4b7917317b"
                },
                {
                    "type": "CoreParagraph",
                    "content": "Let’s walk through setting up Apollo Server inside a Next.js API route.",
                    "_id": "67f415f4adde9a4b7917317c"
                }
            ],
            "featuredImage": "https://cdn.example.com/images/graphql-next-cover.png",
            "readTime": "1 min read",
            "status": "draft",
            "relatedArticles": [],
            "createdAt": "2025-04-07T18:14:12.646Z",
            "updatedAt": "2025-04-07T18:14:12.646Z",
            "__v": 0
        },
        {
            "author": {
                "name": "Anirudh Kulkarni",
                "avatar": null,
                "bio": "A passionate developer and tech enthusiast.",
                "profileLink": "https://anirudh-kulkarni.vercel.app/"
            },
            "_id": "67f415e2adde9a4b79173174",
            "title": "Optimizing Image Delivery with Vercel & Next.js Image Component",
            "slug": "optimizing-image-delivery-with-vercel-and-nextjs-image-component",
            "metaDescription": "Optimizing Image Delivery with Vercel & Next.js Image Component",
            "category": "Technology",
            "tags": [
                "Next.js",
                "Vercel",
                "Performance",
                "Image Optimization"
            ],
            "content": [
                {
                    "type": "CoreParagraph",
                    "content": "Poorly optimized images can slow down your site drastically. Here’s how Next.js fixes that.",
                    "_id": "67f415e2adde9a4b79173175"
                },
                {
                    "type": "CoreImage",
                    "content": "https://cdn.example.com/images/lighthouse-score.png",
                    "_id": "67f415e2adde9a4b79173176"
                },
                {
                    "type": "CoreParagraph",
                    "content": "Learn how to use the Next.js `<Image />` component effectively with remote sources.",
                    "_id": "67f415e2adde9a4b79173177"
                }
            ],
            "featuredImage": "https://cdn.example.com/images/image-opt-cover.png",
            "readTime": "1 min read",
            "status": "draft",
            "relatedArticles": [],
            "createdAt": "2025-04-07T18:13:54.806Z",
            "updatedAt": "2025-04-07T18:13:54.806Z",
            "__v": 0
        },
        {
            "author": {
                "name": "Anirudh Kulkarni",
                "avatar": null,
                "bio": "A passionate developer and tech enthusiast.",
                "profileLink": "https://anirudh-kulkarni.vercel.app/"
            },
            "_id": "67f415daadde9a4b7917316f",
            "title": "Building a Scalable CMS with Next.js and MongoDB Atlas",
            "slug": "building-a-scalable-cms-with-nextjs-and-mongodb-atlas",
            "metaDescription": "Building a Scalable CMS with Next.js and MongoDB Atlas",
            "category": "Technology",
            "tags": [
                "Next.js",
                "MongoDB",
                "CMS",
                "Serverless"
            ],
            "content": [
                {
                    "type": "CoreParagraph",
                    "content": "Scaling a CMS comes with challenges, but combining MongoDB Atlas and Vercel can make it effortless.",
                    "_id": "67f415daadde9a4b79173170"
                },
                {
                    "type": "CoreImage",
                    "content": "https://cdn.example.com/images/architecture-diagram.png",
                    "_id": "67f415daadde9a4b79173171"
                },
                {
                    "type": "CoreParagraph",
                    "content": "Let’s dive into setting up a scalable CMS backend with API routes and auto-scaling.",
                    "_id": "67f415daadde9a4b79173172"
                }
            ],
            "featuredImage": "https://cdn.example.com/images/scalable-cms.png",
            "readTime": "1 min read",
            "status": "draft",
            "relatedArticles": [],
            "createdAt": "2025-04-07T18:13:46.468Z",
            "updatedAt": "2025-04-07T18:13:46.468Z",
            "__v": 0
        },
        {
            "tags": [],
            "status": "draft",
            "_id": "67f414cc470ee4d482bd6f2c",
            "title": "Technology - technology",
            "category": "Technology",
            "content": [
                {
                    "type": "CoreParagraph",
                    "content": "Technology - technology",
                    "_id": "67f414cc470ee4d482bd6f2d"
                },
                {
                    "type": "CoreImage",
                    "_id": "67f414cc470ee4d482bd6f2e"
                }
            ],
            "relatedArticles": [],
            "createdAt": "2025-04-07T18:09:16.947Z",
            "updatedAt": "2025-04-07T18:09:16.947Z",
            "__v": 0
        }
    ]
  return (
    <div>
        <div>
            <h1 className="text-3xl font-bold mb-8">Research Corner</h1>
            <div className='flex flex-col  gap-8'>
                {
                    data.slice(0,3).map((item) => (
                        <Link href={`/Research/${item.slug}` || "/"} key={item._id} className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-300">
                            {item.featuredImage && (
                                <div className="relative aspect-[16/9]">
                                    <img src={item.featuredImage} alt={item.title} className="object-cover w-full h-full" />
                                </div>
                            )}
                            <div className="p-3 space-y-1">
                                <h3 className="text-xl font-semibold">{item.title}</h3>
                                <div className="text-sm text-gray-500">
                                    Published on {new Date(item.createdAt).toDateString()} by{' '}
                                    <p className="text-blue-600 hover:underline">
                                        {item.author?.name}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default ResearchLayout