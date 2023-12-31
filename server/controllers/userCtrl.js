const User = require("../models/userModel");
const Log = require("../models/logModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { createNotification } = require("../util/notification");
const secret = process.env.JWT_SECRET;

// create User
const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ ...req.body, password: hashPassword });
    await newUser.save();

    const io = req.app.get('io');

    await createNotification(
      io,
      "admin",
      null,
      `New user signup ${newUser.fullname}`,
      "Signup",
      newUser._id,
      null,
      `user/${newUser._id}`
    );

    res.status(201).json({
      success: true,
      message:
        "New user account created successfully!!" +
        newUser.fullname.toUpperCase(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// login user
const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error("Password is incorrect");
    }
    if (user.status !== "active") {
      throw new Error(
        `Mr. ${user.fullname} your account is blocked, please contact the admin`
      );
    }
    const token = jwt.sign({ userId: user._id }, secret, { expiresIn: "1d" });
    
    const logEntry = new Log({
      user_id: user._id,
      action: "Login",
      loginTime: new Date(),
      logstatus: "Online",
    });
    await logEntry.save();

    const io = req.app.get('io');

    await createNotification(
      io,
      `${user.role === "admin" ? null : "admin"}`,
      null,
      `User login ${user.fullname}`,
      "Login",
      user._id,
      null,
      `user/${user._id}`
    );

    res.status(200).json({
      success: true,
      message: user.fullname.toUpperCase() + " Logged in",
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get allUsers
const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find()
      .select("-password")
      .select("-confirmpassword");
    res.json({
      success: true,
      message: "All Users",
      data: allUsers,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// getEmployee
const getEmployee = async (req, res) => {
  try {
    const employees = await User.find({ role: "employee" }).select("-password");
    res.status(200).json({
      success: true,
      data: employees,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// reset password
const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.findOneAndUpdate(
      { email },
      { $set: { password: hashedPassword } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// delete employee
const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEmployee = await User.findByIdAndDelete(id);
    if (!deletedEmployee) {
      throw new Error("Employee already deleted");
    }
    res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// fetch current user
const fetchUser = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId)
      .select("-password")
      .select("-confirmpassword");
    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      employee: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// change status employee only admin
const changeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await User.findByIdAndUpdate(id, { status }, { new: true });
    res.status(200).json({
      success: true,
      message: "Status change successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// logout
const logout = async (req, res) => {
  try {
    const { userId } = req.body;

    let user = await User.findById(userId);

    // Find the most recent login log entry for this user
    const LoginLog = await Log.findOne({
      user_id: userId,
      action: "Login",
    }).sort({ createdAt: -1 });

    if (!LoginLog) {
      throw new Error("Login log not found");
    }

    // Update the log entry with the logout time
    LoginLog.logoutTime = new Date();
    LoginLog.action = "Logout";
    LoginLog.logstatus = "Offline";
    await LoginLog.save();

    const io = req.app.get('io');

    await createNotification(
      io,
      `${user.role === "admin" ? null : "admin"}`,
      null,
      `User logout ${user.fullname}`,
      "Logout",
      userId,
      null,
      `user/${user._id}`
    );

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// getEmployeeDetails
const getEmployeeDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const loginLogs = await Log.find({
      user_id: id,
    }).sort({ createdAt: -1 });
    const filteredLogs = loginLogs.map((log) => ({
      action: log.action,
      logStatus: log.logstatus,
    }));

    const employee = await User.findById(id)
      .select("-password")
      .select("-confirmpassword");

    if (!employee) {
      throw new Error("Employee not found");
    }

    res.status(200).json({
      success: true,
      message: "Employee details fetched successfully",
      employee: employee,
      logs: filteredLogs[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createUser,
  loginUser,
  getAllUsers,
  getEmployee,
  resetPassword,
  deleteEmployee,
  fetchUser,
  changeStatus,
  logout,
  getEmployeeDetails,
};
