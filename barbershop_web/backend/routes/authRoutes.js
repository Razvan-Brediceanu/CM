// routes/userRoutes.js
const express = require('express')
const router = express.Router()
const {
  createUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  loginUser,
} = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

// Get all users
router.get('/', getUsers)

// Get a single user by username
router.get('/:username', getUser)

// Create a new user
router.post('/register', createUser)

// Delete a user (by username)
router.delete('/:username', deleteUser)

// Update a user (by username)
router.patch('/:username', updateUser)

// Login user
router.post('/login', loginUser)

module.exports = router
