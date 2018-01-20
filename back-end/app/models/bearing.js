'use strict';

var sequelize = require('sequelize');
var database = require('../../config/database');
var bearingType = require('../models/bearingType');

//================================bearing================================
// define attribute in table bearing
var bearing = database.define('bearing', {
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
        type: sequelize.INTEGER,
        allowNull: false
    },
    brands: {
        type: sequelize.STRING,
        allowNull: true
    },
    bearing_type: {
        type: sequelize.INTEGER,
        allowNull: false,
        // references: {
        //     // This is a reference to another model
        //     model: bearingType,
        //     // This is the column name of the referenced model
        //     key: 'type',
        //     // This declares when to check the foreign key constraint. PostgreSQL only.
        //     deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE
        // }
    }
});

// sync table into database
bearing.sync().then(function () {
    console.log('Sync table name: ' + bearing.getTableName());
}).error(function (err) {
    console.log('Sync table name: ' + bearing.getTableName() + ' error: ' + err)
});

module.exports = bearing;