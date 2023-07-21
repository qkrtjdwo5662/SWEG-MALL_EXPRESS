const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema(
    {
        category:{
            type:String,
            require: true,
        },
        name:{
            type:String,
            require: true,
        },
        model:{
            type:String,
            require: true,
        },
        color: {
            type:String,
            require: true,
        },
        price : {
            type:String,
            require: true,
        },
        img : {
            type:String,
            require: true,
        }

    },
    {
        collation: 'product',
        versionKey: false,
    }
);

module.exports = mongoose.model('Product', productSchema);