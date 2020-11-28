const express = require("express");
const router = express.Router();

const User = require('../../models/User');

//form validations 
const validateSignUpInput = require("../../validation/signup");
const validateLoginInput = require("../../validation/login");

//user auth
const bcrypt = require('bcryptjs'); //password hashing
const jwt = require('jsonwebtoken'); //authorize user sessions
const keys = require('../../config/keys'); 
const passport = require('passport'); //passport for auth routes

//sign up route
router.post("/signup", (req, res) => {
  const { errors, isValid } = validateSignUpInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    //Error if email is already being used, else create new user
    if (user) {
      errors.email = "Email is already being used";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        name: req.body.name,
      });

      //hash user password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {

              const payload = {
                id: user.id, 
                email: user.email, 
                name: user.name,
              };
              //create jwt for session
              jwt.sign(
                payload,
                keys.secretOrKey,
                { expiresIn: 36000 }, //token expires in 10 hours
                (err, token) => {
                  res.json({
                    success: true,
                    token: "Bearer " + token,
                    name: user.name,
                    email: user.email,
                  });
                }
              );
            })
            .catch((err) => console.log(err));
        });
      });
    }
  });
});


//login route
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then((user) => {
    if (!user) {
      errors.email = "Account with this email does not exist";
      return res.status(400).json(errors);
    }

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = { 
          name: user.name,
          id: user.id, 
          email: user.email,
        };

        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 36000 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
              name: user.name,
              email: user.email,
            });
          }
        );
      } else {
        errors.password = "Incorrect password";
        return res.status(400).json(errors);
      }
    });
  });
});

//test route for user auth
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  });
})


module.exports = router;