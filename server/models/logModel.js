const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const logSchema = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    action: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Log = mongoose.model("logs", logSchema);

module.exports = Log;
