require('dotenv').config();
const express = require('express');
const asset = express.Router();
const models = require('../models');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { Op } = require('sequelize');

asset.use(express.json());

asset.post('/create', cookieParser(), (req, res) => {
  const accessToken = req.cookies['accessToken'];
  console.log(accessToken);
  jwt.verify(accessToken, process.env.ACCESS_TOKEN, (err, decoded) => {
    if (err) {
      return res.send('invalid Access Token');
    }
    if (!decoded.isOwner) {
      return res.send('you need to be owner to create asset');
    }
    models.Assets.create(req.body).then(() => {
      res.send('new asset created!');
    });
  });
});

//A GET request that can use for search/specific user/everything
asset.get('/', (req, res) => {
  const searchBy = req.query.searchBy;
  const value = req.query.value;
  const searchQuery = {};
  searchQuery[searchBy] = { [Op.like]: value + '%' };
  console.log(searchQuery);
  models.Assets.findAll({
    where: searchBy && value ? searchQuery : '',
    raw: true,
    // searchBy && value ? searchQuery : ''
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

asset.put('/update/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);
  const {
    city,
    address,
    description,
    number_of_peoples,
    number_of_rooms,
    kosher,
    shabat,
    parking,
    animals,
    ac,
    accessibility,
    babies,
    picture,
    started_at,
    ended_at,
  } = req.body;
  console.log(animals);
  models.Assets.update(
    {
      city,
      address,
      description,
      number_of_peoples,
      number_of_rooms,
      kosher,
      shabat,
      parking,
      animals,
      ac,
      accessibility,
      babies,
      picture,
      started_at,
      ended_at,
    },
    {
      where: { id },
      returning: true,
      plain: true,
    }
  )
    .then(() => res.send('updated successfully'))
    .catch((err) => res.status(500).send(err));
});

module.exports = asset;
