const controller = require('../controller/sender');
const router = require('express').Router();
const auth = require('../middleware/auth');

router.post('/', auth, controller.createSender); //Create device
//router.get('/receiver/:id', auth, controller.getAllSendersByReceiver)
router.get('/', auth, controller.getAllSenders) //Get all user devices
router.get('/:id', auth, controller.getSenderById); //Get device by id
router.get('/receiver/:id', auth, controller.getSendersByReceiverId);
router.patch('/:id', auth, controller.updateSender); //Update device
router.delete('/:id', auth, controller.deleteSender); //Delete device


module.exports = router;