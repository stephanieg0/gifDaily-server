'use strict';

const express   = require('express');
const app       = express();
const bodyParser = require('body-parser');
const pg        = require('pg');
const routes    = require('./routes/index.js');
const db        = require('./models/');
const PORT      = process.env.PORT || 3000;

pg.defaults.ssl = false;//dev should be false. On Heroku should be true.

//enviroment variable set on heroku or use my localhost for dev.
const DATABASE_URL = process.env.DATABASE_URL || 'postgres://localhost:5432/gifdailydb';

const Sequelize = require('sequelize');

//connection to the database
const sequelize = new Sequelize(DATABASE_URL);

db.sequelize.sync({ force: true });

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    // Website allowed to connect
    res.header("Access-Control-Allow-Origin", "http://localhost:8100");
    // Request methods allowed
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    // Request headers allowed
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    next();
});

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use(routes);


app.listen(PORT, function () {
    console.log('Express server listening on port ' + `${PORT}`);
});
