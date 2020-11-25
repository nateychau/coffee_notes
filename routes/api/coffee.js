const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Coffee = require('../../models/Coffee');
const validateCoffeeInput = require('../../validation/coffee_note');

const keysFromReq = (req) => {
  return {
    userId: req.body.userId,
    brand: req.body.brand,
    roast: req.body.roast,
    origin: req.body.origin,
    notes: req.body.notes,
    song: req.body.song,
    date: req.body.date,
    brewMethod: req.body.brewMethod,
    ratio: req.body.ratio,
    time: req.body.time, 
  }
}

const decomposePayload = (coffee) => {
  return {
    id: coffee._id,
    userId: coffee.userId,
    brand: coffee.brand,
    roast: coffee.roast,
    origin: coffee.origin,
    notes: coffee.notes,
    song: coffee.song,
    date: coffee.date,
    brewMethod: coffee.brewMethod,
    ratio: coffee.ratio,
    time: coffee.time, 
  }
}

//post new coffee
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCoffeeInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newCoffee = new Coffee(keysFromReq(req));
    newCoffee.save()
      .then((coffee) => res.json(coffee));
  }
);

//get user's coffees
router.get(
  '/user/:user_id', 
  (req, res) => {
    Coffee.find({userId: req.params.user_id})
      .then(coffees => res.json(coffees))
      .catch(err => res.status(404).json(err));
  }
);

//get coffee by id
router.get(
  '/:id', 
  (req, res) => {
    Coffee.findById(req.params.id)
      .then(coffee => res.json(coffee))
      .catch(err => res.status(404).json(err));
  }
);

//update coffee
router.patch(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const filter = { _id: req.body.id };
    const update = keysFromReq(req);
    Coffee.findOneAndUpdate(filter, update, { new: true })
      .then(coffee => res.json(coffee))
      .catch(err => res.status(422).json(err));
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Coffee.findByIdAndDelete(req.params.id)
      .then(() => res.status(200).json("Coffee deleted"))
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;