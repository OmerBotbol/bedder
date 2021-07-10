const express = require('express');
const transaction = express.Router();
const models = require('../models');
const { validateToken } = require('../utils');

//POST request to create new transaction
transaction.post('/new', validateToken, (req, res) => {
  const { asset_id, owner_id, renter_id, started_at, ended_at, comments } =
    req.body;
  const convertedStartedAt = new Date(
    new Date(started_at).getTime() + 10800000
  );
  const convertedEndedAt = new Date(new Date(ended_at).getTime() + 10800000);
  models.Transactions.create({
    asset_id,
    owner_id,
    renter_id,
    started_at: convertedStartedAt,
    ended_at: convertedEndedAt,
    comments,
  })
    .then(() => res.send('Transaction added'))
    .catch((err) => res.status(500).send(err));
});

//PUT request to update transaction
transaction.put('/', validateToken, (req, res) => {
  const { value, field, id } = req.body;
  const updateQuery = {};
  updateQuery[field] = value;
  models.Transactions.update(updateQuery, { where: { id } })
    .then(() => res.send('Transaction updated'))
    .catch((err) => res.status(500).send(err));
});
//GET request for specific transaction
transaction.get('/:id', (req, res) => {
  const { id } = req.params;
  models.Transactions.findOne({ where: { id } })
    .then((data) => {
      if (data === null || data === undefined) {
        return res.status(404).send('Id not found');
      }
      res.send(data);
    })
    .catch((err) => res.status(500).send(err));
});

//GET request to find all transaction for specific user
transaction.get('/user/all', (req, res) => {
  const { searchBy, value } = req.query;
  const searchQuery = {};
  searchQuery[searchBy] = value;
  models.Transactions.findAll({
    where: searchQuery,
    raw: true,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

//DELETE transaction
transaction.delete('/', validateToken, (req, res) => {
  const { id } = req.body;
  models.Transactions.destroy({ where: { id } })
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});
module.exports = transaction;
