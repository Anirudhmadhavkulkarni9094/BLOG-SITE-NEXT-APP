import React from 'react'

function CoreTitle({data}: {  data  : {title: string} }) {
  return (
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{data.title.toLocaleUpperCase()}</h1>
  )
}

export default CoreTitle