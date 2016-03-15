'use strict';

const express   = require('express');
const app       = express();
const request   = require('request');
const apicache  = require('apicache').options({ debug: true });
const cache     = apicache.middleware;

const URL       = 'http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC';


app.get('/', cache('1 hour'), (req, res, next) => {

  request.get(URL, (error, response, body) => {
    if (error) throw error;

    res.send(JSON.parse(body));

  });
});


module.exports = app;

