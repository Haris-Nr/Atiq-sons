const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const decodeToken = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId)
        return user
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
};

module.exports = decodeToken;
