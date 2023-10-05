// routes/auth.js
const express = require("express");
const router = express.Router();
const { loginUser, registerUser, logoutUser } = require("../controllers/auth"); // Import the controllers

// Define routes for user authentication
router.post("/login", loginUser); // Login route
router.post("/register", registerUser); // Registration route
router.post("/logout", logoutUser); // Logout route

module.exports = router;
