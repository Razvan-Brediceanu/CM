import React from 'react'

const Hero = () => {
  return (
    <div className='w-full h-[90vh] relative overflow-hidden rounded-md shadow-lg'>
      <img
        src='https://images.unsplash.com/photo-1529939828339-56039bb75a63?q=80&w=2083&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        alt='/'
        className='w-full h-full object-cover'
      />
      {/* Semi-transparent overlay */}
      <div className='absolute inset-0 bg-black bg-gradient-to-b bg-opacity-50'></div>
      <div className='max-w-[90%] md:max-w-[80%] lg:max-w-[600px] m-auto'>
        <div className='absolute top-1/4 sm:top-[30%] md:top-[30%] lg:left-1/3 lg:transform lg:translate-x-[-50%] w-full md:max-w-[600px] w-[90%] lg:w-[70%] flex flex-col text-white p-4 z-10 bg-black bg-opacity-50 rounded-lg'>
          <h2 className='text-3xl sm:text-4xl lg:text-5xl py-2 italic'>
            Construind viitorul cu precizie și durabilitate
          </h2>
        </div>
      </div>
    </div>
  )
}

export default Hero
