const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
    {
        fullname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        confirmpassword: {
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
            enum: ["Lahore", "Dubai", "China","Admin"],
        },
        date: {
            type: Date,
            default: Date.now,
        },
        role: {
            type: String,
            enum: ["ADMIN", "EMPLOYEE"],
            default: "EMPLOYEE",
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;

        const hashedConfirmPassword = await bcrypt.hash(this.confirmpassword, salt);
        this.confirmpassword = hashedConfirmPassword;

        return next();
    } catch (error) {
        return next(error);
    }
});

module.exports = mongoose.model("User", userSchema);
