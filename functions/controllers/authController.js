// controllers/authController.js
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const secretKey = process.env.SECRET_KEY || 'default_secret_key'

const getUserByRefreshToken = async (refreshToken) => {
  try {
    const user = await User.findOne({ refreshToken })

    if (!user) {
      throw new Error('Invalid refresh token')
    }

    return user
  } catch (error) {
    console.error('Error fetching user data by refresh token:', error.message)
    throw new Error('Error fetching user data')
  }
}

const refreshAccessToken = async (refreshToken) => {
  try {
    const user = await getUserByRefreshToken(refreshToken)

    const accessToken = jwt.sign({ userId: user.id }, secretKey, {
      expiresIn: '15m',
    })

    return accessToken
  } catch (error) {
    console.error('Error refreshing access token:', error.message)
    throw error
  }
}

module.exports = {
  getUserByRefreshToken,
  refreshAccessToken,
}
