const express = require('express');
const router = express.Router();
const controller=require('./controller')

router
.route('/User')
.post(controller.createUser)
.delete();

router
.route('/login')
.post(controller.loginUser);

router
.route('/forgot-password')
.post(controller.ForgotPassword)
.patch(controller.confirmPassword)

module.exports =router;
// dont forget to clear window.location storage
//  localStorage.clear();