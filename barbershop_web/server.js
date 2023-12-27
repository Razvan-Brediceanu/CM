// server.js
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()

// Middleware
app.use(
  cors({
    origin: 'https://geeks4life.netlify.app',
    credentials: true,
  })
)
app.use(express.json())

// Routes
const userRouter = require('./routes/users')
const refreshTokenRouter = require('./routes/refreshToken')

app.use('/user', userRouter)
app.use('/auth/refresh', refreshTokenRouter)

module.exports = app
