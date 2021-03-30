const express = require('express')
const router = express.Router()

const AuthController = require('../controllers/AuthController')

router.post('/signup', AuthController.signup);
router.post('/signupwithpromo', AuthController.signupwithpromo);

module.exports = router