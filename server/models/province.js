const mongoose = require('mongoose')
const Schema = mongoose.Schema
const provinceSchema = new Schema({
  id: {
    type: String,
    require: true
  },
  value: {
    type: String,
    require: true
  }
},
{
  collection: 'province',
  versionKey: false
})

module.exports = mongoose.model('Province', provinceSchema)
