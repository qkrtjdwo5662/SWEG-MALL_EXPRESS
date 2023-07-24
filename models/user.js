const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
      user_name:{
          type:String,
          required: true,
      },
      user_gender:{
          type: String,
          required: true,
      },
      user_birth : {
          type: String,
          required: true,
      },
      user_id : {
          type: String,
          required: true,
          unique: true,
      },
      user_pw:{
          type: String,
          required: true,
      },
      user_tel : {
          type: String,
          required: true,
      },
      user_email : {
          type: String,
          required: true,
      },
      user_address : {
          type: String,
          required: true,
      },
      salt : {
          type: String,
          required: true,
      }
  },
  {
    collection: 'user',
    versionKey: false,
  }
);

module.exports = mongoose.model('User', userSchema);