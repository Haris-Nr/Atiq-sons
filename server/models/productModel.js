const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productName:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
    },
    price:{
        type:Number,
    },
    category:{
        type:String,
    },
    brand:{
        type:String,
    },
    quantity: {
        type:Number,
    },
    images:{
        type: Array,
    },
    rating: {
        type: Number,
    },
},
{timestamps: true }
);

//Export the model
module.exports = mongoose.model('Product', productSchema);