const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema(
    {
        category:{
            type:String,
            required: true,
        },
        name:{
            type:String,
            required: true,
        },
        model:{
            type:String,
            required: true,
            unique: true,
        },
        color: {
            type:String,
            required: true,
        },
        price : {
            type:String,
            required: true,
        },
        img : {
            type:String,
            required: true,
        }

    },
    {
        collation: { locale: 'en_US', strength: 1 },
        versionKey: false,
    }
);

module.exports = mongoose.model('Product', productSchema);