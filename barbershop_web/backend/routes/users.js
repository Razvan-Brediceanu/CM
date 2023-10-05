const express = require("express");
const router = express.Router();
// const User = require("../models/UserModel");
const {
  createUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
} = require("../controllers/userController");

//GET all Users
router.get("/", getUsers);

//GET a single User
router.get("/:username", getUser);

//POST a new User
router.post("/", createUser);

//DELETE a User
router.delete("/", deleteUser);

//UPDATE a User
router.patch("/", updateUser);

module.exports = router;
