import Image from 'next/image'
import React from 'react'


function CoreImage({block}: { block: { featuredImage: string; title: string } }) {
  return (
    <div className="">
            <Image
              src={block.featuredImage}
              alt={block.title}
              width={600}
              height={300}
            />
          </div>
  )
}

export default CoreImage