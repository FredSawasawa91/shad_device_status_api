const Sequelize = require('sequelize');
const db = require('../utils/db');

const receiver = db.define( 'receiver', {
    receiver_id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'user_id'
        }
    }
},
{
    tableName: 'receiver'
});

module.exports = receiver;