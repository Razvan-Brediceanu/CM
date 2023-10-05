// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/authController"); // Import the controller

// Define user routes
router.post("/register", registerUser); // Use the controller for user registration

module.exports = router;
