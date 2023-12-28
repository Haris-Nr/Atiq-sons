const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        fullname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            trime:true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        mobile: {
            type: Number,
            required: true,
        },
        dashboard: {
            type: String,
            required: true,
            enum: ["lahore", "dubai", "china", "admin"],
        },
        role: {
            type: String,
            enum: ["admin", "employee"],
            default: "employee",
        },
        status: {
            type: String,
            enum: ["active", "blocked"],
            default: "blocked",
            index: true,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("users", userSchema);
module.exports = User;
