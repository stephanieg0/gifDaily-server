'use strict';

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('index');
});

module.exports = app;

