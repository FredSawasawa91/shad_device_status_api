const controller = require('../controller/receiver');
const router = require('express').Router();
const auth = require('../middleware/auth');

router.post('/', auth, controller.createReceiver); //Create device
router.get('/', auth, controller.getAllReceivers) //Get all user devices
router.get('/:id', auth, controller.getReceiverById); //Get device by id
router.patch('/:id', auth, controller.updateReceiver); //Update device
router.delete('/:id', auth, controller.deleteReceiver); //Delete device


module.exports = router;