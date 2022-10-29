/* File: users.js
Name: Calum Bashow
Student ID# 301218933
Date: 20/10/2022
*/


let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('We are working on this right now');
});

module.exports = router;
