import React from 'react'
import { FaRibbon } from 'react-icons/fa' // Importing the star icon from FontAwesome

const Newsection = () => {
  return (
    <div className='bg-gray-800 py-6 mt-10 mx-auto max-w-lg rounded-lg'>
      <div className='text-white text-center px-4'>
        <h2 className='text-xl sm:text-2xl font-bold mb-4'>
          <FaRibbon className='inline-block mr-2' />{' '}
          {/* Adding the star icon */}
          Produse de calitate, siguranta si rezistenta
        </h2>
        <p className='text-sm sm:text-lg mb-4'>
          Suntem angajați să oferim produse de top care să îndeplinească nevoile
          dumneavoastră. Echipa noastră dedicată de suport este disponibilă 24/7
          pentru a vă asista în orice întrebări sau probleme.
        </p>
        <div className='flex justify-center'>
          <button className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline'>
            Learn More
          </button>
        </div>
      </div>
    </div>
  )
}

export default Newsection
