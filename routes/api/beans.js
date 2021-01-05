const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Bean = require('../../models/Bean');
const User = require('../../models/User');
const Roaster = require('../../models/Roaster');

const keysFromReq = (req) => {
  return {
    userId: req.body.userId,
    name: req.body.name,
    roaster: req.body.roaster, 
    roast: req.body.roast,
    origin: req.body.origin,
    rating: req.body.rating,
    song: req.body.song,
  }
}

const decomposePayload = (bean) => {
  return {
    userId: bean.userId,
    roaster: bean.roaster,
    roast: bean.roast,
    origin: bean.origin,
    rating: bean.rating,
  }
}

//subroutine for saving a new bean
// const saveBean = (req, roasterId, res) => {
//   console.log(roasterId);
//   const newBean = new Bean(keysFromReq(req, roasterId));
//   newBean.save()
//     .then(bean => {
//       User.findById(bean.userId)
//         .then((user) => {
//           if(!user.roasters.includes(roasterId)){
//             user.roasters.push(roasterId);
//             user.save();
//           }
//         })
//       return res.json(bean)
//     })
//     .catch(err => res.status(404).json(err));
// }

//post new bean
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newBean = new Bean(keysFromReq(req));
    newBean.save()
      .then(bean => {
        console.log(bean);
        console.log(bean.roaster);
        User.findById(bean.userId)
          .then((user) => {
            if(!user.roasters.includes(bean.roaster)){
              user.roasters.push(bean.roaster);
              user.save();
            }
          })
        return res.json(bean)
      })
      .catch(err => res.status(404).json(err));
  }
);


//POST route with roaster id
// router.post(
//   "/",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     Roaster.findOne({name: req.body.roaster})
//       .then(roaster => {
//         if(!roaster){
//           console.log('roaster does not exist');
//           const newRoaster = new Roaster({
//             name: req.body.roaster,
//           });
//           newRoaster.save()
//             .then(roaster => {
//               saveBean(req, roaster._id, res);
//             })
//         } else {
//           // console.log(roaster);
//           saveBean(req, roaster._id, res);
//         }
//       })
//   }
// );

//get user's beans
router.get(
  '/user/:user_id', 
  (req, res) => {
    Bean.find({userId: req.params.user_id})
      .sort({ createdAt: 'desc' })
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

//get by specified filter
router.get(
  '/:filter_type/:filter',
  (req, res) => {
    Bean.find({
      [req.params.filter_type]: req.params.filter
    })
      .then(beans => res.json(beans))
      .catch(err => res.status(404).json(err));
  }
)

//update bean
router.patch(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const filter = { _id: req.body.id };
    const update = req.body;

    Bean.findOneAndUpdate(filter, { $set: update }, { new: true, useFindAndModify: false })
      .then(bean => res.json(bean))
      .catch((err) => {
        console.log(err);
        res.status(422).json(err);
      });
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