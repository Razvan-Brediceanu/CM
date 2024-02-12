import React, { useState } from 'react'
import {
  AiFillPhone,
  AiOutlineClockCircle,
  AiOutlineMail,
} from 'react-icons/ai'
import { FaSearch } from 'react-icons/fa' // Import FaSearch icon for search functionality
import logo from '../images/icons8-construction-64.png'

const TopBar = () => {
  const [searchTerm, setSearchTerm] = useState('') // State to hold the search term

  const handleSearch = (e) => {
    setSearchTerm(e.target.value) // Update search term when input changes
  }

  return (
    <div className='flex flex-col md:flex-row justify-between items-center px-4 py-2 '>
      <div className='flex items-center justify-center md:justify-start mb-4 md:mb-0'>
        <div className='rounded-full overflow-hidden w-16 h-16'>
          <img
            src={logo}
            alt='Logo'
            className='object-contain w-full h-full text-[var(--primary-dark)]'
          />
        </div>
        <h1 className='text-2xl font-bold text-gray-700 md:ml-2 font-bold your-permanent-marker-text'>
          Confectii Metalice
        </h1>
      </div>
      <div className='flex flex-col md:flex-row items-center md:space-x-6'>
        <div className='flex items-center px-6 mb-2 md:mb-0'>
          <AiOutlineClockCircle
            size={20}
            className='mr-2 text-[var(--primary-dark)]'
          />
          <p className='text-sm text-gray-700'>9AM - 5PM</p>
        </div>
        <div className='flex items-center px-6 mb-2 md:mb-0'>
          <AiFillPhone size={20} className='mr-2 text-[var(--primary-dark)]' />
          <p className='text-sm text-gray-700'>888-888</p>
        </div>
        <div className='flex items-center px-6 mb-2 md:mb-0'>
          <AiOutlineMail
            size={20}
            className='mr-2 text-[var(--primary-dark)]'
          />
          <p className='text-sm text-gray-700'>testasdfaxkjhsadf@test.com</p>
        </div>
        {/* Search input */}
        <div className='relative'>
          <input
            type='text'
            placeholder='Search products...'
            className='border border-gray-300 rounded-full py-1 px-4 focus:outline-none focus:border-blue-500'
            value={searchTerm}
            onChange={handleSearch}
          />
          <FaSearch className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
        </div>
      </div>
    </div>
  )
}

export default TopBar
