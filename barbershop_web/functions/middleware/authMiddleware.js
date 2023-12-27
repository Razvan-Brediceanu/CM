// middleware/authMiddleware.js
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const authMiddleware = async (req, res, next) => {
  const authHeader = req.header('Authorization')

  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized. Token missing.' })
  }

  if (!authHeader.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({ error: 'Unauthorized. Invalid token format.' })
  }

  const token = authHeader.slice(7)

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findOne({ _id: decoded.userId })

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized. User not found.' })
    }

    req.user = user
    next()
  } catch (error) {
    console.error('Authentication error:', error.message)
    return res.status(401).json({ error: 'Unauthorized. Invalid token.' })
  }
}

module.exports = authMiddleware
