const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/db");
const logger = require("../logger"); // Import the logger

exports.register = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({ id: req.body.id, name: req.body.name, password: hashedPassword });
    res.status(201).json(user);
    logger.info(`User registered: ${user.id}`); // Log user registration
  } catch (error) {
    logger.error(`Registration failed: ${error.message}`); // Log error
    res.status(500).json({ error: "Registration failed" });
  }
};

exports.login = async (req, res) => {
  try {
    console.log("Login attempt with ID:", req.body.id); // Log the login attempt
    const user = await User.findOne({ where: { id: req.body.id } });
    console.log("User found:", user); // Log the user found (or null)
    logger.info(`User found: ${user ? user.id : 'not found'}`); // Log user found (or null)

    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
      logger.info(`User logged in: ${user.id}`); // Log successful login
      res.json({ token });
    } else {
      logger.warn(`Invalid credentials for ID: ${req.body.id}`); // Log invalid credentials
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Login error:", error); // Log the error for debugging
    logger.error(`Login error: ${error.message}`); // Log the error
    res.status(500).json({ error: "Login failed", details: error.message }); // Include error details in the response
  }
};

