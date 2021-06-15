require("dotenv").config();
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
  login(req, res, models.Owners, true)
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
  console.log(refreshToken);
  if (!refreshToken) {
    return res.status(403).send("refresh token is required");
  }
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Invalid Refresh token" });
    }
    const newAccessToken = jwt.sign(
      { email: decoded.email, isOwner: true },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: "2m",
      }
    );
    res.json({ accessToken: newAccessToken, email: decoded.email });
  });
});

owner.put("/update/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  const { first_name, last_name, email, picture, phone_number } = req.body;
  console.log(first_name);
  models.Owners.update(
    { first_name, last_name, email, picture, phone_number },
    {
      where: { id },
      returning: true,
      plain: true,
    }
  )
    .then(() => res.send("updated successfully"))
    .catch((err) => res.status(500).send(err));
});

owner.get("/:id", (req, res) => {
  let id = req.params.id;
  models.Owners.findOne({
    where: { id },
    raw: true,
  })
    .then((data) => {
      const dataToSend = {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        picture: data.picture,
        phone_number: data.phone_number,
      };
      res.send(dataToSend);
    })
    .catch((err) => res.status(500).send(err));
});

module.exports = owner;
