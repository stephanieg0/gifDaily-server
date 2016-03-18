'use strict';

const express   = require('express');
const app       = express();
const request   = require('request');
const apicache  = require('apicache').options({ debug: true });
const cache     = apicache.middleware;
const db        = require('../models/');
const URL       = 'http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC';


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
    console.log('FAV>', favorites);
    res.send(favorites);
  });
});

module.exports = app;

