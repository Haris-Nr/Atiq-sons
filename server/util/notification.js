const User = require("../models/userModel");
const Notifications = require("../models/notificationModel");

/**
 * Creates notifications for a specific role or a specific user.
 * @param {string} role - The role of users to whom the notification should be sent. Ignored if userId is provided.
 * @param {ObjectId} userId - The ID of a specific user to receive the notification. Overrides role if provided.
 * @param {string} message - The message for the notification.
 * @param {string} title - The title of the notification.
 * @param {ObjectId} actionUserId - The ID of the user who triggered the action.
 */
const createNotification = async (role, userId, message, title, actionUserId,image) => {
  try {
    let users = [];

    if (userId) {
      // If a specific user ID is provided, target only that user
      users = await User.find({ _id: userId });
    } else if (role) {
      // If no specific user ID is provided, target all users with the specified role
      users = await User.find({ role: role });
    }

    const notificationPromises = users.map(async (user) => {
      const newNotification = new Notifications({
        user: user._id,
        whichUser: actionUserId,
        message: message,
        title: title,
        onClick: `/user`,
        seen: false,
        image:image
      });
      await newNotification.save();
    });

    await Promise.all(notificationPromises);
  } catch (error) {
    console.error('Error creating notifications:', error);
  }
};

module.exports = { createNotification };
