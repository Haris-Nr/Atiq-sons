const jwt = require("jsonwebtoken");

<<<<<<< HEAD
const authMiddleware = (req, res, next) => {
    try {
        const token = req.header("Authorization");

=======
module.exports = (req, res, next) => {
    try {
        const token = req.header("Authorization");
        
>>>>>>> 131a352 (bilal)
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token not provided",
            });
        }

<<<<<<< HEAD
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            userId: decodedToken.userId,
            // You can include other user information here if needed
        };
        
        // Now req.user contains the user information
        console.log('req.user:', req.user);

=======
        const decryptedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = decryptedToken.userId;
>>>>>>> 131a352 (bilal)
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};
<<<<<<< HEAD

const errorHandler = (err, req, res, next) => {
    console.error(err);
  
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        error: {
            status: statusCode,
            message: err.message,
        },
    });
};

module.exports = {
    authMiddleware,
    errorHandler,
};
=======
>>>>>>> 131a352 (bilal)
