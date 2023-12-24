const express = require('express')
const cors = require('cors')
const db = require('./db')
const app = express()

// Middleware for parsing JSON requests
app.use(express.json())

// Enable CORS for all routes or specify origins as needed
app.use(cors())

// Import your route files
const userRoutes = require('./routes/userRoutes')

// Use the imported route files
app.use('/user', userRoutes)

// Serve static files (for example, images, CSS, or client-side JS)
app.use(express.static('public'))

// Custom middleware for handling errors
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something went wrong!')
})

// Additional routes and configurations can be added here

// Start the Express server
const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
