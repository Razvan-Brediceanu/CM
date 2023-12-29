const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const serverless = require('serverless-http')
const stripe = require('stripe')('your_stripe_secret_key')

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

// Update the route for refreshToken
app.use('/.netlify/functions/server/routes/refreshToken', refreshTokenRouter)

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
app.post('/.netlify/functions/server/create-account-link', async (req, res) => {
  try {
    const account = await stripe.accounts.create({
      type: 'express',
    })

    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: 'https://geeks4life.netlify.app/onboarding/refresh',
      return_url: 'https://geeks4life.netlify.app/onboarding/success',
      type: 'account_onboarding',
    })

    res.json({ url: accountLink.url })
  } catch (error) {
    console.error('Error creating account link:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Stripe Payment Endpoint
app.post('/.netlify/functions/server/create-payment', async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: 'usd',
    })

    res.json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    console.error('Error creating payment intent:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Use serverless-http to wrap your Express app
const handler = serverless(app)

// Define a function to handle requests for serverless deployment
exports.handler = async function (event, context) {
  return await handler(event, context)
}
