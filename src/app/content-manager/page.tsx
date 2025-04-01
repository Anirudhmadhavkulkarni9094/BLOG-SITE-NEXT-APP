import Layout from '@/components/Layout/Layout'
import Sidebar from '@/components/UiComponent/Sidebar/Sidebar'
import React from 'react'

function page() {
  return (
    <div className='flex min-h-screen'>
      <div>
        <Sidebar></Sidebar>
      </div>
      <div className='w-full bg-blue-500 p-5'>
        <h1>Hello</h1>
      </div>
    </div>
  )
}

export default page