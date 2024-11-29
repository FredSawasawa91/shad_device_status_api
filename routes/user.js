const controller = require('../controller/user');
const router = require('express').Router();

router.post('/register', controller.register); //Create user
router.post('/login', controller.login); //Login user
router.post('/add_user', controller.addUser)


module.exports = router;