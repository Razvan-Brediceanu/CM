// server.js

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const serverless = require('serverless-http')

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

app.use('/.netlify/functions/server/user', userRouter)
app.use('/.netlify/functions/server/refresh', refreshTokenRouter)

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

// Stripe Connect Onboarding Endpoint
app.post('/create-account-link', async (req, res) => {
  try {
    const account = await stripe.accounts.create({
      type: 'express',
    })

    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: 'https://geeks4life.netlify.app/onboarding/refresh', // Replace with your onboarding URLs
      return_url: 'https://geeks4life.netlify.app/onboarding/success',
      type: 'account_onboarding',
    })

    res.json({ url: accountLink.url })
  } catch (error) {
    console.error('Error creating account link:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Include the new Stripe Payment Endpoint
app.use(
  '/.netlify/functions/server/create-payment',
  require('./create-payment')
)

// Use serverless-http to wrap your Express app
const handler = serverless(app)

// Define a function to handle requests for serverless deployment
exports.handler = async function (event, context) {
  return await handler(event, context)
}

// This part is not needed for serverless deployment, it's for local testing
if (!process.env.AWS_LAMBDA_FUNCTION_NAME) {
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}
