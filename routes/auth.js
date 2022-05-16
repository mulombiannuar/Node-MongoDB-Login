const express = require("express");
const router = express.Router();
const { genSaltSync, hashSync, compare } = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../validation/user");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("auth respond with a resource");
});

/* Register user. */
router.post("/register", async (req, res) => {
  //Validate request
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  const { name, email, dateOfBirth, password } = req.body;

  //Check if user already exists
  const emailExist = await User.findOne({ email: email });
  if (emailExist)
    return res.status(400).send({ error: "Email already exists" });

  //Hash password
  const salt = await genSaltSync(10);
  const hashedPassword = await hashSync(password, salt);

  //Create user
  const user = new User({
    name: name,
    email: email,
    birth_date: dateOfBirth,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    console.log(dateOfBirth);
    res.status(200).send({
      status: "success",
      message: "Signup successful",
      data: savedUser,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

/* Login user. */
router.post("/login", async (req, res) => {
  //Validate request
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  const { email, password } = req.body;

  //Check if user already exists
  const user = await User.findOne({ email: email });
  if (!user)
    return res.status(400).send({ error: "Email or password is incorrect" });

  //Valid password
  const validPassword = await compare(password, user.password);
  if (!validPassword)
    return res.status(400).send({ error: "Password is incorrect" });

  const token = jwt.sign({ id: user._id }, process.env.SECRET_TOKEN, {
    expiresIn: "2h",
  });
  //res.header("auth-token", token).send({ authToken: token });
  res.header("auth-token", token).status(200).send({
    status: "success",
    message: "Signin successful",
    data: user,
    authToken: token,
  });

  //return res.status(400).send("Logged in successfully");
});

module.exports = router;
