const mongoose = require("mongoose");
const { Schema } = mongoose;
const notificationSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    whichUser:{
      type: Schema.Types.ObjectId,
      required:true
    },
    message: {
      type: String,
      required: true,
    },
    onClick: {
      type: String,
      required: true,
    },
     user: [{ 
      type: Schema.Types.ObjectId,
       ref: 'users',
       required: true
       }],
     seen:{
        type: Boolean,
        default: false,
    },
    image:{
      type: String,
  },
  },
  {
    timestamps: true,
  }
);
const Notifications = mongoose.model("notifications", notificationSchema);
module.exports = Notifications;
