var express = require('express');
var router = express.Router();
var usercontroller = require('../Controllers/usercontroller.js');
var jwt = require('express-jwt');
var auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
    algorithms: ['HS256']
});

// GET users listing.
router.get('/', usercontroller.GetAllUsers);

//Add a new user
router.post('/add', usercontroller.adduser);

//Login
router.post('/login', usercontroller.Login);


module.exports = router;
