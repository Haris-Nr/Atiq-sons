const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    taskDetails: {
      type: String,
      required: true,
      maxlength: 255,
    },
    employee: {
      type: String,
      required: true,
      maxlength: 100,
    },
    customDate: {
      type: Date,
    },
    approved: {
      type: Boolean,
      default: false,
    },
   
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("task", taskSchema);
