const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()
const User = require('../models/userModel')

// Replace this with your actual secret key
const secretKey = process.env.SECRET_KEY || 'test2'

// Function to verify the refresh token and fetch user data
const getUserByRefreshToken = async (refreshToken) => {
  try {
    // Retrieve user information from your database based on the refresh token
    const user = await User.findOne({ refreshToken })

    if (!user) {
      throw new Error('Invalid refresh token')
    }

    return user
  } catch (error) {
    console.error('Error fetching user data by refresh token:', error.message)
    throw new Error(`Error fetching user data: ${error.message}`)
  }
}

// Function to check if the refresh token has expired
const isRefreshTokenExpired = (decodedToken) => {
  if (!decodedToken.exp) {
    return true // Token has no expiration time, consider it expired
  }

  const currentTime = Math.floor(Date.now() / 1000) // Current time in seconds
  return decodedToken.exp < currentTime
}

// Route to refresh the access token
router.post('/', async (req, res) => {
  const { refreshToken } = req.body

  try {
    // Verify the refresh token and get user data
    const user = await getUserByRefreshToken(refreshToken)

    // Decode the refresh token to check expiration
    const decodedRefreshToken = jwt.decode(refreshToken)

    // Check if the refresh token has expired
    const isExpired = isRefreshTokenExpired(decodedRefreshToken)
    if (isExpired) {
      throw new Error('Refresh token has expired')
    }

    // Generate a new access token
    const accessToken = jwt.sign({ userId: user.id }, secretKey, {
      expiresIn: '7d',
    })

    // Send the new access token in the response
    res.json({ accessToken })
  } catch (error) {
    console.error('Error refreshing access token:', error)
    res.status(500).json({ error: `Internal Server Error: ${error.message}` })
  }
})

module.exports = router
