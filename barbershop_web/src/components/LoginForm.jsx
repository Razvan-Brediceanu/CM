import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import backImage from '../images/LoginRegister2.jpg'
import { useNavigate } from 'react-router-dom'

const LoginForm = ({ setIsLoginPage }) => {
  const navigate = useNavigate() // Use useNavigate for navigation
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check if a valid JWT token is present in local storage
    const jwtToken = localStorage.getItem('jwtToken')
    if (jwtToken) {
      setIsLoggedIn(true)
    }
  }, [])

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
        'https://ec2-51-20-131-65.eu-north-1.compute.amazonaws.com:4000/user/login',
        loginData,
        { withCredentials: true }
      )

      if (response.data && response.data.token) {
        localStorage.setItem('refreshToken', response.data.refreshToken)
        localStorage.setItem('jwtToken', response.data.token)
        setIsLoggedIn(true)
        setLoginData({ email: '', password: '' })

        // Redirect to the home page after successful login
        navigate('/') // Update the path based on your home page route
      } else {
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
    setLoginData({ ...loginData, [name]: value })
  }

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
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
        {isLoggedIn ? (
          <>
            <h2 className='text-2xl font-bold mb-4'>
              Relogheaza-te a expirat sesiunea
            </h2>
            {/* No logout button here */}
          </>
        ) : (
          <>
            <h2 className='text-2xl font-bold mb-4'>Logheaza-te</h2>
            {loginError && <p className='text-red-500 mb-4'>{loginError}</p>}
            <label
              htmlFor='email'
              className='block mt-4 text-gray-700 font-bold'
            >
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
              Parola:
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
              {isLoading ? 'Logging in...' : 'Logheaza-te'}
            </button>
            <p className='mt-4 text-gray-700'>
              Nu ai cont?{' '}
              <Link to='/register' className='text-blue-500 hover:underline'>
                Creaza-ti unul
              </Link>
              .
            </p>
          </>
        )}
      </form>
    </div>
  )
}

export default LoginForm
