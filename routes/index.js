'use strict';

const express   = require('express');
const app       = express();
const passport = require('passport');
const request   = require('request');
const apicache  = require('apicache').options({ debug: true });
const cache     = apicache.middleware;
const db        = require('../models/');
const URL       = 'http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC';

//passport auth strategy
require('../lib/localStrategy');

app.get('/', cache('1 hour'), (req, res, next) => {

  request.get(URL, (error, response, body) => {
    if (error) throw error;

    res.send(JSON.parse(body));

  });
});

//post from front end
app.post('/', (req, res) => {

  console.log(req.body);
  db.Favorites.create({
      Url: req.body.gifUrl
  });

  res.sendStatus(200);
});

app.get('/favorites', (req, res) => {
  db.Favorites.findAll().then((favorites) => {

    res.send(favorites);
  });
});

app.delete('/favorites/:id', (req, res) => {
  console.log(req.params);
  db.Favorites.destroy({where: {FavoriteId: req.params.id} }).then((numDestroid) => {

    res.sendStatus(200);

  });
});

app.post('/signUp', (req, res) => {
});

app.post('/login', (req, res) => {
  console.log(req.body);
  passport.authenticate('local', {failureFlash: 'Invalid username or password.',
                                  successFlash: 'Welcome!'}),
    function(req, res) {
      console.log('success!');
      res.sendStatus(200);
    };
});


module.exports = app;

