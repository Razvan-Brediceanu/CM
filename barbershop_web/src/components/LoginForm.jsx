import React, { useState } from 'react'
import axios from 'axios'
import { Link, Navigate } from 'react-router-dom'
import backImage from '../images/LoginRegister2.jpg'

const LoginForm = ({ setIsLoginPage }) => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  })

  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState(null)
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const handleLoginSubmit = async (e) => {
    e.preventDefault()

    setLoginError(null)
    setIsLoading(true)

    try {
      // Perform client-side validation
      if (!isValidEmail(loginData.email)) {
        throw new Error('Invalid email.')
      }

      const response = await axios.post(
        'http://localhost:4000/user/login',
        loginData
      )

      // Log the entire response object to the console
      console.log('Login response:', response)

      // Log the data from the response to understand its structure
      console.log('Response data:', response.data)

      if (response.data && response.data.token) {
        // Log the access token from the response to the console
        console.log('Access Token:', response.data.token)

        // Store the refresh token in local storage
        localStorage.setItem('refreshToken', response.data.refreshToken)
        // Store the access token in local storage
        localStorage.setItem('jwtToken', response.data.token)

        // Provide feedback to the user (e.g., redirect to home page)
        setShouldRedirect(true)

        // Clear the form after successful login
        setLoginData({
          email: '',
          password: '',
        })
      } else {
        console.error('Response data:', response.data)
        console.error('Access token is missing in the response.')
        throw new Error('Access token is missing in the response.')
      }
    } catch (error) {
      console.error('Login failed', error)
      setLoginError(
        'Login failed. Please check your information and try again.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setLoginData({
      ...loginData,
      [name]: value,
    })
  }

  // Client-side validation functions
  const isValidEmail = (email) => {
    // Implement your email validation logic (e.g., regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  if (shouldRedirect) {
    return <Navigate to='/profile' replace />
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
        onSubmit={handleLoginSubmit}
        disabled={isLoading}
      >
        <h2 className='text-2xl font-bold mb-4'>Logheaza-te</h2>

        {loginError && <p className='text-red-500 mb-4'>{loginError}</p>}

        <label htmlFor='email' className='block mt-4 text-gray-700 font-bold'>
          Email:
        </label>
        <input
          type='email'
          id='email'
          name='email'
          value={loginData.email}
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
          value={loginData.password}
          onChange={handleInputChange}
          required
          className='w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:border-blue-500'
        />

        <button
          type='submit'
          className='custom-button w-full mt-6 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300'
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>

        <p className='mt-4 text-gray-700'>
          Nu ai cont?{' '}
          <Link to='/register' className='text-blue-500 hover:underline'>
            Creaza-ti unul
          </Link>
          .
        </p>
      </form>
    </div>
  )
}

export default LoginForm
