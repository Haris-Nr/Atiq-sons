const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

const secret = process.env.JWT_SECRET;

// create User
const createUser = async (req, res) => {
    try {
        const { email, password, confirmpassword, fullname } = req.body;

        const findUser = await User.findOne({ email: email });
        if (findUser) {
            throw new Error("User already exists");
        }

        if (password !== confirmpassword) {
            throw new Error("Password and confirm password do not match");
        }

        let newUser = new User(req.body);
        await newUser.save();

        newUser= newUser.toObject();
        delete newUser['password']
        delete newUser['confirmpassword']

        res.status(201).json({
            success: true,
            message: "New user account created successfully!!" + fullname.toUpperCase(),
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// login user
const loginUser = async (req, res) => {
    try {
        let { email, password } = req.body;

        let user = await User.findOne({ email }).lean();
        if (!user) {
            throw new Error("User not found")
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            throw new Error("Invalid password")
        }
        
        delete user['password']
        delete user['confirmpassword']

        const token = jwt.sign({ userId: user._id }, secret,{ expiresIn: "1d" });

        res.status(200).json({
            success: true,
            message: user.fullname.toUpperCase() + " Logged in",
            token,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// get allUsers
const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find().select('-password').select('-confirmpassword');
        res.json({
            success: true,
            message: "All Users",
            AllUsrs: allUsers
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

// getEmployee 
const getEmployee = async (req, res) => {
    try {
        const employees = await User.find({ role: 'EMPLOYEE' }).select('-password').select('-confirmpassword');
        res.status(200).json({
            success: true,
            message: " All Employee",
            employees: employees,
            
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// reset password
const updatedEmployee = async (req, res) => {
    try {

        const { email, password, confirmpassword } = req.body;

        if (password !== confirmpassword) {
            throw new Error("Password and confirm password do not match");
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, 10);
        const hashedConfirmPassword = await bcrypt.hash(confirmpassword, salt);

        const employeeUpdate = await User.findOneAndUpdate({ email },
            { hashedPassword, hashedConfirmPassword },
            { new: true }
        )

        res.status(200).json({
            success: true,
            message: "Password updated successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

// delete employee
const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEmployee = await User.findByIdAndDelete(id);
        if (!deletedEmployee){
            throw new Error("Employee already deleted");
        }
        res.status(200).json({
            success: true,
            message: "Employee deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

const fetchUser = async (req, res) => {
    try {
        const user = await User.findById(req.body.userId).select('-password').select('-confirmpassword')
        // Send the user as a response
        res.status(200).json({
            success: true,
            data: user,
            message: "User fetched successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};




module.exports = { createUser, loginUser, getAllUsers, getEmployee, updatedEmployee, deleteEmployee,fetchUser };
