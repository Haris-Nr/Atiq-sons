const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        const token = req.header("Authorization");

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token not provided",
            });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            userId: decodedToken.userId,
            // You can include other user information here if needed
        };
        
        // Now req.user contains the user information
        console.log('req.user:', req.user);

        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};

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
