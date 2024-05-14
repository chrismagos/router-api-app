const express = require('express');

async function authorizeSpotify(){
    var client_id = '7ad380c0b5d24019be9b86ce237e9388';
    var redirect_uri = 'http://localhost:3000/Spotify';

    app.get('/login', function(req, res) {

        var state = generateRandomString(16);
        var scope = 'user-read-private user-read-email';
      
        res.redirect('https://accounts.spotify.com/authorize?' +
          querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
          }));
      });
}
export default authorizeSpotify;