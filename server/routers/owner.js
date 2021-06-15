const express = require("express");
const owner = express.Router();
const { register, login, sendRefreshToken } = require("../utils");
const models = require("../models");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

owner.use(express.json());

owner.post("/create", (req, res) => {
  const { first_name, last_name, email, picture, phone_number } = req.body;
  register(req, models.Owners).then((newPassword) => {
    if (newPassword === "Invalid email or password")
      return res.status(400).send("Invalid email or password");
    if (newPassword === "Email exists")
      return res.status(400).send("Email exists");
    models.Owners.create({
      first_name,
      last_name,
      email,
      password: newPassword,
      picture,
      phone_number,
    }).then(() => res.status(201).send(email + " registered"));
  });
});

owner.post("/login", (req, res) => {
  login(req, res, models.Owners)
    .then(() => {
      console.log("success!");
    })
    .catch((err) => {
      console.log(err.message);
    });
});

owner.post("/logout", (req, res) => {
  sendRefreshToken("", res);
  res.send("user logout");
});

owner.post("/refreshToken", cookieParser(), (req, res) => {
  const refreshToken = req.cookies["refreshToken"];
  if (!refreshToken) {
    return res.status(403).send("refresh token is required");
  }
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Invalid Refresh token" });
    }
    const newAccessToken = jwt.sign(
      { email: decoded.email },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: "2m",
      }
    );
    res.json({ accessToken: newAccessToken, email: decoded.email });
  });
});

module.exports = owner;
