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
require('../lib/local');

//request to giphy's api and caching
app.get('/', cache('5 hours'), (req, res) => {

  request.get(URL, (error, response, body) => {
    if (error) throw error;

    res.send(body);

  });
});

//post request to save a favorite gif
app.post('/', (req, res) => {
  db.Favorites.create({
      Url: req.body.gifUrl,
      UserId: req.body.UserId
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
  db.Users.findOne({
    where: {
      email: req.body.email,
     }
  }).then((user) => {

    if (user) {
      console.log('signup error');
      res.sendStatus(400);
    } else {
      console.log('user does not exists');
      db.Users.create({email: req.body.email, password: db.Users.generateHashPass(req.body.password)});
      res.sendStatus(200);
    };
  });

});

//Authenticating user
app.post('/login', passport.authenticate('local',
    {
      session: false,
      failureFlash: 'Invalid username or password.',
      successFlash: 'Welcome!'
    }), function (req, res) {
        console.log('SUCCESS*****');
        //console.log(req.body);
        res.sendStatus(200);
     });

app.get('/users', (req, res) => {
  db.Users.findAll().then((Users) => {
    console.log(Users);
    res.send(Users);
  });
});

module.exports = app;

