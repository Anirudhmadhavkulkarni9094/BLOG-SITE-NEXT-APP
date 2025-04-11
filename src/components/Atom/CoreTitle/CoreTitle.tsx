import React from 'react'

function CoreTitle({data}: {  data  : {title: string} }) {
  return (
<h1 className="text-lg sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
  {data.title.toUpperCase()}
</h1>
  )
}

export default CoreTitle