// routes/profileRouter.js
const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const { getProfile } = require('../controllers/profileController') // Create this controller

// Protected route to get user profile
router.get('/', authMiddleware, getProfile)

module.exports = router
