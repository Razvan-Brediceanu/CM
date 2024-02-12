const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const uuid = require('uuid')

// Function to generate a refresh token
const generateRefreshToken = () => {
  return uuid.v4() // Generates a random UUID
}

// Function to create a new user
const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body

    // Check if the username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] })

    if (existingUser) {
      return res
        .status(400)
        .json({ error: 'Username or email already exists.' })
    }

    // Hash the password
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Generate refresh token
    const refreshToken = generateRefreshToken()

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      refreshToken,
    })

    // Save the user to the database
    await newUser.save()

    res.status(201).json({ message: 'User created successfully.' })
  } catch (error) {
    console.error('Error creating user:', error)
    res.status(500).json({ error: 'Internal server error.' })
  }
}

// Function to log in a user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid email or password.' })
    }

    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '15m',
    })

    const refreshToken = generateRefreshToken()

    user.refreshToken = refreshToken
    await user.save()

    res.json({
      message: 'Login successful',
      user: {
        username: user.username,
        email: user.email,
        // Include other user details as needed
      },
      token: accessToken,
      refreshToken,
    })
  } catch (error) {
    console.error('Error logging in:', error)
    res.status(500).json({ error: 'Internal server error.' })
  }
}

// Function to get the profile of the currently logged-in user
const getProfile = async (req, res) => {
  try {
    // Retrieve user data from the request
    const userData = req.user

    // Send user data in the response
    res.json(userData)
  } catch (error) {
    console.error('Error getting user profile:', error)
    res.status(500).json({ error: 'Internal server error.' })
  }
}

// Function to get a single user by username
const getUser = async (req, res) => {
  try {
    // Retrieve the username from the request parameters
    const { username } = req.params

    // Find the user by username
    const user = await User.findOne({ username })

    if (!user) {
      return res.status(404).json({ error: 'User not found.' })
    }

    // Send user data in the response
    res.json(user)
  } catch (error) {
    console.error('Error getting user:', error)
    res.status(500).json({ error: 'Internal server error.' })
  }
}

// ... (other functions)

module.exports = {
  createUser,
  loginUser,
  getProfile,
  getUser,
  // ... (other exports)
}
