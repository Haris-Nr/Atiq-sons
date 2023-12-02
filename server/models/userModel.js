const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

var userSchema = new mongoose.Schema(
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
        mobile: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        confirmpassword: {
            type: String,
            required: true,
        },
        dashboard: { type: String, required: true },
        role: { type: String, enum: ["ADMIN", "EMPLOYEE"], default: "EMPLOYEE" },
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

module.exports = mongoose.model('User', userSchema);
