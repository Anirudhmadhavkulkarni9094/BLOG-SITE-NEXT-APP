import Link from 'next/link'
import React from 'react'

function Navbar() {
  return (
    <div className='flex justify-between p-4 bg-gray-800 text-white'>
        <div>
            <Link href="/">Logo</Link>
        </div>
        <ul className='flex gap-5'>
            <li>
                <Link href="/">Home</Link>
            </li>
            <li>
                <Link href="/about">About</Link>
            </li>
            <li>
                <Link href="/blog">Blog</Link>
            </li>
        </ul>
    </div>
  )
}

export default Navbar