const { Router } = require("express");
const api = Router();
const owner = require("./owner");
const renter = require("./renter");

api.use("/owner", owner);
api.use("/renter", renter);

module.exports = api;
