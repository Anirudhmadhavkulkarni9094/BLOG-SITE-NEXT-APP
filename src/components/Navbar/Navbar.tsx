import Link from 'next/link'
import React from 'react'
import BreadCrumbs from '../molecule/Breadcrumbs/BreadCrumbs'

function Navbar() {
  return (
    <div className='flex items-center justify-between p-4'>
        <BreadCrumbs/>
    </div>
  )
}

export default Navbar