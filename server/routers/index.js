const { Router } = require("express");
const api = Router();
const owner = require("./owner");
const renter = require("./renter");
const asset = require("./asset");
const transaction = require("./transaction");

api.use("/owner", owner);
api.use("/renter", renter);
api.use("/asset", asset);
api.use("/transaction", transaction);

module.exports = api;
