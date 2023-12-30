const express = require('express')
const router = express.Router()
const {
  createUser,
  getUser,
  loginUser,
  getProfile,
} = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

// Get the profile of the currently logged-in user (protected route)
router.get('/profile', authMiddleware, getProfile)

// Get a single user by username
router.get('/:username', getUser)

// Create a new user
router.post('/register', createUser)

// Login user
router.post('/login', loginUser)

// Include refreshToken route
const refreshTokenRouter = require('./refreshToken')
router.use('/refresh', refreshTokenRouter)

module.exports = router
