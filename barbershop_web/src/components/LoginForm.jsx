import React, { useState } from 'react'
import axios from 'axios'
import backImage from '../images/LoginRegister2.jpg'
import { Link } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

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

      console.log('Login successful', response.data)

      // Provide feedback to the user (e.g., redirect to home page)

      setShouldRedirect(true)

      // Clear the form after successful login
      setLoginData({
        email: '',
        password: '',
      })
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
        className='w-1/3 bg-white p-8 rounded shadow-md'
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }} // Adjust the width here (e.g., w-1/3)
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
