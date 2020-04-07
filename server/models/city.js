const mongoose = require('mongoose')
const Schema = mongoose.Schema
const citySchema = new Schema({
  id: {
    type: String,
    require: true
  },
  value: {
    type: Array,
    require: true
  }
},
{
  collection: 'city',
  versionKey: false
})

module.exports = mongoose.model('City', citySchema)
