const User = require("../models/userModel");
module.exports = async (req, res, next) => {
    const user = await User.findById(req.body.userId).select('-password');
    if (user && user.role === 'admin') {
        next(); 
    } else {
        res.status(403).json({
            success: false,
            message: 'Access denied. Only admin are allowed.'
        });
    }
};

