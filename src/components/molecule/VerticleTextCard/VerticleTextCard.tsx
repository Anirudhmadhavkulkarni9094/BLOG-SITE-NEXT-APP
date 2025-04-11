import Link from "next/link";
import React from "react";

function VerticleTextCard({
  item,
}: {
  item: {
    title: string;
    createdAt: string;
    _id: string;
    slug: string;
    featuredImage: string;
    author?: { name?: string };
  };
}) {
  return (
    <Link
      href={`/Research/${item.slug}` || "/"}
      key={item._id}
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-300"
    >
      {item.featuredImage && (
        <div className="relative aspect-[16/9]">
          <img
            src={item.featuredImage}
            alt={item.title}
            className="object-cover w-full h-full "
          />
        </div>
      )}
      <div className="p-3 space-y-1 flex flex-col justify-between gap-10">
        <h3 className="text-xl font-semibold line-clamp-3">{item.title}</h3>
        <div className="text-sm text-gray-500">
          Published on {new Date(item.createdAt).toDateString()} by{" "}
          <p className="text-blue-600 hover:underline">{item.author?.name}</p>
        </div>
      </div>
    </Link>
  );
}

export default VerticleTextCard;
