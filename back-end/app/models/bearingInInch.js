'use strict';

var sequelize = require('sequelize');
var database = require('../../config/database');

//================================bearingininch================================
// Define attributes in view bearingininch
var bearingInInch = database.define('bearingininch', {
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    d: {
        type: sequelize.FLOAT(10, 3),
        allowNull: true
    },
    D: {
        type: sequelize.FLOAT(10, 3),
        allowNull: true
    },
    B: {
        type: sequelize.FLOAT(10, 3),
        allowNull: true
    },
    C: {
        type: sequelize.FLOAT(10, 3),
        allowNull: true
    },
    T: {
        type: sequelize.FLOAT(10, 3),
        allowNull: true
    },
    kg: {
        type: sequelize.FLOAT(10, 3),
        allowNull: true
    },
    reference: {
        type: sequelize.STRING,
        allowNull: true
    },
    part_number: {
        type: sequelize.STRING,
        allowNull: false
    },
    brands: {
        type: sequelize.STRING,
        allowNull: true
    },
    bearing_type: {
        type: sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = bearingInInch;