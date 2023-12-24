// controllers/profileController.js

const getProfile = (req, res) => {
  // Access the logged-in user's information from req.user
  const { username, email } = req.user

  res.status(200).json({
    username,
    email,
    message: 'Profile information retrieved successfully.',
  })
}

module.exports = {
  getProfile,
}
