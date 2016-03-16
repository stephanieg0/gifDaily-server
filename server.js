'use strict';
const express = require('express');
const app = express();
const routes = require('./routes/index.js');
const PORT = process.env.PORT || 3000;
const pg = require('pg');

pg.defaults.ssl = false;

app.use(express.static('www'));


// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.use(routes);

pg.connect(process.env.DATABASE_URL, function(err, client) {
  if (err) throw err;
  console.log('Connected to postgres! Getting schemas...');

  //client
    //.query('SELECT table_schema,table_name FROM information_schema.tables;')
    //.on('row', function(row) {
      //console.log(JSON.stringify(row));
    //});
});

app.listen(PORT, function () {
    console.log('Express server listening on port ' + `${PORT}`);
});
