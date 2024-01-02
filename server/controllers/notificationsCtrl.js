const Notification = require("../models/notificationModel");

// add a new notification
const newNotification = async (req, res) => {
  try {
    const newNotification = new Notification(req.body);
    await newNotification.save();
    res.send({
      success: true,
      message: "Notification added successfully!!",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};1

// all Notification by particular employee
const allNotification = async (req, res) => {
  try {
    const notifications = await Notification.find({
      user: req.body.userId,
    }).sort({ createdAt: -1 });
    
    res.send({
      success: true,
      data: notifications,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};


//Delete the notification
const deleteNotification = async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.send({
      success: true,
      message: "Notification deleted successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};


//Seen or read all notifications by user
const seenNotification = async (req, res) => {
  try {
    const notificationId = req.body.notificationId;

    await Notification.updateOne(
      { _id: notificationId, user: req.body.userId, seen: false },
      { $set: { seen: true } }
    );
    
    res.send({
      success: true,
      message: "Notification marked as read/seen",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};


// delete all notifications
const deleteAllNotifications = async (req, res) => {
  try {
    await Notification.deleteMany({});
    res.status(200).send({
      success: true,
      message: "All notifications have been deleted",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};




module.exports = {
  newNotification,
  allNotification,
  deleteNotification,
  seenNotification,
  deleteAllNotifications,
};
