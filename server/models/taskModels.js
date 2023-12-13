const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    taskDetails: {
      type: String,
      required: true,
    },
    employee: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    status: {
      type: String,
      enum: ["incomplete","complete"],
      default: "incomplete",
      required: true,
  },
   
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("task", taskSchema);
