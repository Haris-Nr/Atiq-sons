const mongoose = require ("mongoose");
const { Schema } = mongoose;

var AddproductSchema = new Schema(
  {
    productname: {
      type: String,
      required: true,
      index:true
    },
    quantity: {
      type: Number,
      required: true,
    },
    description:{
      type:String,
    },
    images: {
      type: String,
      required: true,
    },
    asin: {
      type: Number,
      required:true
    },
    price:{
      type:Number,
      required:true
    },
    url:{
      type:String,
      required:true
    },
    category:{
      type:String,
      required:true
    },
    date: {
      type: Date,
      default: Date.now,
  },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
  },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Addproduct", AddproductSchema);
