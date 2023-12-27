// functions/lambda.js
require('dotenv').config()
const mongoose = require('mongoose')
const app = require('./server')

exports.handler = async function (event, context) {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log('Connected to MongoDB')

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

    return await app(event, context)
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    }
  }
}
