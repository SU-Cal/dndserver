/* File: business_contacts.js
Name: Calum Bashow
Student ID# 301218933
Date: 20/10/2022
*/

//decoupling from routes
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');



let Contact = require('../models/business_contacts');

module.exports.displayContactList = ( req, res,next) =>{
    Contact.find((err, contactList) =>{
        if(err){
            return console.error(err)
        }
        else {
            res.render('business_contacts/list',
                {title : "Business Contacts List",
                    ContactList: contactList,
                    displayName: req.user ? req.user.displayName : ''});
        }
    }).sort({name:1})
};

//decoupled add page content
module.exports.displayAddPage = (req, res, next)=>{
    res.render('business_contacts/add', {title : "Business Contacts Add" ,
        displayName: req.user ? req.user.displayName : ''})
}

module.exports.processAddPage = (req, res, next) =>{
    let newContact = Contact({
        "name" : req.body.name,
        "number" : req.body.number,
        "email"  : req.body.email
    });
    Contact.create(newContact, (err, Contact) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/business-contacts');
        }
    });
}

//decoupled edit content
module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Contact.findById(id, (err, contactToEdit) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.render('business_contacts/edit', {title: 'Edit Contact', contact: contactToEdit,
                displayName: req.user ? req.user.displayName : ''})
        }
    });
}

module.exports.processEditPage = (req, res, next) =>{
    let id = req.params.id;

    let updatedContact = Contact({
        "_id" : id,
        "name" : req.body.name,
        "number" : req.body.number,
        "email"  : req.body.email
    });

    Contact.updateOne({_id: id}, updatedContact,(err)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else{
            res.redirect('/business-contacts');
        }
    });
}

//decoupled delete content
module.exports.processDeletePage = (req, res, next) =>{
    let id = req.params.id;

    Contact.remove({_id : id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else{
            res.redirect('/business-contacts');
        }
    });
}

