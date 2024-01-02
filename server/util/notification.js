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
const createNotification = async (
  io,
  role,
  userId,
  message,
  title,
  actionUserId,
  image,
  onClick
) => {
  try {
    let users = [];

    if (userId) {
      // If a specific user ID is provided, target only that user
      users = [userId];
    } else if (role) {
      // If no specific user ID is provided, target all users with the specified role
      const adminUsers = await User.find({ role: role }).select("_id");
      users = adminUsers.map((user) => user._id);
    }

    if (users.length > 0) {
      const newNotification = new Notifications({
        user: users,
        whichUser: actionUserId,
        message: message,
        title: title,
        onClick: onClick,
        seen: false,
        image: image,
      });
      await newNotification.save();

        // Emit notification to specific user or role
      if (userId) {
        io.to(userId.toString()).emit('newNotification', newNotification);
      } else if (role) {
        // Emit to all users with the specified role
        const usersWithRole = await User.find({ role: role }).select("_id");
        usersWithRole.forEach((user) => {
            io.to(user._id.toString()).emit('newNotification', newNotification);
        });
      }
    }
  } catch (error) {
    console.error("Error creating notifications:", error);
  }
};

module.exports = { createNotification };
