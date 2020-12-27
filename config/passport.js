const JwtStrategy = require("passport-jwt").Strategy;
const SpotifyStrategy = require("passport-spotify").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("User");
const keys = require("../config/keys");
const { json } = require("body-parser");

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.secretOrKey;

module.exports = (passport, port) => {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

  passport.use(
    new JwtStrategy(options, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err) => console.log(err));
    })
  );
  passport.use(
    new SpotifyStrategy({
      clientID: keys.spotifyClientID,
      clientSecret: keys.spotifyClientSecret,
      callbackURL: "http://localhost:5000/api/spotify/auth/callback",
    },
    function(accessToken, refreshToken, expires_in, profile, done) {
      process.nextTick(function () {
        console.log(profile);
        return done(null, profile);
      })
    })
  );
};