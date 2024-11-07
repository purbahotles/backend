const jwt = require("jsonwebtoken");
const logger = require('../logger'); // Adjust the path as necessary

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header

    if (!token) {
        return res.status(401).json({ error: "No token provided." });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            logger.error(`Token verification failed: ${err.message}`);
            return res.status(403).json({ error: "Failed to authenticate token." });
        }

        // Attach user information to request object
        req.user = { id: decoded.id };
        next(); // Proceed to the next middleware or route handler
    });
};

module.exports = authMiddleware;
