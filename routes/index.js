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

//request to giphy's api and caching
app.get('/', cache('1 hour'), (req, res, next) => {

  request.get(URL, (error, response, body) => {
    if (error) throw error;

    res.send(JSON.parse(body));

  });
});

//post request to save a favorite gif
app.post('/', (req, res) => {

  console.log(req.body);
  db.Favorites.create({
      Url: req.body.gifUrl
  });

  res.sendStatus(200);
});

//request to display saved gifs
app.get('/favorites', (req, res) => {
  db.Favorites.findAll().then((favorites) => {

    res.send(favorites);
  });
});

//deleting specific gif
app.delete('/favorites/:id', (req, res) => {
  console.log(req.params);
  db.Favorites.destroy({where: {FavoriteId: req.params.id} }).then((numDestroid) => {

    res.sendStatus(200);

  });
});

//creating new user
app.post('/signUp', (req, res) => {
  console.log('signup route', req.body);
  db.Users.findOne({
    where: {
      email: req.body.email,
     }
  }).then((user) => {

    if (user) {
      console.log('user Exists', user);
    } else {
      console.log('user does not exists');
    }
  });
  res.sendStatus(200);

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

