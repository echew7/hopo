var express = require('express');
var router = express.Router();

var userController = require('../controllers/user');

// Create endpoint handlers for /authenticate
router.route('/')
  .post(userController.authenticateUser);

//router.route('/').post(passport.authenticate('basic'));

module.exports = router;
