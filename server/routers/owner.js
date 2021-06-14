const express = require("express");
const owner = express.Router();

owner.get("/test", (req, res) => {
  res.send("test");
});

module.exports = owner;
