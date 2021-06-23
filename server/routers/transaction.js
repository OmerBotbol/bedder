const express = require('express');
const transaction = express.Router();
const models = require('../models');

transaction.post('/new', (req, res) => {
  const { asset_id, owner_id, renter_id, started_at, ended_at, comments } =
    req.body;
  models.Transactions.create({
    asset_id,
    owner_id,
    renter_id,
    started_at,
    ended_at,
    comments,
  })
    .then((data) => res.send('Transaction added'))
    .catch((err) => res.status(500).send(err));

  //add a column in transaction of owner approval
  models.Approvement.create({});
});
module.exports = transaction;
