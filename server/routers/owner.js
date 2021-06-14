const express = require("express");
const owner = express.Router();
const { register, login } = require("../utils");
const models = require("../models");

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

module.exports = owner;
