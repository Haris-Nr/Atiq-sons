const User = require("../models/userModel");
const Log = require("../models/logModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const secret = process.env.JWT_SECRET;

// create User
const createUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            throw new Error("User already exists");
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashPassword;

        const newUser = new User(req.body);
        await newUser.save();

        res.status(201).send({
            success: true,
            message:
                "New user account created successfully!!" +
                newUser.fullname.toUpperCase(),
        });
    } catch (error) {
        res.status(500).send({
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

        if (user.status !== "active") {
            throw new Error(
                `Mr. ${user.fullname} your account is blocked, please contact the admin`
            );
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            throw new Error("Invalid password");
        }

        const logEntry = new Log({
            user_id: user._id,
            action: "Login",
        });

        await logEntry.save();

        const token = jwt.sign({ userId: user._id }, secret, { expiresIn: "1d" });

        res.status(200).send({
            success: true,
            message: user.fullname.toUpperCase() + " Logged in",
            data: token,
        });
    } catch (error) {
        res.status(500).send({
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
        res.send({
            success: true,
            message: "All Users",
            data: allUsers,
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
};

// getEmployee
const getEmployee = async (req, res) => {
    try {
        const employees = await User.find({ role: "employee" })
            .select("-password")
            .select("-confirmpassword");
        res.status(200).send({
            success: true,
            message: " All Employee",
            data: employees,
        });
    } catch (error) {
        res.status(500).send({
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
            return res.status(404).send({
                success: false,
                message: "User not found",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await User.findOneAndUpdate(
            { email },
            { $set: { password: hashedPassword } },
            { new: true }
        );

        res.status(200).send({
            success: true,
            message: "Password updated successfully",
        });
    } catch (error) {
        res.status(500).send({
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
        res.status(200).send({
            success: true,
            message: "Employee deleted successfully",
        });
    } catch (error) {
        res.status(500).send({
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
        res.status(200).send({
            success: true,
            message: "User fetched successfully",
            data: user,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
        });
    }
};

const changeStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        await User.findByIdAndUpdate(id, { status }, { new: true });
        res.status(200).send({
            success: true,
            message: "Status change successfully",
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
        });
    }
};

const logout = async (req, res) => {
    try {
        const userId = req.body.userId;

        const logEntry = new Log({
            user_id: userId,
            action: "Logout",
        });
        await logEntry.save();

        localStorage.removeItem("token");

        res.status(200).send({
            success: true,
            message: "Logged out successfully",
        });
    } catch (error) {
        res.status(500).send({
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
};
