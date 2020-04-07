const mongoose = require('mongoose')
const Schema = mongoose.Schema
const menuSchema = new Schema({
  menu: [
    {
      name: {
        type: String
      },
      type: {
        type: String
      },
      child: [
        {
          title: {
            type: String
          },
          child: {
            type: Array
          }
        }
      ]
    }
  ]
},
{
  collection: 'menu',
  versionKey: false
})

module.exports = mongoose.model('Menu', menuSchema)
