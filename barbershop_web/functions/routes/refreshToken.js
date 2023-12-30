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

// Route to refresh the access token
router.post('/', async (req, res) => {
  const { refreshToken } = req.body
  console.log('Received refresh token:', refreshToken)

  try {
    // Verify the refresh token and get user data
    const user = await getUserByRefreshToken(refreshToken)
    console.log('User found:', user)

    // Generate a new access token
    const accessToken = jwt.sign({ userId: user.id }, secretKey, {
      expiresIn: '15m', // Set the expiration time as needed
    })

    // Send the new access token in the response
    console.log('New access token generated:', accessToken)
    res.json({ accessToken })
  } catch (error) {
    console.error('Error refreshing access token:', error.message)
    res.status(500).json({ error: `Internal Server Error: ${error.message}` })
  }
})

module.exports = router
