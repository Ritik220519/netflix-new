const express = require("express");
const User = require("../model/userSchema");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const {validateForSignup , validateForLogin} = require("../utils/validate");
const jwt = require("jsonwebtoken");

authRouter.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, emailId, password } = req.body;
    validateForSignup(req);
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashPassword,
    });
    await user.save();
    res.send(`${firstName} Signup Successfully`);
  } catch (err) {
    res.status(400).send("Signup Failed : " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    validateForLogin(req);
    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("e Invalid credentials");
    }
    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      throw new Error("p Invalid credentials");
    }

    const token = await jwt.sign({ user_id: user._id }, "Netflix-SecretKey" );
    res.cookie("token", token);
    res.send(`${user.firstName} successfully login.`);
  } catch (error) {
    res.status(400).send("login failed : " + error.message);
  }
});

module.exports = authRouter;
