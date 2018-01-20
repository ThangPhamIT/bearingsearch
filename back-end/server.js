var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors());

var port = process.env.PORT || 8082;
// Configuration
require('./config/index')(app);

app.all('/*', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin: *');
    res.setHeader('Access-Control-Allow-Credentials: true');
    res.setHeader('Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers: accept, content-type, x-xsrf-token, x-csrf-token, authorization');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

// Create port listener
app.listen(port, function () {
    console.log('Bearing Search application was running on port: ' + port);
});