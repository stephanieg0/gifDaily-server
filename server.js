'use strict';

const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const pg         = require('pg');
const passport   = require('passport');
const flash      = require('connect-flash');
const session    = require('express-session');
const routes     = require('./routes/index.js');
const db         = require('./models/');
const PORT       = process.env.PORT || 3000;

pg.defaults.ssl = false;//dev should be false. On Heroku should be true.

db.sequelize.sync();

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    // Website allowed to connect
    res.header("Access-Control-Allow-Origin", "*");
    // Request methods allowed
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    // Request headers allowed
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    next();
});

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//creating express session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

//for logings
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.listen(PORT, function () {
    console.log('Express server listening on port ' + `${PORT}`);
});
