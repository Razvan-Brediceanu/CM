// Import necessary modules and dependencies
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const bcrypt = require('bcrypt')

// Function to generate JWT tokens
const generateJwtTokens = (user) => {
  const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '15m', // Set an expiration time for the access token
  })

  const refreshToken = jwt.sign(
    { userId: user._id },
    process.env.REFRESH_SECRET,
    {
      expiresIn: '7d', // Set an expiration time for the refresh token
    }
  )

  return { accessToken, refreshToken }
}

// Controller function for user login
const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    // Find the user by email
    const user = await User.findOne({ email })

    // Check if the user exists
    if (!user) {
      return res
        .status(401)
        .json({ error: 'Invalid email or password. User not found.' })
    }

    // Check if the password is valid
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ error: 'Invalid email or password. Password mismatch.' })
    }

    // Generate JWT tokens
    const { accessToken, refreshToken } = generateJwtTokens(user)

    // Send the tokens in the response
    res.status(200).json({
      message: 'Login successful',
      user: {
        username: user.username,
        email: user.email,
      },
      accessToken,
      refreshToken,
    })
  } catch (error) {
    console.error('Error during login:', error)
    res
      .status(500)
      .json({ error: 'Internal server error', details: error.message })
  }
}

module.exports = loginUser
