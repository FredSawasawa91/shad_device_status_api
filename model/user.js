const Sequelize = require('sequelize');
const db = require('../utils/db');

const user = db.define( 'user', {
    user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    pin: {
        type: Sequelize.STRING,
        allowNull: false
    },
    role: {
        type: Sequelize.ENUM('admin', 'customer'),
        defaultValue: 'admin',
        allowNull: false
    }
},
{
    tableName: 'user'
});

module.exports = user;