import React, { useState } from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import backImage from '../images/LoginRegister2.jpg'

const RegisterForm = ({ setIsLoginPage }) => {
  const [registrationData, setRegistrationData] = useState({
    username: '',
    email: '',
    password: '',
  })

  const [isLoading, setIsLoading] = useState(false)
  const [registrationError, setRegistrationError] = useState(null)
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault()

    setRegistrationError(null)
    setIsLoading(true)

    try {
      // Perform client-side validation
      if (
        !isValidUsername(registrationData.username) ||
        !isValidEmail(registrationData.email)
      ) {
        throw new Error('Invalid username or email.')
      }

      const response = await axios.post(
        'http://localhost:4000/user/register',
        registrationData
      )

      console.log('Registration successful', response.data)

      // Provide feedback to the user (e.g., redirect to login page)
      // You might use React Router for this.
      setShouldRedirect(true)

      // Clear the form after successful registration
      setRegistrationData({
        username: '',
        email: '',
        password: '',
      })
    } catch (error) {
      console.error('Registration failed', error)
      setRegistrationError(
        'Registration failed. Please check your information and try again.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setRegistrationData({
      ...registrationData,
      [name]: value,
    })
  }

  // Client-side validation functions
  const isValidUsername = (username) => {
    // Implement your validation logic (e.g., minimum length)
    return username.length >= 3
  }

  const isValidEmail = (email) => {
    // Implement your email validation logic (e.g., regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  if (shouldRedirect) {
    return <Navigate to='/' replace />
  }

  const backgroundStyles = {
    backgroundImage: `url(${backImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }

  return (
    <div
      className='flex justify-center items-center h-screen'
      style={backgroundStyles}
    >
      <form
        className='w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 bg-white p-8 rounded shadow-md'
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
        onSubmit={handleRegistrationSubmit}
        disabled={isLoading}
      >
        <h2 className='text-2xl font-bold mb-4'>Inregistreaza-te</h2>

        {registrationError && (
          <p className='text-red-500 mb-4'>{registrationError}</p>
        )}

        <label htmlFor='username' className='block text-gray-700 font-bold'>
          Username:
        </label>
        <input
          type='text'
          id='username'
          name='username'
          value={registrationData.username}
          onChange={handleInputChange}
          required
          className='w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:border-blue-500'
        />

        <label htmlFor='email' className='block mt-4 text-gray-700 font-bold'>
          Email:
        </label>
        <input
          type='email'
          id='email'
          name='email'
          value={registrationData.email}
          onChange={handleInputChange}
          required
          className='w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:border-blue-500'
        />

        <label
          htmlFor='password'
          className='block mt-4 text-gray-700 font-bold'
        >
          Password:
        </label>
        <input
          type='password'
          id='password'
          name='password'
          value={registrationData.password}
          onChange={handleInputChange}
          required
          className='w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:border-blue-500'
        />

        <button
          type='submit'
          className='custom-button w-full mt-6 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300'
          disabled={isLoading}
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  )
}

export default RegisterForm
