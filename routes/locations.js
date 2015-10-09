var express = require('express');
var router = express.Router();

var locationController = require('../controllers/location');
var authController = require('../controllers/auth');

// Create endpoint handlers for /locations
router.route('/')
  .post(authController.isAuthenticated, locationController.postLocations)
  .get(locationController.getLocations);
 
// Create endpoint handlers for /locations/:Location_id
router.route('/:location_id')
  .get(authController.isAuthenticated, locationController.getLocation)
  .put(authController.isAuthenticated, locationController.putLocation)
  .delete(authController.isAuthenticated, locationController.deleteLocation);

module.exports = router;