/* File: business_contacts.js
Name: Calum Bashow
Student ID# 301218933
Date: 20/10/2022
*/

//bringing everything in
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let contactsController = require('../controllers/business_contacts');
let indexController = require('../controllers/index');

function requireAuth(req,res,next)
{
    //check if user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login')
    }
    next();
}

//connect to our model
let Contact = require('../models/business_contacts');

//get route for our business contact list, read operation
let contactController = require('../controllers/business_contacts')

//display contacts list
router.get('/', requireAuth, contactController.displayContactList)

/*Get route for displaying add page - create operation */
router.get('/add', requireAuth, contactController.displayAddPage)

/*Get route for processing add page - create operation */
router.post('/add', requireAuth, contactController.processAddPage)

/*Get route for displaying edit page - update operation */
router.get('/edit/:id', requireAuth, contactController.displayEditPage)

/*Get route for processing edit page - update operation */
router.post('/edit/:id', requireAuth, contactController.processEditPage)

/*Get route for deletion - delete operation */
router.get('/delete/:id', contactController.processDeletePage)


module.exports = router;