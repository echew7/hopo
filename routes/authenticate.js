var express = require('express');
var router = express.Router();

var userController = require('../controllers/user');

// Create endpoint handlers for /authenticate
router.route('/authenticate')
  .post(userController.authenticateUser);

module.exports = router;