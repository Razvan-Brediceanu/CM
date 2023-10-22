// src/components/CoursesPage.js
import React from 'react'
import CourseCard from './CourseCard'

const CoursesPage = () => {
  const courses = [
    {
      title: 'Course 1',
      description: 'Description for Course 1',
      videoUrl: 'https://www.youtube.com/embed/your-video-id-1',
    },
    {
      title: 'Course 2',
      description: 'Description for Course 2',
      videoUrl: 'https://www.youtube.com/embed/your-video-id-2',
    },
    {
      title: 'Course 3',
      description: 'Description for Course 3',
      videoUrl: 'https://www.youtube.com/embed/your-video-id-2',
    },
    // Add more courses as needed
  ]

  return (
    <div className='container mx-auto my-10 font-bold your-permanent-marker-text'>
      <h2 className='text-3xl font-semibold mb-8 text-center'>
        Cursuri Musat Signature
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {courses.map((course, index) => (
          <CourseCard key={index} {...course} />
        ))}
      </div>
    </div>
  )
}

export default CoursesPage
