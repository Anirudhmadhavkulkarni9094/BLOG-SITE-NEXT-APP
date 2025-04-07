import Image from 'next/image'
import React from 'react'
import User from "./user.png"
interface AuthorData {
  author: {
    avatar?: string;
    name: string;
    profileLink: string;
  };
}

function CoreAuthor({ data }: { data: AuthorData }) {
  return (
    <div className="flex items-center gap-3 my-3">
    <Image
      src={data.author.avatar || User}
      alt={`${data.author.name} avatar`}
      width={40}
      height={40}
      className="rounded-full"
    />
    <div>
      <p className="font-medium text-gray-800">{data.author.name}</p>
      <a
        href={data.author.profileLink}
        className="text-blue-600 text-sm"
        target="_blank"
        rel="noopener noreferrer"
      >
        View Profile ↗
      </a>
    </div>
  </div>
  )
}

export default CoreAuthor