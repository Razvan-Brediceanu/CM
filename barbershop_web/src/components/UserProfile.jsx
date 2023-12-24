import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { jwtDecode as jwt_decode } from 'jwt-decode'

const UserProfile = () => {
  const [userData, setUserData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const getNewToken = async () => {
    try {
      // Ensure the refresh token is present in local storage
      const refreshToken = localStorage.getItem('refreshToken')
      console.log(`Refresh token: ${refreshToken}`)

      if (!refreshToken) {
        // Handle the case where the refresh token is missing
        console.error('Refresh token is missing.')
        throw new Error('Refresh token is missing.')
      }

      // Make a request to the server to refresh the access token
      const response = await axios.post('http://localhost:4000/auth/refresh', {
        refresh_token: refreshToken,
      })

      // Assuming the response contains a new access token
      const newToken = response.data.accessToken // Adjust the key based on your actual response

      // Update the local storage with the new access token
      localStorage.setItem('jwtToken', newToken)

      // Return the new access token
      return newToken
    } catch (error) {
      console.error('Error refreshing token', error)

      // Rethrow the error to handle it in the calling code
      throw error
    }
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const jwtToken = localStorage.getItem('jwtToken')
        console.log('JWT Token:', jwtToken)

        if (!jwtToken) {
          throw new Error('JWT token is missing.')
        }

        const decodedToken = jwt_decode(jwtToken)

        const expirationThreshold = 5 * 60 * 1000 // 5 minutes in milliseconds
        if (decodedToken.exp * 1000 - Date.now() < expirationThreshold) {
          const newToken = await getNewToken()
          localStorage.setItem('jwtToken', newToken)
        }

        const response = await axios.get('http://localhost:4000/user/profile', {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        })

        console.log('User Data:', response.data)

        setUserData(response.data)
      } catch (error) {
        console.error('Error loading user data', error)

        if (axios.isAxiosError(error) && error.response?.status === 401) {
          window.location.href = '/login'
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className='container mx-auto my-10 font-bold'>
      <div className='bg-white p-8 rounded-lg shadow-md md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto'>
        <h2 className='text-3xl font-semibold mb-8 flex items-center'>
          <FontAwesomeIcon icon={faUser} className='mr-4' />
          User Profile
        </h2>
        {userData ? (
          <div>
            <p className='text-lg mb-4'>
              <strong>Username:</strong> {userData.username}
            </p>
            <p className='text-lg mb-4'>
              <strong>Email:</strong> {userData.email}
            </p>
            <p className='text-lg mb-4'>
              <strong>Subscription Status:</strong>{' '}
              {userData.subscriptions && userData.subscriptions.length > 0
                ? 'Subscribed'
                : 'Not subscribed'}
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
