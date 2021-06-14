const express = require("express");
const renter = express.Router();
const { register, login } = require("../utils");
const models = require("../models");

renter.use(express.json());

renter.post("/create", (req, res) => {
  const { first_name, last_name, email, purpose, picture, phone_number } =
    req.body;
  register(req, models.Renters).then((newPassword) => {
    if (newPassword === "Invalid email or password")
      return res.status(400).send("Invalid email or password");
    if (newPassword === "Email exists")
      return res.status(400).send("Email exists");
    models.Renters.create({
      first_name,
      last_name,
      email,
      password: newPassword,
      purpose,
      picture,
      phone_number,
    }).then(() => res.status(201).send(email + " registered"));
  });
});

renter.post("/login", (req, res) => {
  login(req, res, models.Renters)
    .then(() => {
      console.log("success!");
    })
    .catch((err) => {
      console.log(err.message);
    });
});

module.exports = renter;
