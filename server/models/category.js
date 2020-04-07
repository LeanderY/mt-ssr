const mongoose = require('mongoose')
const Schema = mongoose.Schema
const categorySchema = new Schema({
  city: {
    type: String
  },
  types: {
    type: Array,
    required: true
  },
  areas: {
    type: Array,
    required: true
  }
},
{
  collection: 'category',
  versionKey: false
})

module.exports = mongoose.model('Category', categorySchema)
