const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.header("authorization");
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token not provided",
            });
        }

        // const tokenParts = token.split(" ");
        // if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
        //     return res.status(401).json({
        //         success: false,
        //         message: "Invalid token format",
        //     });
        // }

        const decryptedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.body.user = decryptedToken.user;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};
