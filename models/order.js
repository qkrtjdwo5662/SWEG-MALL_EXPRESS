const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    order_model:{
      type: String,
      required : true,
    },
    orginal_price : {
      type: String,
      required : true,
    },
    order_price : {
      type: String,
      requried : true,
    },
    order_userInfo : {
      type: Object,
      required: true,
    },
    order_proInfo : {
      type: Object, 
      required: true,
    }
  },
  {
    collection: 'orders',
    versionKey: false,
  }
);

module.exports = mongoose.model('Order', orderSchema);