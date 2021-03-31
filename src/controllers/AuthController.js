const UserModel = require('../models/User');
const PromoCodeModel = require('../models/PromoCode');

const bcrypt = require('bcryptjs')

const signup = (req, res, next) => {
    const { username, password } = req.body;

    UserModel.findOne({ username: username })
        .then(doc => {
            if (doc) throw Error('Username Already Exists');
        })
        .then(() => bcrypt.hash(password, 10))
        .then(hashhedpass => {
            let user = new UserModel({
                username: username,
                password: hashhedpass,
                points: 0
            })
            return user.save()
        })
        .then(() => {
            return res.json({
                message: 'user added succesfully!'
            })
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            })
        });
}

const signupwithpromo = (req, res, next) => {
    const { username, password, promocode } = req.body;

    let promoId;
    UserModel.findOne({ username })
        .then(doc => {
            if (doc) throw Error('Username Already Exists');
            return PromoCodeModel.findOne({ promocode, used: false })
        })
        .then(doc => {
            if (!doc) throw Error('Invalid PromoCode');
            promoId = doc._id;
        })
        .then(() =>  bcrypt.hash(password, 10))
        .then(hashhedpass => {
            let user = new UserModel({
                username: username,
                password: hashhedpass,
                points: 10
            })
           return user.save()
        })
        .then(() => PromoCodeModel.findOneAndUpdate({ _id: promoId }, { used: true }, { upsert: true }))
        .then(() =>{
            return res.json({
                message: 'user added succesfully!'
            })
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            })
        });
}

module.exports = {
    signup, signupwithpromo
}