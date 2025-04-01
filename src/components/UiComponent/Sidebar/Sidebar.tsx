import Link from 'next/link';
import React from 'react';

function Sidebar() {
  return (
    <div className='bg-black text-white w-52 min-h-screen p-4 flex flex-col gap-4'>
      <h2 className='text-lg font-bold mb-2'>Dashboard</h2>
      <Link href='/content-manager/create' className='hover:text-gray-300'>Create Post</Link>
      <Link href='/content-manager/edit-post' className='hover:text-gray-300'>Edit Post</Link>
      <Link href='/content-manager/posts' className='hover:text-gray-300'>All Posts</Link>
      <Link href='/content-manager/categories' className='hover:text-gray-300'>Categories</Link>
      <Link href='/content-manager/settings' className='hover:text-gray-300'>Settings</Link>
      <Link href='/content-manager/profile' className='hover:text-gray-300'>Profile</Link>
      <Link href='/content-manager/view-analytics' className='hover:text-gray-300'>View Analytics</Link>
      <Link href='/content-manager/logout' className='hover:text-gray-300'>Logout</Link>
    </div>
  );
}

export default Sidebar;
