import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import backImage from '../images/LoginRegister2.jpg'
import { loadStripe } from '@stripe/stripe-js'

const apiBaseURL = '/.netlify/functions' // Adjust the base path for Netlify functions

const stripePromise = loadStripe(
  'pk_test_51OSbm5AMGDZssiK7wgZWJHRloDfLJXS60EXx3Pd2GXLqU5IrOWx8YTg4d7Atlk1jCTwEVN2Zll1oEq4xcXlriUTJ00Bend1W0D'
)
const CoursesPage = () => {
  const [courses, setCourses] = useState([])
  const [userData, setUserData] = useState(null)
  const navigate = useNavigate()

  const fetchCourses = async () => {
    try {
      // Simulate fetching courses
      // Replace this with your actual courses logic
      const mockCourses = [
        {
          title: 'Course 1',
          description: 'Description for Course 1',
          videoUrl: 'https://www.youtube.com/embed/',
          price: 19.99, // Add a price for each course
        },
        {
          title: 'Course 2',
          description: 'Description for Course 2',
          videoUrl: 'https://www.youtube.com/embed/',
          price: 29.99,
        },
        {
          title: 'Course 3',
          description: 'Description for Course 3',
          videoUrl: 'https://www.youtube.com/embed/',
          price: 39.99,
        },
        // Add more courses as needed
      ]

      setCourses(mockCourses)
    } catch (error) {
      console.error('Error fetching courses', error)
    }
  }

  const fetchPaymentIntent = async (courseTitle, coursePrice) => {
    try {
      const payload = {
        amount: coursePrice * 100, // Amount in cents
      }

      console.log('Request payload:', payload)

      const response = await fetch(`${apiBaseURL}/create-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const responseData = await response.json()
      console.log('Received response data:', responseData)

      const { clientSecret } = responseData
      console.log('Received clientSecret:', clientSecret)

      return clientSecret
    } catch (error) {
      console.error('Error fetching payment intent', error)
      throw new Error('Failed to fetch payment intent')
    }
  }

  const handlePay = async (event, course) => {
    event.preventDefault()

    try {
      // Fetch payment intent from your serverless function
      const clientSecret = await fetchPaymentIntent(course.title, course.price)

      // Log the received clientSecret
      console.log('Received clientSecret:', clientSecret)

      // Confirm the payment with Stripe
      const stripe = await stripePromise
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: 'pm_card_visa', // Replace with actual payment method
        }
      )

      // Log the results of the payment confirmation
      console.log('Payment intent result:', paymentIntent)
      console.log('Payment error:', error)

      if (error) {
        console.error('Payment failed:', error.message)
      } else {
        console.log('Payment succeeded:', paymentIntent)
        // Update user's subscriptions to unlock the course
        setUserData((prevUserData) => ({
          ...prevUserData,
          subscriptions: [...prevUserData.subscriptions, course.title],
        }))
      }
    } catch (error) {
      console.error('Error handling payment:', error)
    }
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const jwtToken = localStorage.getItem('jwtToken')

        if (!jwtToken) {
          console.error('JWT Token not found in local storage')
          navigate('/login')
          return
        }

        const mockUserData = {
          subscriptions: [],
        }

        setUserData(mockUserData)
      } catch (error) {
        console.error('Error fetching user data', error)
      }
    }

    fetchUserData()
    fetchCourses()
  }, [navigate])

  return (
    <div
      className='relative min-h-screen bg-cover'
      style={{ backgroundImage: `url(${backImage})` }}
    >
      <div className='absolute left-1/2 transform -translate-x-1/2 container mx-auto px-4 lg:px-8 font-bold your-permanent-marker-text sm:mt-15'>
        <h2 className='text-3xl font-bold mb-8 lg:mb-20 text-center sm:mb-16 md:mb-20 lg:mb-24'>
          Cursuri Musat Signature
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:mx-2 lg:mx-0'>
          {courses.map((course, index) => (
            <div
              key={index}
              className='bg-white p-4 sm:p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 border border-gray-300'
            >
              <h3 className='text-xl font-semibold mb-2'>{course.title}</h3>
              <p className='text-gray-600 mb-4'>{course.description}</p>
              {!userData || !userData.subscriptions.includes(course.title) ? (
                // Render payment button if not unlocked
                <>
                  <button
                    className='text-green-500 font-bold mb-2'
                    onClick={(event) => handlePay(event, course.title)}
                    style={{ cursor: 'pointer' }}
                  >
                    Pay to Unlock
                  </button>
                  <p>Price: ${course.price}</p>
                </>
              ) : (
                // Render video if unlocked
                <iframe
                  title={course.title}
                  width='100%'
                  height='315'
                  src={course.videoUrl}
                  frameBorder='0'
                  allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                ></iframe>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CoursesPage
