import React from 'react'
import BreadCrumbs from '../molecule/Breadcrumbs/BreadCrumbs'

function Navbar() {
  return (
    <div className='flex items-center justify-between hidden sm:block'>
        <BreadCrumbs/>
    </div>
  )
}

export default Navbar