const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 4000

// Middleware
app.use(cors())
app.use(express.json())

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const connection = mongoose.connection

connection.once('open', () => {
  console.log('Connected to MongoDB')
})

// Routes
const userRouter = require('./routes/users')
const refreshTokenRouter = require('./routes/refreshToken')

app.use('/user', userRouter)
app.use('/auth/refresh', refreshTokenRouter) // Use refreshTokenRouter for refreshing tokens

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
