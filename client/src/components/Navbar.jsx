import React from 'react'
import { assets } from '../assets/assets'

const Navbar = () => {
  return (
    <div className='shadow py-4'>
         <div className='container px-4 2xl:px-20 mx-auto flex justify-between items-center'>
             <img src={assets.logo} alt="" />
             <div className='flex gap-4 max-sm:text-sx'>
                <button className='text-gray-600 cursor-pointer'>Recruiter Login</button>
                <button className='bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full cursor-pointer'>Login</button>
             </div>
         </div>
    </div>
  )
}

export default Navbar