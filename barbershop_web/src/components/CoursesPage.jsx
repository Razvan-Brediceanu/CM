import React, { useState, useEffect } from 'react'
import CourseCard from './CourseCard'
import axios from 'axios'

const CoursesPage = () => {
  const [courses, setCourses] = useState([])
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    // Fetch user data and courses when the component mounts
    const fetchUserData = async () => {
      try {
        // Assuming your backend API provides user data
        const response = await axios.get('http://localhost:4000/user')
        setUserData(response.data)
      } catch (error) {
        console.error('Error fetching user data', error)
      }
    }

    const fetchCourses = async () => {
      try {
        // Assuming your backend API provides a list of courses
        const response = await axios.get('http://localhost:4000/courses')
        setCourses(response.data)
      } catch (error) {
        console.error('Error fetching courses', error)
      }
    }

    fetchUserData()
    fetchCourses()
  }, [])

  return (
    <div className='container mx-auto my-10 font-bold your-permanent-marker-text'>
      <h2 className='text-3xl font-semibold mb-8 text-center'>
        Cursuri Musat Signature
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {courses.map((course, index) => (
          <CourseCard
            key={index}
            {...course}
            isUnlocked={
              userData && userData.subscriptions.includes(course.title)
            }
          />
        ))}
      </div>
    </div>
  )
}

export default CoursesPage
