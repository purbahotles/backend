const path = require("path");

module.exports = {
  development: {
    dialect: "sqlite",
    storage: path.join(__dirname, "../database.sqlite"),
    logging: console.log, // Enable logging for development
  },
  production: {
    dialect: "sqlite",
    storage: path.join(__dirname, "../database.sqlite"),
    logging: false, // Disable logging for production
  },
  test: {
    dialect: "sqlite",
    storage: ":memory:", // Use in-memory database for testing
    logging: false,
  },
};
