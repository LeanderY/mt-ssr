// 用户中心模型
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    require: true
    // 类型为String 值唯一 必填
  },
  password: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  }
},
{
  collection: 'user',
  versionKey: false
})

module.exports = mongoose.model('User', UserSchema)
