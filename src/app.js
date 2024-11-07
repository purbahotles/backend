require("dotenv").config(); // Load environment variables
const cors = require('cors');
const express = require("express");
const { sequelize } = require("./models/db");
const userRoutes = require("./routes/userRoutes");
const todoRoutes = require("./routes/todoRoutes");

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

// Middleware
app.use(express.json()); // Parsing JSON
app.use(cors({
  origin: CLIENT_URL, // Alamat frontend diambil dari environment variable
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Metode yang diizinkan
  credentials: true, // Izinkan cookie atau header otorisasi
}));

// Test Route
app.get('/', (req, res) => {
  res.send('Hello, world! Backend is working.');
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Initialize Database and Start Server
sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to sync database:", error);
  });
