'use strict';

const express   = require('express');
const app       = express();

const pg        = require('pg');
pg.defaults.ssl = false;

const Sequelize = require('sequelize');

const routes    = require('./routes/index.js');

const PORT      = process.env.PORT || 3000;

//enviroment variable set on heroku or use my localhost for dev.
const DATABASE_URL = process.env.DATABASE_URL || 'postgres://localhost:5432/gifdailydb';

const sequelize = new Sequelize(DATABASE_URL);


app.use(express.static('www'));

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.use(routes);

//connecting to postgres database
pg.connect(DATABASE_URL, function(err, client) {
  if (err) throw err;
  console.log('Connected to postgres! Getting schemas...');

});

app.listen(PORT, function () {
    console.log('Express server listening on port ' + `${PORT}`);
});
