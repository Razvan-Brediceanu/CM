const User = require("../models/user"); // Import your User model

// Controller for user registration
const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Create a new user document
    const newUser = new User({ username, password });

    // Save the user to the database
    await newUser.save();

    // Send a success response
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    // Handle errors
    console.error(error);

    // Send an error response
    res.status(500).json({ message: "Registration failed. Please try again." });
  }
};

module.exports = { registerUser };
