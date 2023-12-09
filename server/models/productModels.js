const mongoose = require("mongoose");
const { Schema } = mongoose;

var productSchema = new Schema(
  {
   
    productName: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    desc: {
      type: String,
      required: true,
    },
    images: {
      type: Object,
      required: false,
    },
    asin: {
      type: mongoose.Schema.Types.Mixed,
      default: 0,
    },
    price: {
      type: Number,
      default: 0,
    },
    urlLink: {
      type: String,
      default: "https://example.com",
    },
    category: {
      type: String,
      required: true,
    },
    customDate: {
      type: Date,
      default: Date.now,
    },
    // addedBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    // },
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

module.exports = mongoose.model("Product", productSchema);
