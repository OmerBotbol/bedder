const express = require("express");
const owner = express.Router();
const { register } = require("../utils");
const models = require("../models");

owner.use(express.json());

owner.post("/create", (req, res) => {
  const { first_name, last_name, email, picture, phone_number } = req.body;
  register(req, res, models.Owners).then((newPassword) => {
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

module.exports = owner;
