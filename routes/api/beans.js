const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Bean = require('../../models/Bean');

const keysFromReq = (req) => {
  return {
    userId: req.body.userId,
    roaster: req.body.roaster,
    roast: req.body.roast,
    origin: req.body.origin,
    price: req.body.price,
    rating: req.body.rating,
  }
}

const decomposePayload = (bean) => {
  return {
    userId: bean.userId,
    roaster: bean.roaster,
    roast: bean.roast,
    origin: bean.origin,
    price: bean.price,
    rating: bean.rating,
  }
}

//post new bean
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newBean = new Bean(keysFromReq(req));
    newBean.save()
      .then((bean) => res.json(bean));
  }
);

//get user's beans
router.get(
  '/user/:user_id', 
  (req, res) => {
    Bean.find({userId: req.params.user_id})
      .then(beans => res.json(beans))
      .catch(err => res.status(404).json(err));
  }
);

//get bean by id
router.get(
  '/:id', 
  (req, res) => {
    Bean.findById(req.params.id)
      .then(bean => res.json(bean))
      .catch(err => res.status(404).json(err));
  }
);

//update bean
router.patch(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const filter = { _id: req.body.id };
    const update = keysFromReq(req);
    Bean.findOneAndUpdate(filter, update, { new: true })
      .then(bean => res.json(bean))
      .catch(err => res.status(422).json(err));
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Bean.findByIdAndDelete(req.params.id)
      .then(() => res.status(200).json("Bean deleted"))
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;