//==============================SEQUELIZE==============================
const sequelize = require('sequelize');
const config = new sequelize({
    database: 'BearingSearch',
    username: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    dialectOptions: {
        ssl: false
    },
    // pool configuration used to pool database connections
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        underscored: false,
        freezeTableName: true, // false: -> have 's' after table name
        charset: 'utf8',
        timestamps: true,
        createdAt: false,
        updatedAt: false
    },
    // similar for sync: you can define this to always force sync for models
    sync: {
        force: true // Force sync all models
    }
});

// check connection string
config.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = config;