const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const serverless = require('serverless-http') // Import the serverless-http module
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
const refreshTokenRouter = require('./refreshToken')

app.use('/.netlify/functions/server/user', userRouter) // Adjust the base path
app.use('/.netlify/functions/server/refresh', refreshTokenRouter) // Adjust the base path

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

// Use serverless-http to wrap your Express app
const handler = serverless(app)

// Define a function to handle requests for serverless deployment
exports.handler = async function (event, context) {
  // Include the serverless-http handler
  return await handler(event, context)
}

// This part is not needed for serverless deployment, it's for local testing
if (!process.env.AWS_LAMBDA_FUNCTION_NAME) {
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}
