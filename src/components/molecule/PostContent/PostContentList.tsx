import Image from "next/image";
import React from "react";
import postContent from "./image.png";

function PostContentList() {
  const data = [
    {
      author: { name: "Anirudh Kulkarni" },
      _id: "67f415f4adde9a4b79173179",
      title: "From REST to GraphQL: Migrating Your API Layer in Next.js",
      slug: "from-rest-to-graphql-migrating-your-api-layer-in-nextjs",
      metaDescription:
        "From REST to GraphQL: Migrating Your API Layer in Next.js",
      category: "Technology",
    },
    {
      author: { name: "Anirudh Kulkarni" },
      _id: "67f415e2adde9a4b79173174",
      title:
        "Optimizing Image Delivery with Vercel & Next.js Image Component",
      slug: "optimizing-image-delivery-with-vercel-and-nextjs-image-component",
      metaDescription:
        "Optimizing Image Delivery with Vercel & Next.js Image Component",
      category: "Technology",
    },
    {
      author: { name: "Anirudh Kulkarni" },
      _id: "67f415e2adde9a4b79173176",
      title:
        "Boosting Performance in React Apps with Dynamic Imports and Suspense",
      slug: "boosting-performance-react-dynamic-imports-suspense",
      metaDescription:
        "Boosting Performance in React Apps with Dynamic Imports and Suspense",
      category: "Technology",
    },
    {
      author: { name: "Anirudh Kulkarni" },
      _id: "67f415e2adde9a4b79173175",
      title:
        "How to Build an Accessible Design System in Tailwind and Storybook",
      slug: "accessible-design-system-tailwind-storybook",
      metaDescription:
        "How to Build an Accessible Design System in Tailwind and Storybook",
      category: "Technology",
    },
    {
      author: { name: "Anirudh Kulkarni" },
      _id: "67f415e2adde9a4b791731752",
      title:
        "How to Build an Accessible Design System in Tailwind and Storybook",
      slug: "accessible-design-system-tailwind-storybook",
      metaDescription:
        "How to Build an Accessible Design System in Tailwind and Storybook",
      category: "Technology",
    },
  ];

  return (
    <div className="w-80 max-w-3xl mx-auto mt-10 px-4">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-amber-800">
        You Might Also Enjoy…
      </h2>
      <div className="">
        {data.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-center my-2 gap-4 p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <Image
              src={postContent}
              alt={item.title}
              width={64}
              height={64}
              className="rounded-lg object-cover"
            />
            <div className="flex flex-col">
              <h3 className="text-base font-semibold text-gray-800 line-clamp-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {item.category} · by {item.author.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostContentList;
