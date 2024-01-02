const socketIO = require("socket.io");
const decodeToken = require("../util/tokenDecoder");
const Log = require("../models/logModel");
const User = require("../models/userModel");
const Notifications = require("../models/notificationModel");

let loggedInEmployeeCount = 0;
let loggedInAdminCount = 0;

module.exports = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: "*",
    },
  });

  let onlineEmployees = [];
  let onlineAdmins = [];

  const addUser = (userDetails, socketId) => {
    const { _id, role, fullname } = userDetails;
    const newUser = { userId: _id, socketId, role, fullname };

    if (role === "employee") {
      onlineEmployees.push(newUser);
    } else if (role === "admin") {
      onlineAdmins.push(newUser);
    }
  };

  const removeUser = (socketId) => {
    onlineEmployees = onlineEmployees.filter(
      (user) => user.socketId !== socketId
    );
    onlineAdmins = onlineAdmins.filter((user) => user.socketId !== socketId);
  };

  const getUser = (userId) => {
    return [...onlineEmployees, ...onlineAdmins].find(
      (user) => user.userId === userId
    );
  };

  io.on("connection", async (socket) => {

    const token = socket.handshake.auth.token;

    const userDetails = await decodeToken(token);

    addUser(userDetails, socket.id);

    socket.join(userDetails._id.toString());

    const updateAndNotifyAdmins = () => {
      onlineAdmins.forEach((admin) => {
        io.to(admin.socketId).emit("userCounts", loggedInEmployeeCount);
      });
    };

    if (userDetails.role === "employee") {
      loggedInEmployeeCount++;
      console.log(
        "Employee connected. Total employees:",
        loggedInEmployeeCount
      );
    } else if (userDetails.role === "admin") {
      loggedInAdminCount++;
      console.log("Admin connected. Total admins:", loggedInAdminCount);
    }

    updateAndNotifyAdmins();

    const user = await User.findById(userDetails._id);

    await Log.findOneAndUpdate(
      {
        user_id: user._id,
        action: "Login",
      },
      { $set: { logstatus: "Online" } },
      { new: true }
    );
    
    socket.on('fetchNotifications', async (userId) => {
        try {
            const notifications = await Notifications.find({ user: userId }).sort({ createdAt: -1 });
            socket.emit('notifications', notifications);
        } catch (error) {
            console.error("Error fetching notifications:", error);
        }
    });

    socket.on("seenChange", async(notificationId,userId)=>{
      await Notifications.updateOne(
        { _id: notificationId, user: userId, seen: false },
        { $set: { seen: true } },
        { new: true }
      );
    })

    


    socket.on("disconnect", async () => {
      removeUser(socket.id);
      if (userDetails.role === "employee") {
        loggedInEmployeeCount--;
        console.log(
          "Employee disconnected. Total employees:",
          loggedInEmployeeCount
        );
      } else if (userDetails.role === "admin") {
        loggedInAdminCount--;
        console.log("Admin disconnected. Total admins:", loggedInAdminCount);
      }
      updateAndNotifyAdmins();

      await Log.findOneAndUpdate(
        {
          user_id: user._id,
        },
        { $set: { logstatus: "Offline" } },
        { new: true }
      );
    });
  });

  return io;
};
