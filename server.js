'use strict';
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;


app.use(express.static('www'));

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/', (req, res) => {
  res.send('server is running');
});

app.listen(PORT, function () {
    console.log('Express server listening on port ' + `${PORT}`);
});
