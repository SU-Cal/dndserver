/* File: business_contacts.js
Name: Calum Bashow
Student ID# 301218933
Date: 20/10/2022
*/


let mongoose = require('mongoose');

//create a model class
let businessContactModel = mongoose.Schema({
    name : String,
    number : String,
    email : String

    },
    {
        collection: "businessContacts"
});

module.exports = mongoose.model('Business Contact', businessContactModel)