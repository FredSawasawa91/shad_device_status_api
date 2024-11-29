const receiver = require('../model/receiver');

//GET ALL RECEIVERS
exports.getAllReceivers = (req, res, next) => {

    receiver.findAll({
        where: {
            user_id: req.id
        }
    }).then( receivers => {
        res.status(200).json({
            receivers: receivers
        });
    }).catch(err => console.log(err));
}

//GET RECEIVER BY ID
exports.getReceiverById = (req, res, next) => {
    const id = req.params.id;
    receiver.findOne({
        where: {
            receiver_id: id
        }
    }).then( receiver => {
        res.status(200).json({
            receiver: receiver
        });
    }).catch(err => console.log(err));
}

//CREATE RECEIVER
exports.createReceiver = (req, res, next) => {
    
    const receiver_id = req.body.receiver_id;
    const user_id = req.id;

    receiver.create({
        receiver_id: receiver_id,
        user_id: user_id,
    }).then(result => {
        console.log(`Receiver added successfully`);
        res.status(200).json({
            success: 1,
            message: `Receiver added successfully`,
        });
    }).catch(err => {
        console.log(err);
    });
}

//UPDATE RECEIVER
exports.updateReceiver = (req, res, next) => {
    
    const user_id = req.id;
    const receiver_id = req.params.id
    
    receiver.findByPk(receiver_id).then(receiver => {
        if (!receiver) {
            return res.status(404).json({ message: 'Receiver not found'});
        }
        
        receiver.receiver_id = receiver_id;
        receiver.user_id = user_id;

        return receiver.save();

    }).then(result => {
        res.status(200).json({message: `Receiver updated`});
    }).catch(err => console.log(err));
}

//DELETE RECEIVER
exports.deleteReceiver = (req, res, next) => {
    
    const receiver_id = req.params.id
    
    receiver.findByPk(receiver_id).then(receiver => {
        if (!receiver) {
            return res.status(404).json({ message: 'Receiver not found'});
        }
        
        return receiver.destroy();

    }).then(result => {
        res.status(200).json({message: `Receiver deleted`});
    }).catch(err => console.log(err));
}