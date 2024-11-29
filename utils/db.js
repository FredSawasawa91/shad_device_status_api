const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB_STORAGE || './db.sqlite', // Path to the SQLite file
    define: {
        timestamps: false, // Disable automatic timestamp columns
    }
});

module.exports = sequelize;










// const { Sequelize } = require('sequelize');
// require('dotenv').config();

// const sequelize = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER, 
//     process.env.DB_PASS, {
//        dialect: 'mysql',
//        host: process.env.DB_HOST,
//        define: {
//         timestamps: false
//        }
// })

// module.exports = sequelize;