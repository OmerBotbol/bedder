require("dotenv").config();
const express = require("express");
const asset = express.Router();
const models = require("../models");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

asset.use(express.json());

asset.post("/create", (req, res) => {
  models.Assets.create(req.body).then(() => {
    res.send("new asset created!");
  });
});

//A GET request that can use for search/specific user/everything
asset.get("/", (req, res) => {
  const startDate = new Date(req.query.startDate);
  const stopDate = new Date(req.query.stopDate);
  const city = req.query.city;
  const owner_id = req.query.owner_id;
  let searchQuery = {
    [Op.and]: [
      { city: { [Op.like]: city + "%" } },
      { started_at: { [Op.lte]: startDate } },
      { ended_at: { [Op.gte]: stopDate } },
    ],
  };
  if (owner_id) {
    searchQuery = { owner_id };
  }
  models.Assets.findAll({
    where: searchQuery,
    raw: true,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

//PUT request to update asset
asset.put("/update/:id", (req, res) => {
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
    .then(() => res.send("updated successfully"))
    .catch((err) => res.status(500).send(err));
});

//POST request to add unavailable dates
asset.post("/addUnavailableDates", (req, res) => {
  models.Unavailable_Dates.create(req.body)
    .then(() => {
      res.send("New unavailable date created!");
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
});

asset.get("/unavailableDates", (req, res) => {
  const { assetId } = req.query;
  console.log(assetId);
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
