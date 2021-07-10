require('dotenv').config();
const express = require('express');
const owner = express.Router();
const { register, validateToken } = require('../utils');
const models = require('../models');

owner.use(express.json());

//POST request to create new owner
owner.post('/create', (req, res) => {
  const { first_name, last_name, email, picture, phone_number } = req.body;
  register(req, models.Owners).then((newPassword) => {
    if (newPassword === 'Invalid email or password')
      return res.status(403).send('Invalid email or password');
    if (newPassword === 'Email exists')
      return res.status(409).send('Email exists');
    models.Owners.create({
      first_name,
      last_name,
      email,
      password: newPassword,
      picture,
      phone_number,
    })
      .then((data) => {
        res.status(201).send({ email, isOwner: true, id: data.id });
      })
      .catch((err) => console.log(err));
  });
});

//PUT request to update owner
owner.put('/update/:id', validateToken, (req, res) => {
  const id = req.params.id;
  if (id !== req.data.id)
    return res.status(403).send('only the owner can update assets');
  const { first_name, last_name, email, picture, phone_number } = req.body;
  models.Owners.update(
    { first_name, last_name, email, picture, phone_number },
    {
      where: { id },
      returning: true,
      plain: true,
    }
  )
    .then(() => res.send('updated successfully'))
    .catch((err) => res.status(500).send(err));
});

//GET request for specific owner
owner.get('/:id', (req, res) => {
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
