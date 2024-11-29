const Sequelize = require('sequelize');
const db = require('../utils/db');

const device_status = db.define( 'device_status', {
    status_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    device_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
            model:'sender',
            key: 'sender_id'
        }
    },
    status: {
        type: Sequelize.ENUM('on', 'off'),
        defaultValue: 'off',
        allowNull: false
    }
},
{
    tableName: 'device_status',
    timestamps: true
});

module.exports = device_status;