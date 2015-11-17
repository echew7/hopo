// load packages
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');

// db setup
var PROD_DATABASE_URL = 'mongodb://hopo_aM4SNKWbNjz99kEC:5t8MXTpRc2ghkEYe@ds051933.mongolab.com:51933/hopodb';
var DEV_DATABASE_URL = 'localhost:27017/hopo';
mongoose.connect(PROD_DATABASE_URL); 

// create express app
var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + '/frontend/'));
// Use the passport package in our application
app.use(passport.initialize());

// import routes
var locations = require('./routes/locations');
var users = require('./routes/users');
var authenticate = require('./routes/authenticate')

// Register all our routes with /api
app.use('/api/locations', locations);
app.use('/api/users', users);
app.use('/api/authenticate', authenticate);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500).json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
    error: err
  });
});


module.exports = app;
