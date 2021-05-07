const express = require('express');

const router = express.Router();

const controllers = require('../controllers/users');

const authenticate = require('../middleware/authenticate')

router.post('/login', controllers.loginController);

router.post('/registration', controllers.registerController);

router.get('/', authenticate, controllers.getAllUsersController)


module.exports = router;

