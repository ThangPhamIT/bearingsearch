'use strict';

var sequelize = require('sequelize');
var database = require('../../config/database');

//================================bearing_type================================
// Define attribute in table bearing_type
var bearingType = database.define('bearing_type', {
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    title: {
        type: sequelize.STRING,
        allowNull: true,
        validate: {
            len: {
                args: [0, 255],
                msg: 'Please enter a title no more than 150 characters.'
            }
        }
    },
    image_name: {
        type: sequelize.STRING,
        allowNull: true,
        validate: {
            len: {
                args: [0, 255],
                msg: 'Please enter a title no more than 150 characters.'
            }
        }
    },
    type: {
        type: sequelize.INTEGER,
        allowNull: false,
        unique: true,
        validate: {
            isInt: true,
            notNull: true,
            notEmpty: true
        }
    }
});

// Synchronize table into database
bearingType.sync().then(function () {
    console.log('Sync table name: ' + bearingType.getTableName());
}).error(function (err) {
    console.log('Sync table name: ' + bearingType.getTableName() + ' error: ' + err)
});

module.exports = bearingType;