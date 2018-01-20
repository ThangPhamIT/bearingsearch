'use strict';

var sequelize = require('sequelize');
var measurementInInch = require('../models/bearingInInch');
var measurementInMilimeter = require('../models/bearingInMilimeter');
var bearingTypeModel = require('../models/bearingType');

var bearingService = {
    // GET /bearingTypes
    bearingTypes: function (req, res) {
        bearingTypeModel.findAll().then(function (data) {
            res.status(200).json(data);
        }).error(function (err) {
            res.status(500).json({
                error: err
            });
        });
    },

    // GET /bearingDimensions/:typeId/unit/:unitId
    bearingDimensions: function (req, res) {
        let typeId = req.params.typeId;
        let unitId = req.params.unitId;
        // dimension == 1: milimeter
        let viewMeasurement = measurementInMilimeter;
        //dimension == 0: inch
        if (unitId == 0) {
            viewMeasurement = measurementInInch;
        }
        viewMeasurement.findAll({
            attributes: [
                [sequelize.literal('DISTINCT "d"'), "d"],
                [sequelize.literal('"D"'), "D"],
                [sequelize.literal('"B"'), "B"]
            ],
            where: {
                bearing_type: typeId
            }
        }).then(function (data) {
            res.status(200).json(data);
        }).error(function (err) {
            res.status(500).json({
                error: err
            });
        });
    },

    // GET /bearings?bearing_type={typeId}&unit={unitId}&d={d}&D={D}&B={B}
    bearings: function (req, res) {
        let typeId = req.query.bearing_type;
        let unitId = req.query.unit;
        let d = req.query.d;
        let D = req.query.D;
        let B = req.query.B;

        // dimension == 1: milimeter
        let viewMeasurement = measurementInMilimeter;
        // dimension == 0: inch
        if (unitId == 0) {
            viewMeasurement = measurementInInch;
        }
        // create where sentence
        let filterData = {
            bearing_type: typeId
        };

        if (d != undefined && d != null) {
            filterData.d = d;
        }
        if (D != undefined && D != null) {
            filterData.D = D;
        }
        if (B != undefined && B != null) {
            filterData.B = B;
        }
        viewMeasurement.findAll({
            where: filterData
        }).then(function (data) {
            res.status(200).json(data);
        }).error(function (err) {
            res.status(500).json({
                error: err
            });
        });
    },

    // GET /measurementFilter?bearing_type={typeId}&unit={unitId}&d={d}&D={D}&B={B}
    measurementFilter: function (req, res) {
        let typeId = req.query.bearing_type;
        let unitId = req.query.unit;
        let d = req.query.d;
        let D = req.query.D;
        let B = req.query.B;
        // dimension == 1: milimeter
        let viewMeasurement = measurementInMilimeter;
        //dimension == 0: inch
        if (unitId == 0) {
            viewMeasurement = measurementInInch;
        }
        let filterData = {
            bearing_type: typeId
        };
        // create where sentence
        if (d != undefined && d != null) {
            filterData.d = d;
        }
        if (D != undefined && D != null) {
            filterData.D = D;
        }
        if (B != undefined && B != null) {
            filterData.B = B;
        }
        viewMeasurement.findAll({
            attributes: [
                [sequelize.literal('DISTINCT "d"'), "d"],
                [sequelize.literal('"D"'), "D"],
                [sequelize.literal('"B"'), "B"]
            ],
            where: filterData
        }).then(function (data) {
            res.status(200).json(data);
        }).error(function (err) {
            res.status(500).json({
                error: err
            });
        });
    }
}

module.exports = bearingService;