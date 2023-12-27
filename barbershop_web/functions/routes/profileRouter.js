// routes/profileRouter.js

const express = require('express')
const router = express.Router()
const profileController = require('../controllers/profileController')
const authMiddleware = require('../middleware/authMiddleware')

// Get the profile of the currently logged-in user (protected route)
router.get('/profile', authMiddleware, profileController.getProfile)

module.exports = router
