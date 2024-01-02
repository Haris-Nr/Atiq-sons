const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const logSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    action: {
      type: String,
      required: true,
      enum: ["Login", "Logout"],
    },
    logstatus: {
      type: String,
      enum: ["Online", "Offline"],
      default: "Offline",
    },
    loginTime: {
      type: Date,
      default: null,
    },

    logoutTime: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Log = mongoose.model("logs", logSchema);

module.exports = Log;
