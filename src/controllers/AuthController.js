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
    const { username, password, promoCode } = req.body;

    UserModel.findOne({ username })
        .then(doc => {
            if (doc) throw Error('Username Already Exists');
        })
        .then(() => PromoCodeModel.findOne({ promocode: promoCode, used: false }))
        .then(doc => {
            if (!doc) throw Error('Invalid PromoCode');
            return doc._id;
        })
        .then((id) => {
            bcrypt.hash(password, 10, (err, hashhedpass) => {
                if (err) throw err;
                let user = new UserModel({
                    username: username,
                    password: hashhedpass,
                    points: 10
                })
                user.save()
        .then(() => {
            PromoCodeModel.findOneAndUpdate({ _id: id }, { used: true }, { upsert: true }, function (err, doc) {
                if (err) throw err;
                return res.json({
                    message: 'user added succesfully!'
                })
            });
        })
        .catch(err => {
             throw err;
                })
            });
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