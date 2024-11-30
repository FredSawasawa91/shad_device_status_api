const device_status = require('../model/device_status');
const sender = require('../model/sender');
const sequelize = require('../utils/db');
const { QueryTypes } = require('sequelize');

// Create a new device status
exports.createStatus = (req, res, next) => {
    
    const device_id = req.body.device_id;
    const status = req.body.status;

    device_status.create({
        device_id: device_id,
        status: status,
    }).then(result => {

        // update device(sender) status
        sender.findByPk(device_id).then(sender => {
            if (!sender) {
                return res.status(404).json({ message: 'Sender not found'});
            }
            
            sender.status = status;
    
            return sender.save();
    
        }).then(result => {
            res.status(200).json({message: `Device status recorded`});
        }).catch(err => console.log(err));

        // console.log(`Receiver added successfully`);
        // res.status(201).json({
        //     success: 1,
        //     message: `Receiver added successfully`,
        // });
    }).catch(err => {
        console.log(err);
    });
}

// Get all device statuses
exports.getAllStatuses = (req, res, next) => {
    const user_id = req.id;

    if (!user_id) {
        return res.status(400).json({ error: "User id parameter is missing." });
    }

    let sql = `SELECT device_status.device_id, device_status.status, strftime('%Y-%m-%d %H:%M:%S', device_status.createdAt) AS createdAt, sender.sender_id, receiver.receiver_id FROM device_status
                JOIN sender on device_status.device_id = sender.sender_id
                JOIN receiver on sender.receiver_id = receiver.receiver_id
                JOIN user ON receiver.user_id = user.user_id
                WHERE user.user_id = ${user_id}`;

    sequelize.query(sql, {type: QueryTypes.SELECT}).then( statuses => {
        res.status(200).json({
            success: 1,
            statuses: statuses});
    }).catch(err => console.log(err));
}

// Get a specific device statuses
exports.getAllDeviceStatuses = (req, res, next) => {
    const user_id = req.id;
    const device_id = req.params.device_id;
    console.log(user_id);
    if (!user_id) {
        return res.status(400).json({ error: "User id parameter is missing." });
    }

    let sql = `SELECT device_status.device_id, device_status.status, device_status.status, strftime('%Y-%m-%d %H:%M:%S', device_status.createdAt) AS createdAt, sender.sender_id, receiver.receiver_id FROM device_status
                JOIN sender on device_status.device_id = sender.sender_id
                JOIN receiver on sender.receiver_id = receiver.receiver_id
                JOIN user ON receiver.user_id = user.user_id
                WHERE user.user_id = ${user_id}
                AND sender.sender_id = '${device_id}'`;

    sequelize.query(sql, {type: QueryTypes.SELECT}).then( statuses => {
        res.status(200).json({
            success: 1,
            statuses: statuses});
    }).catch(err => console.log(err));
}