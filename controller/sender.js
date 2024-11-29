const sender = require('../model/sender');
const sequelize = require('../utils/db');
const { QueryTypes } = require('sequelize');

// Get All Senders
exports.getAllSenders = (req, res, next) => {
    const user_id = req.id;

    if (!user_id) {
        return res.status(400).json({ error: "User id parameter is missing." });
    }

    let sql = `SELECT sender.sender_id, sender.status, receiver.receiver_id FROM sender 
                JOIN receiver on sender.receiver_id = receiver.receiver_id 
                WHERE receiver.user_id = ${user_id}`;

    sequelize.query(sql, {type: QueryTypes.SELECT}).then( senders => {
        res.status(200).json({
            success: 1,
            senders: senders});
    }).catch(err => console.log(err));
}

//GET ALL Sebser
exports.getAllSendersByReceiver = (req, res, next) => {

    sender.findAll({
        where: {
            receiver_id: req.body.receiver_id
        }
    }).then( senders => {
        res.status(200).json({
            senders: senders
        });
    }).catch(err => console.log(err));
}

//GET SENDER BY ID
exports.getSenderById = (req, res, next) => {
    const id = req.params.id;
    sender.findOne({
        where: {
            sender_id: id
        }
    }).then( sender => {
        res.status(200).json({
            sender: sender
        });
    }).catch(err => console.log(err));
}

//get senders by receiver_id
exports.getSendersByReceiverId = (req, res, next) => {

    const receiver_id = req.params.id;

    sender.findAll({
        where: {
            receiver_id: receiver_id
        }
    }).then(senders => {
        res.status(200).json({
            senders: senders
        });
    }).catch(err => console.log(err));
}

//CREATE SENDER
exports.createSender = (req, res, next) => {
    const sender_id = req.body.sender_id;
    const receiver_id = req.body.receiver_id;

    sender.create({
        sender_id: sender_id,
        receiver_id: receiver_id,
    })
    .then(result => {
        console.log(`Sender added successfully`, result.dataValues);
        res.status(201).json({ // Use 201 for resource creation
            success: 1,
            sender: result.dataValues,
            message: "Sender added successfully",
        });
    })
    .catch(err => {
        console.error("Error creating sender:", err);
        res.status(500).json({ // Send proper error response
            success: 0,
            message: "Failed to create sender",
            error: err.message || "Unknown error",
        });
    });
};


//UPDATE Sender
exports.updateSender = (req, res, next) => {
    
    const sender_id = req.body.sender_id;
    const receiver_id = req.params.id
    
    sender.findByPk(sender_id).then(sender => {
        if (!sender) {
            return res.status(404).json({ message: 'Sender not found'});
        }
        
        sender.sender_id = sender_id;
        sender.receiver_id = receiver_id;

        return sender.save();

    }).then(result => {
        res.status(200).json({message: `Sender updated`});
    }).catch(err => console.log(err));
}

// CHANGE/UPDATE SENDER STATUS
exports.changeSenderStatus = (req, res, next) => {
    
    const sender_id = req.body.sender_id;
    const status = req.body.status;
    
    sender.findByPk(sender_id).then(sender => {
        if (!sender) {
            return res.status(404).json({ message: 'Sender not found'});
        }
        
        sender.status = status;

        return sender.save();

    }).then(result => {
        res.status(200).json({message: `Sender status updated`});
    }).catch(err => console.log(err));
}

// DELETE SENDER
exports.deleteSender = (req, res, next) => {
    const id = req.params.id;
    sender.destroy({
        where: {
            sender_id: id
        }
    }).then(result => {
        if(result == 1){
            res.status(200).json({message: `Sender deleted successfully`});
        } else {
            res.status(404).json({message: `Sender not found`});
        }
    }).catch(err => console.log(err));
}