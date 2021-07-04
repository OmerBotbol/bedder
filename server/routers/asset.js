require('dotenv').config();
const express = require('express');
const asset = express.Router();
const models = require('../models');
const { Op } = require('sequelize');
const { validateToken } = require('../utils');

asset.use(express.json());

asset.post('/create', validateToken, (req, res) => {
  const { data } = req;
  if (!data.isOwner)
    return res.status(403).send('only owners can create assets');
  models.Assets.create(req.body).then(() => {
    res.send('new asset created!');
  });
});

asset.get('/:id', (req, res) => {
  const { id } = req.params;
  models.Assets.findOne({ where: { id: id }, raw: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

//A GET request that can use for search/specific user/everything
asset.get('/', async (req, res) => {
  const startDate = new Date(req.query.startDate);
  const stopDate = new Date(req.query.stopDate);
  const city = req.query.city;
  const owner_id = req.query.owner_id;
  let searchQuery = {
    [Op.and]: [
      { city: { [Op.like]: '%' + city + '%' } },
      { started_at: { [Op.lte]: startDate } },
      { ended_at: { [Op.gte]: stopDate } },
    ],
  };
  if (owner_id) {
    searchQuery = { owner_id };
  }
  try {
    const assets = await models.Assets.findAll({
      where: searchQuery,
      raw: true,
    });
    if (owner_id) {
      return res.send(assets);
    }

    const filteredAssets = await assets.reduce(async (filtered, asset) => {
      const unavailableDatesInAsset = await Promise.resolve(
        models.Unavailable_Dates.findAll({
          where: {
            [Op.and]: [
              { asset_id: asset.id },
              { date: { [Op.between]: [startDate, stopDate] } },
            ],
          },
          raw: true,
        })
      );
      const previous = await filtered;
      if (unavailableDatesInAsset.length === 0) {
        previous.push(asset);
      }
      return previous;
    }, Promise.resolve([]));

    res.send(filteredAssets);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

//PUT request to update asset
asset.put('/update/:id', validateToken, (req, res) => {
  const id = req.params.id;
  const { ownerId } = req.body;
  if (ownerId !== req.data.id)
    return res.status(403).send('only the owner can update assets');
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

//POST request to add unavailable dates
asset.post('/addUnavailableDates', validateToken, (req, res) => {
  const { ownerId, asset_id, startedAt, endedAt } = req.body;
  if (ownerId !== req.data.id)
    return res.status(403).send('only the owner can update assets');
  let date = new Date(new Date(startedAt).getTime() + 10800000);
  let endDate = new Date(new Date(endedAt).getTime() + 10800000);
  const dateArr = [];
  while (date <= endDate) {
    const newDate = { date: new Date(date), asset_id };
    dateArr.push(newDate);
    date = new Date(date.getTime() + 86400000);
  }
  models.Unavailable_Dates.bulkCreate(dateArr)
    .then(() => {
      res.send(dateArr);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

asset.delete('/deleteUnavailableDates', validateToken, (req, res) => {
  const { ownerId, asset_id, startedAt, endedAt } = req.body;
  if (ownerId !== req.data.id)
    return res.status(403).send('only the owner can update assets');
  const date = new Date(new Date(startedAt));
  const endDate = new Date(new Date(endedAt));
  models.Unavailable_Dates.destroy({
    where: {
      [Op.and]: [{ date: { [Op.between]: [date, endDate] } }, { asset_id }],
    },
  })
    .then(() => {
      res.send('deleted');
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

asset.get('/unavailableDates/:assetId', (req, res) => {
  const { assetId } = req.params;
  models.Unavailable_Dates.findAll({
    where: { asset_id: assetId },
    raw: true,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

module.exports = asset;
