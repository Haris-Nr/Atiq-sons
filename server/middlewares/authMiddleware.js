const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

<<<<<<< HEAD
module.exports = (req, res, next) => {
    try {
        // Check if the authorization header is present
        if (!req.headers.authorization) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Split the authorization header and get the token
        const tokenParts = req.headers.authorization.split(" ");
        if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const token = tokenParts[1];

        // Verify the token and attach the user ID to the request
        const decodedToken = jwt.verify(token, secret);
        req.body.userId = decodedToken.userId;
=======
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
>>>>>>> refs/remotes/origin/main
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};
<<<<<<< HEAD
=======
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
>>>>>>> refs/remotes/origin/main
