const mongoose = require('mongoose')
const Schema = mongoose.Schema
const orderSchema = new Schema({
  id: {
    type: String,
    require: true
  },
  user: {
    type: String,
    require: true
  },
  time: {
    type: String,
    require: true
  },
  details: [
    {
      count: {
        type: Number,
        require: true
      },
      img: {
        type: String,
        require: true
      },
      name: {
        type: String,
        require: true
      },
      price: {
        type: Number
      }
    }
  ],
  status: {
    type: Number,
    require: true
  }
},
{
  collection: 'order',
  versionKey: false
})

module.exports = mongoose.model('Order', orderSchema)
