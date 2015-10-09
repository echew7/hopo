// Load MongoDB driver
var mongoose = require('mongoose');
 
// Define our location schema
var LocationSchema = new mongoose.Schema({
  lng: Number,
  lat: Number,
  name: String,
  location: String,
  ocean: String,
  videoLink: String,
  description: String,
  userId: String
});
 
// We bind the Location model to the LocationSchema
module.exports = mongoose.model('Location', LocationSchema);
