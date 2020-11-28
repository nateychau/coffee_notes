const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

const Roaster = require('../../models/Roaster');

//create new roaster
router.post(
  "/",
  (req, res) => {
    const newRoaster = new Roaster({
      name: req.body.name
    });
    newRoaster.save()
      .then(roaster => res.json(roaster))
      .catch(err => res.status(404).json(err));
  }
);

//roaster index
router.get(
  '/',
  (req, res) => {
    Roaster.find({}) 
      .then(roaster => res.json(roaster))
      .catch(err => res.status(404).json(err));
  }
)

//get roaster by id
router.get(
  '/:id',
  (req, res) => {
    Roaster.findById(req.params.id)
      .then(roaster => res.json(roaster))
      .catch(err => res.status(404).json(err));
  }
)

module.exports = router;