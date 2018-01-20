var express = require('express');
var bodyParser = require('body-parser');

module.exports = function (app) {
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    // parse application/json
    app.use(bodyParser.json());

    // set folder public
    app.use(express.static('public'));
    app.use('/components', express.static('bower_components'));
};