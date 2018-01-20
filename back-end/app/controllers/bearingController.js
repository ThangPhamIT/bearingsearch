var bearingTypeModel = require('../models/bearingType');
var bearingModel = require('../models/bearing');
var bearingService = require('../services/bearingService');

var bearingController = {
    getBearingTypes: function (req, res) {
        bearingService.bearingTypes(req, res);
    },

    getBearingDimensions: function (req, res) {
        bearingService.bearingDimensions(req, res);
    },

    getBearings: function (req, res) {
        bearingService.bearings(req, res);
    },

    getMeasurementFilters: function (req, res) {
        bearingService.measurementFilter(req, res);
    }
};

module.exports = bearingController;