const mongoose = require ("mongoose");
const { Schema } = mongoose;

var AddproductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: false,
    },
    stock: {
      type: Number,
      default: 0,
    },
    customDate: {
      type: Date, 
      default: Date.now, 
    },
    approved: {
      type: Boolean,
      default: false, 
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Addproduct", AddproductSchema);
