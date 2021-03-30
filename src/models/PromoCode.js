const mongoose = require('mongoose')
const Schema = mongoose.Schema

const promocodeSchema = new Schema({
  promocode: {
    type: String,
    required: true,
  },
  used: {
    type: Boolean,
    default: false
  }
})

const Promocode = mongoose.model('promocode', promocodeSchema)
module.exports = Promocode