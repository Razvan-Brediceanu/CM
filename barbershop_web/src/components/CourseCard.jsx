// src/components/CourseCard.js
import React from 'react'

const CourseCard = ({ title, description, videoUrl }) => (
  <div className='max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-md mb-6'>
    <iframe
      title={title}
      width='100%'
      height='200'
      src={videoUrl}
      frameBorder='0'
      allowFullScreen
      className='w-full h-48 object-cover'
    ></iframe>
    <div className='p-4'>
      <h3 className='text-xl font-semibold mb-2'>{title}</h3>
      <p className='text-gray-700'>{description}</p>
    </div>
  </div>
)

export default CourseCard
