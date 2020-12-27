const express = require("express");
const router = express.Router();
const SpotifyWebApi = require("spotify-web-api-node");
const keys = require("../../config/keys");

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

router.get('/login', (req, res) => {
  console.log('login router');
  res.redirect(spotifyApi.createAuthorizeURL(scopes));
  console.log(spotifyApi.createAuthorizeURL(scopes));
});

router.get('/callback', (req,res) =>{

  console.log('triggered callback');

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

      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);
      console.log(`Retrieved access token. Expires in ${expires_in}`);
      
      setInterval(async () => {
        const data = await spotifyApi.refreshAccessToken();
        const access_token = data.body['access_token'];
        
        console.log('access token refreshed');
        spotifyApi.setAccessToken(access_token);
      }, expires_in / 2 * 1000);
    })
    .catch(error => {
      console.log('error getting tokens: ', error);
      res.send(`error getting tokens: ${error}`);
    });

    res.redirect('http://localhost:3000/#/settings');

  });

module.exports = router;