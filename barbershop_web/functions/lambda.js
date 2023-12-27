// lambda.js
const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const connection = mongoose.connection

connection.once('open', () => {
  console.log('Connected to MongoDB')
})

const app = require('../server')

exports.handler = async function (event, context) {
  return await app(event, context)
}
