const express = require("express");
const api = express.Router();
const owner = require("./owner");
const renter = require("./renter");
const asset = require("./asset");
const transaction = require("./transaction");
const { login } = require("../utils");
const models = require("../models");
const jwt = require("jsonwebtoken");

api.use(express.json());

api.use("/owner", owner);
api.use("/renter", renter);
api.use("/asset", asset);
api.use("/transaction", transaction);

api.post("/login", (req, res) => {
  const modelToSend = req.body.isOwner ? models.Owners : models.Renters;
  login(req, res, modelToSend, req.body.isOwner)
    .then(() => {
      console.log("success!");
    })
    .catch((err) => {
      console.log(err.message);
    });
});

api.post("/refreshToken", (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(403).send("refresh token is required");
  }
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Invalid Refresh token" });
    }
    const newAccessToken = jwt.sign(
      { email: decoded.email, isOwner: decoded.isOwner, id: decoded.id },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: "2m",
      }
    );
    res.json({
      accessToken: newAccessToken,
      email: decoded.email,
      isOwner: decoded.isOwner,
    });
  });
});

api.get("/data", (req, res) => {
  const accessToken = req.headers["authorization"];
  jwt.verify(accessToken.slice(7), process.env.ACCESS_TOKEN, (err, decode) => {
    if (err) {
      return res.status(403).send(err);
    }
    res.send(decode);
  });
});

module.exports = api;
