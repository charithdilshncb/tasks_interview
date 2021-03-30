const express = require('express')
const router = express.Router()

const PromoController = require('../controllers/PromoController')

router.get('/generate', PromoController.generatePromoCode);

module.exports = router