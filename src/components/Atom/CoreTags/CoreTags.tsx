import React from 'react'

interface CoreTagsProps {
  block: {
    tags: string[];
  };
}

function CoreTags({ block }: CoreTagsProps) {
  return (
    <div className='mt-5'>

      {block.tags?.length > 0 && (
        <div className="mb-4 flex gap-2 flex-wrap">
          {block.tags.map((tag) => (
            <span
            key={tag}
            className="text-xs bg-gray-200 px-2 py-1 rounded-full text-gray-700"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      </div>
  )
}

export default CoreTags