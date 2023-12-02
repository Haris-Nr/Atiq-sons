const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

const secret = process.env.JWT_SECRET;

// create User
const createUser = async (req, res) => {
    try {
        const email = req.body.email;

        // Check if the user already exists
        const findUser = await User.findOne({ email: email });
        if (findUser) {
            throw new Error("User already exists");
        }

        const newUser = new User(req.body);
        await newUser.save();


        res.status(201).json({ 
            newUser,
            success: true,
            message: "New user account created successfully!!" + req.body.fullname,
        });


    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// login user

const loginUser = async(req,res)=>{
    try {
        const {email, password} = req.body;

        const user = await User.findOne({ email }).lean();
        if(!user){
            return res.status(404).json({ error: "User not found" });
        }


        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
          return res.status(401).json({ error: "Invalid password" });
        }
          
          const token = jwt.sign(user, secret);

          res.status(200).json({ 
              success: true,
              message: user.fullname.toUpperCase() + " Logged in",
              token,
             });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// get allUsers
const getAllemployees = async(req,res)=>{
    try {
        const allEmployees = await User.find();
        res.json(allEmployees)
    } catch (error) {
        res.json({error:error.message})
    }
}

// get admin 
const getAdmin = async (req, res) => {
    try {
      const admin = await User.find({role: 'ADMIN'}).select('-password').select('-confirmpassword').lean();
      res.status(200).json(admin);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

const updatedEmployee = async (req,res) =>{
    try {
        
    const {email,password,confirmpassword } = req.body;

    const employeeUpdate = await User.findOneAndUpdate()

    } catch (error) {
        
    }
}




module.exports = { createUser,loginUser,getAllemployees,getAdmin,updatedEmployee };
