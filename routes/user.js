const express = require('express');
const router = express.Router()
const path = require('path')
const passport = require('passport')
const userController = require('../controllers/user')

router.get('/login', userController.loginUser)

//router.post('/login', userController.postLogin)
router.post('/login', passport.authenticate('local', {
    successRedirect:'/',
    failureRedirect:'/login'
}))

router.get('/register', userController.registerUser)

router.post('/register', userController.postRegister)

router.get('/logout', userController.userlogout)

module.exports = router
