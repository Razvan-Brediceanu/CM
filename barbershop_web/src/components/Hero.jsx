import React from 'react'

const Hero = () => {
  return (
    <div className='w-full h-[90vh] relative overflow-hidden rounded-md shadow-lg'>
      <img
        src='https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80'
        alt='/'
        className='w-full h-full object-cover'
      />
      {/* Semi-transparent overlay */}
      <div className='absolute inset-0 bg-black bg-gradient-to-b bg-opacity-50'></div>
      <div className='max-w-[1140px] m-auto'>
        <div className='absolute top-[25%] sm:top-[30%] md:top-[30%] w-full max-w-[600px] w-[100%] flex flex-col text-white p-4 z-10 bg-black bg-opacity-50 rounded-lg'>
          <h2 className='text-5xl py-4 italic'>Musat Signature</h2>
          <p className='text-2xl py-4 italic'>
            "Transformăm Look-ul, Sporim Încrederea."
          </p>
        </div>
      </div>
    </div>
  )
}

export default Hero
