const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
    {
        productName: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
        },
        image: [
            {
                url: {
                    type: String,
                    required: true,
                },
                publicId: {
                    type: String,
                    required: true,
                },
            }
        ],
        asin: {
            type: Schema.Types.Mixed,
            required: true,
            unique:true
        },
        price: {
            type: Schema.Types.Mixed,
            required: true,
        },
        rating:{
            type:Number,
            required:true,
        },
        url: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
            required: true,
        },
        seller:{
            type:String,
            required:true,
        },
        tracking:{
            type:String,
            enum:["tracking","tracked","pending"],
            default:"pending",
            required:true,

        }
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("products", productSchema);
module.exports = Product;
