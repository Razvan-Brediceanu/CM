const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
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

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error)
  })

// Define a function to handle requests for serverless deployment
exports.handler = async function (event, context) {
  try {
    if (event.httpMethod === 'OPTIONS') {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': 'https://geeks4life.netlify.app',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Credentials': 'true', // Add this line
        },
        body: '',
      }
    }

    // Handle regular Express app functionality
    const result = await app(event, context)

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    }
  } catch (error) {
    console.error('Error handling request:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    }
  }
}

// If you want to run the server locally (not for serverless deployment)
if (!process.env.AWS_LAMBDA_FUNCTION_NAME) {
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}
