const mongoose = require('mongoose')
const Schema = mongoose.Schema
const cartSchema = new Schema({
  id: {
    type: String,
    require: true
  },
  detail: {
    type: Array,
    require: true
  },
  cartNo: {
    type: String,
    require: true
  },
  user: {
    type: Object,
    require: true
  },
  time: {
    type: String,
    require: true
  }
},
{
  collection: 'cart',
  versionKey: false
})

module.exports = mongoose.model('Cart', cartSchema)
