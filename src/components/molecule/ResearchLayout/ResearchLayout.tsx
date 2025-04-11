import React from 'react'
import VerticleTextCard from '../VerticleTextCard/VerticleTextCard'
import AdBlock from '../AdBlock/AdBlock'

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
            "_id": "67f415e2adde9a4b791731744",
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
        }
    ]
  return (
    <div>
        <div>
            <h1 className="text-3xl font-bold mb-8">Research Corner</h1>
            <div className='flex flex-col my-4  gap-8'>
                {
                    data.slice(0,3).map((item) => (
                        <VerticleTextCard item={item} key={item._id}/>
                    ))
                }
            </div>
            <AdBlock type='vertical'/>
        </div>
    </div>
  )
}

export default ResearchLayout