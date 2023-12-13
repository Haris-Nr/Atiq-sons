const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

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
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};
