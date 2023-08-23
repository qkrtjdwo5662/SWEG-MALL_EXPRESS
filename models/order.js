const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    order_model:{
      type: Array,
      required : true,
    },
    original_price : {
      type: String,
      required : true,
    },
    order_price : {
      type: String,
      requried : true,
    },
    used_coupon: {
      type: String,
    },
    order_userInfo : {
      type: Object,
      required: true,
    },
    order_proInfo : {
      type: Array, 
      required: true,
    },
    order_status: {
      type: String,
      required: true,
      default: "request"
    }
  },
  {
    collection: 'orders',
    versionKey: false,
  }
);

module.exports = mongoose.model('Order', orderSchema);