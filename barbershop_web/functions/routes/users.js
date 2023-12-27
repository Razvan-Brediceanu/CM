const express = require('express')
const router = express.Router()
const {
  createUser,
  getUser,
  loginUser,
  getProfile,
} = require('../functions/controllers/userController')
const authMiddleware = require('../functions/middleware/authMiddleware')

// Get the profile of the currently logged-in user (protected route)
router.get('/profile', authMiddleware, getProfile)

// Get a single user by username
router.get('/:username', getUser)

// Create a new user
router.post('/register', createUser)

// Login user
router.post('/login', loginUser)

module.exports = router
