const express = require("express");
const cors = require("cors"); // Import the cors middleware
const db = require("./db");
const app = express();

// Middleware for parsing JSON requests
app.use(express.json());

// Enable CORS for all routes or specify origins as needed
app.use(cors());

// Import your route files
const userRoutes = require("./routes/userRoutes");

// Use the imported route files
app.use("/user", userRoutes);

// ... Rest of your Express.js configuration and routes ...

// Start the Express server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
