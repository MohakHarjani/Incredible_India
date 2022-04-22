const express = require('express')
const router = express.Router();
const catchAsync = require('../utils/catchAsync')
const User = require('../models/user');
const passport = require('passport');

const {registerForm, register, loginForm, login, logout} = require('../controllers/users')

router.route('/register')
    .get(registerForm)
    .post(catchAsync(register))

router.route('/login')
    .get(loginForm)
    .post(passport.authenticate('local', {failureFlash : true, failureRedirect : '/login'}), login)

router.get('/logout', logout)

module.exports = router