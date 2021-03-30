const PromoCodeModel = require('../models/PromoCode');
const PromoGenerator = require('@sash/promo.generator');
const generateUniqueId = require('generate-unique-id');
const { ConnectionStates } = require('mongoose');


const generatePromoCode = (req, res, next) => {
    const uniqueid = generateUniqueId({
        length: 6,
        useLetters: false
    });
    const cr = new PromoGenerator.PromoGenerator('AAA999', uniqueid);
    const promocode = cr.next();

    const newPromoCode = new PromoCodeModel({
        promocode: promocode
    })
    newPromoCode.save()

    return res.json({
        message: 'PromoCode Generate Successfully',
        promocode: promocode
    })
}

module.exports = {
    generatePromoCode
}