const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    user_id:{
      type: String,
      required: true,
      unique: true,
    },
    user_pw:{
      type: String,
      required: true,
    },
  },
  {
    collection: 'user',
    versionKey: false,
  }
);

module.exports = mongoose.model('User', userSchema);