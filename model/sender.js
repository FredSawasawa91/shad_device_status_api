const Sequelize = require('sequelize');
const db = require('../utils/db');

const sender = db.define( 'sender', {
    sender_id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    },
    receiver_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
            model:'receiver',
            key: 'receiver_id'
        }
    },
    status: {
        type: Sequelize.ENUM('on', 'off'),
        defaultValue: 'off',
        allowNull: false
    }
},
{
    tableName: 'sender'
});

module.exports = sender;