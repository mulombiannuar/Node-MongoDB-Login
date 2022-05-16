const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { genSaltSync, hashSync } = require("bcryptjs");
const { updationValidation } = require("../validation/user");

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting One user
router.get("/:id", getUser, (req, res) => {
  res.status(200).json(res.user);
});

// Updating One user
router.put("/:id", async (req, res) => {
  //Validate request
  const { error } = updationValidation(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  const { name, password } = req.body;
  const id = req.params.id;

  //Hash password
  const salt = await genSaltSync(10);
  const hashedPassword = await hashSync(password, salt);

  //Updated user detials
  const data = {
    name: name,
    password: hashedPassword,
  };
  try {
    const updatedUser = await User.findByIdAndUpdate(id, data);
    res.status(200).send(updatedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Deleting User
router.delete("/:id", getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.status(200).json({ message: "Deleted User" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// User middleware
async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Cannot find user" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.user = user;
  next();
}

module.exports = router;
