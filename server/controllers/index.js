/* File: index.js
Name: Calum Bashow
Student ID# 301218933
Date: 20/10/2022
*/

//Decoupled connect
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');


let userModel = require('../models/user');
let User = userModel.Users; //alias


//rendering non contact related pages
module.exports.displayHomePage = (req,res, next) =>{
    res.render('index', {title: 'Home', displayName: req.user? req.user.displayName: ''});
}

module.exports.displayAboutPage = (req,res, next) =>{
    res.render('species', {title: 'Species', displayName: req.user? req.user.displayName: ''});
}

module.exports.displayProjectsPage = (req,res, next) =>{
    res.render('gods', {title: 'Gods', displayName: req.user? req.user.displayName: ''});
}

module.exports.displayServicesPage = (req,res, next) =>{
    res.render('regions', {title: 'Places and Regions', displayName: req.user? req.user.displayName: ''});
}

module.exports.displayContactPage = (req,res, next) =>{
    res.render('contact', {title: 'Contact Me', displayName: req.user? req.user.displayName: ''});
}

module.exports.displayLoginPage = (req, res, next) => {
    // check if user is already logged in
    if(!req.user){
        res.render('auth/login',{
            title: 'Login',
            messages: req.flash('loginMessage'),
            displayName: req.user?displayName: ''
        })
    }else{
        return res.redirect('/business-contacts');
    }
}


module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local',
        (err, user, info) => {
            // server err
            if(err){
                return next(err);
            }

            // is there a user login error
            if(!user){
                req.flash('loginMessage', 'Authentication Error');
                return res.redirect('/login');
            }

            req.login(user, (err) => {
                //server error
                if(err){
                    return next(err);
                }
                return res.redirect('/business-contacts');
            });
        })(req, res, next);
}

module.exports.displayRegisterPage = (req, res, next) =>{
    //check if user is not already logged in
    if(!req.user){
        res.render('auth/register',{
            title : 'Register',
            messages : req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else {
    return res.redirect('/')
    }
}

module.exports.processRegisterPage = (req,res,next) =>{
    //instantiate a user object
    let newUser = new User({
        username: req.body.username,
        email: req.body.email,
        displayName: req.body.displayName
    });
    User.register(newUser, req.body.password, (err)=>{
        if(err){
            console.log("Error inserting new user")
            if(err.name == "UserExistsError"){
                req.flash(
                    'registerMessage',
                    'Registration Error : User Already Exists!'
                );
                console.log('Error: User')
            }
            return res.render('auth/register',{
                title: 'Register',
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName: ''
            });
        }
        else{
            // if no err exists and successful

            // redirect user and authenticate
            return passport.authenticate('local')(req, res, () => {
                res.redirect('/business-contacts')
            });
        }
    })
}

//logs the user out
module.exports.performLogout = (req, res, next) =>{
    req.session.destroy();
    //req.logOut();
    res.redirect('/');
    (next);
}