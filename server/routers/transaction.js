const express = require('express');
const transaction = express.Router();
const models = require('../models');

//POST request to create new transaction
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
});

//PUT request to update transaction
transaction.put('/', (req, res) => {
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

//GET request to find all transaction for specific owner
transaction.get('/ownerAll/:ownerId', (req, res) => {
  const { ownerId } = req.params;
  console.log('lalala');
  models.Transactions.findAll({
    where: { owner_id: ownerId },
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
transaction.delete('/', (req, res) => {
  const { id } = req.body;
  models.Transactions.destroy({ where: { id } })
    .then((data) => {
      res.sendStatus(410);
    })
    .catch((err) => res.sendStatus(500));
});
module.exports = transaction;
