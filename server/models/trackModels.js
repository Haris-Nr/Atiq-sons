const mongoose = require("mongoose");
const { Schema } = mongoose;

const trackSchema = new Schema(
    {
        productName:{
            type:String,
            required:true,
        },
        date:{
            type:Date,
            default: Date.now,
            required:true,
        },
        quantity:{
            type:Number,
            required:true,
        },
    },
    {
        timestamps: true,
    }
);

const Track = mongoose.model("tracks", trackSchema);
module.exports = Track;
