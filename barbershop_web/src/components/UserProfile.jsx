/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { jwtDecode as jwt_decode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import backImage from '../images/LoginRegister2.jpg'

const apiBaseURL = '/.netlify/functions/server' // Adjust the base path

const UserProfile = () => {
  const [userData, setUserData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserData = async () => {
      const getNewToken = async () => {
        try {
          const refreshToken = localStorage.getItem('refreshToken')
          console.log(`Refresh token: ${refreshToken}`)

          if (!refreshToken) {
            console.error('Refresh token is missing.')
            throw new Error('Refresh token is missing.')
          }
          const response = await axios.post(
            `${apiBaseURL}/server/routes/refreshToken`,
            {
              refresh_token: refreshToken,
            }
          )

          const newToken = response.data.accessToken
          localStorage.setItem('jwtToken', newToken)

          return newToken
        } catch (error) {
          console.error('Error refreshing token', error)

          if (axios.isAxiosError(error)) {
            console.error('Axios error details:', {
              response: error.response,
              request: error.request,
              config: error.config,
            })

            if (error.response?.status === 401) {
              // Handle 401 unauthorized (e.g., redirect to login)
              navigate('/login')
            } else {
              // Handle other errors as needed
              throw new Error('Error refreshing token')
            }
          } else {
            // Handle non-Axios errors
            throw error
          }
        }
      }

      try {
        const jwtToken = localStorage.getItem('jwtToken')
        console.log('JWT Token:', jwtToken)

        if (!jwtToken) {
          navigate('/login')
          return
        }

        const decodedToken = jwt_decode(jwtToken)

        const expirationThreshold = 5 * 60 * 1000
        if (decodedToken.exp * 1000 - Date.now() < expirationThreshold) {
          const newToken = await getNewToken()
          localStorage.setItem('jwtToken', newToken)
        }

        const response = await axios.get(`${apiBaseURL}/user/profile`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          withCredentials: true,
        })

        console.log('User Data:', response.data)

        setUserData(response.data)
      } catch (error) {
        console.error('Error loading user data', error)

        if (axios.isAxiosError(error) && error.response?.status === 401) {
          navigate('/login')
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [navigate])

  if (isLoading) {
    return <div className='text-center my-8'>Loading...</div>
  }

  return (
    <div
      className='min-h-screen relative bg-cover'
      style={{ backgroundImage: `url(${backImage})` }}
    >
      <div className='absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-md w-full md:w-2/3 lg:w-1/2 xl:w-1/3'>
        <h2 className='text-3xl font-semibold mb-6 flex items-center'>
          <FontAwesomeIcon icon={faUser} className='mr-4 text-indigo-500' />
          {userData ? (
            <>
              <span className='text-gray-700'>
                {userData.username}'s Profile
              </span>
            </>
          ) : (
            <span className='text-gray-700'>User Profile</span>
          )}
        </h2>
        {userData ? (
          <div>
            <p className='text-lg mb-3'>
              <strong className='text-gray-600 font-bold your-permanent-marker-text'>
                Username:
              </strong>{' '}
              {userData.username}
            </p>
            <p className='text-lg mb-3'>
              <strong className='text-gray-600 font-bold your-permanent-marker-text'>
                Email:
              </strong>{' '}
              {userData.email}
            </p>
            <p className='text-lg mb-3'>
              <strong className='text-gray-600 font-bold your-permanent-marker-text'>
                Subscription Status:
              </strong>{' '}
              {userData.subscriptions && userData.subscriptions.length > 0 ? (
                <span className='text-green-500'>Subscribed</span>
              ) : (
                <span className='text-red-500'>Not subscribed</span>
              )}
            </p>
            {/* Add more user information as needed */}
          </div>
        ) : (
          <div className='text-red-500'>
            <p>Error loading user data.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserProfile
