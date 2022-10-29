/* File: App.js
Name: Calum Bashow
Student ID# 301218933
Date: 20/10/2022
*/

let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

//modules for authenticaion
let session = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');

//mongo setup

let mongoose = require('mongoose');
let DB = require('./db');

//point mongoose to the DB URI
mongoose.connect(DB.URI, /*{useNewUrlParse : true, useUnifiedTopology: true }*/);

let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
mongoDB.once('open',()=>{
  console.log('Connected to MongoDB!');
})

let indexRouter = require('../routes');
let usersRouter = require('../routes/users');
let businessContactsRouter = require('../routes/business_contacts');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

//setup express session
app.use(session({
  secret: "SomeSecret",
  saveUninitialized: false,
  resave: false
}));

// flash initialize
app.use(flash());

//initialize passport
app.use(passport.initialize());
app.use(passport.session());


//setup user configuration passport

//create user model instance
let userModel = require('../models/user');
//If non-functional change .Users to .User
let User = userModel.Users;

// implement user auth strategy
passport.use(User.createStrategy());

//serialize and deserialize Userinfo
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/business-contacts', businessContactsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title:'Error'});
});

module.exports = app;
