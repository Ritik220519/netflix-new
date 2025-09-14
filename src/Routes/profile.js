const express = require("express");
const userAuth = require("../middleware/userAuth");
const profileView = express.Router();

profileView.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("failed to fetch : " + err.message);
  }
});

module.exports = profileView;