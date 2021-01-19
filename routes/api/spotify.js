const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const axios = require("axios");

const keys = require("../../config/keys");
const User = require('../../models/User');
const SpotifyWebApi = require("spotify-web-api-node");
const { route } = require("./beans");

const scopes = [
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'streaming',
  'user-read-email',
  'user-read-private',
  'user-library-modify',
  'user-library-read',
  'user-top-read',
  'user-read-playback-position',
  'user-read-recently-played',
  'user-follow-read',
  'user-follow-modify'
];

const spotifyApi = new SpotifyWebApi({
  redirectUri: 'http://localhost:5000/api/spotify/callback',
  clientId: keys.spotifyClientID,
  clientSecret: keys.spotifyClientSecret
});

router.get('/login/:user_id', (req, res) => {
  process.env.USER_ID = req.params.user_id;
  res.redirect(spotifyApi.createAuthorizeURL(scopes));
});

router.get('/callback', (req,res) => {
  const error = req.query.error;
  const code = req.query.code;
  const state = req.query.state;

  if(error) {
    console.log('Callback Error: ', error);
    res.send(`Callback Error:  ${error}`);
    return;
  }

  spotifyApi
    .authorizationCodeGrant(code)
    .then(data => {
      const access_token = data.body['access_token'];
      const refresh_token = data.body['refresh_token'];
      const expires_in = data.body['expires_in'];
      process.env.SPOTIFY_ACCESS_TOKEN = access_token;

      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);
      console.log(`Retrieved access token. Expires in ${expires_in}`);
      
      setInterval(async () => {
        const data = await spotifyApi.refreshAccessToken();
        const access_token = data.body['access_token'];
        console.log('access token refreshed');
        spotifyApi.setAccessToken(access_token);
      }, expires_in / 2 * 1000);

    }).then(() => {
      const filter = { _id: process.env.USER_ID};
      const accessToken = { accessToken: process.env.SPOTIFY_ACCESS_TOKEN };
      User.findOneAndUpdate(filter, { $set: accessToken}, { new: true, useFindAndModify: false })
      .then(user => {
        console.log('updated user');
        console.log(user);
      })
      .catch(err=> {
        console.log('error updating user')
        console.log(err);
      });
    })
    .catch(error => {
      console.log('error getting tokens: ', error);
      res.send(`error getting tokens: ${error}`);
    });
    res.redirect('http://localhost:3000/#/settings');
  });

router.get('/getMe', (req,res) => {
  spotifyApi.setAccessToken(process.env.SPOTIFY_ACCESS_TOKEN);
  spotifyApi.getMe()
  .then((user) => {
    return res.json(user.body);
  })
  .catch(err => { 
    // console.log(err);
    return res.status(401).json(err);
  });
});

router.get('/search/songs/:id', (req,res) => {
  const song = (req.params.id);
  spotifyApi.setAccessToken(process.env.SPOTIFY_ACCESS_TOKEN);
  spotifyApi.searchTracks(song)
  .then(function(data) {
    console.log(`Search by ${song}`, data.body);
    return res.json(data.body);
  })
  .catch(err => { console.log(err)});
})

// router.post('/connect/song', (req,res) => {
//   const 
// })

module.exports = router;