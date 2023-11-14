const mongoose = require("mongoose");

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        mobile: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        dashboard: { type: String, required: true},
        role: { type: String, enum: ["ADMIN", "EMPLOYEE"], default: "EMPLOYEE" },
    },
    {
        timestamps: true,
    }
);

//Export the model
module.exports = mongoose.model("User", userSchema);
