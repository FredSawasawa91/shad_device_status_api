const controller = require('../controller/device_status');
const router = require('express').Router();
const auth = require('../middleware/auth');

router.post('/', controller.createStatus); //Create device

router.get('/', auth, controller.getAllStatuses); //Get all device statuses

router.get('/:device_id', auth, controller.getAllDeviceStatuses); //Get device status by id


module.exports = router;