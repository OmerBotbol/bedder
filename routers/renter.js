require('dotenv').config();
const express = require('express');
const renter = express.Router();
const { register, validateToken } = require('../utils');
const models = require('../models');

renter.use(express.json());

//GET request to create new renter
renter.post('/create', (req, res) => {
  const { first_name, last_name, email, purpose, picture, phone_number } =
    req.body;
  register(req, models.Renters).then((newPassword) => {
    if (newPassword === 'Invalid email or password')
      return res.status(401).send('Invalid email or password');
    if (newPassword === 'Email exists')
      return res.status(409).send('Email exists');
    models.Renters.create({
      first_name,
      last_name,
      email,
      password: newPassword,
      purpose,
      picture,
      phone_number,
    }).then((data) => {
      res.status(201).send({ email, isOwner: true, id: data.id });
    });
  });
});

//PUT request to update renter
renter.put('/update/:id', validateToken, (req, res) => {
  const id = req.params.id;
  if (id !== req.data.id)
    return res.status(403).send('only the owner can update assets');
  const { first_name, last_name, email, purpose, picture, phone_number } =
    req.body;
  models.Renters.update(
    { first_name, last_name, email, purpose, picture, phone_number },
    {
      where: { id },
      returning: true,
      plain: true,
    }
  )
    .then(() => res.send('updated successfully'))
    .catch((err) => res.status(500).send(err));
});

//GET request for specific renter
renter.get('/:id', (req, res) => {
  let id = req.params.id;
  models.Renters.findOne({
    where: { id },
    raw: true,
  })
    .then((data) => {
      const dataToSend = {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        purpose: data.purpose,
        picture: data.picture,
        phone_number: data.phone_number,
      };
      res.send(dataToSend);
    })
    .catch((err) => res.status(500).send(err));
});

module.exports = renter;
