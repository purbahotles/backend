const { Sequelize } = require("sequelize");
const config = require("../config/config");
const env = process.env.NODE_ENV || "development";

const sequelize = new Sequelize(config[env]);

const User = sequelize.define("User", {
  id: { type: Sequelize.STRING, primaryKey: true },
  name: { type: Sequelize.STRING },
  password: { type: Sequelize.STRING },
});

const Todo = sequelize.define("Todo", {
  activities_no: { type: Sequelize.STRING, unique: true },
  subject: { type: Sequelize.STRING },
  description: { type: Sequelize.STRING },
  status: { type: Sequelize.ENUM("Unmarked", "Done", "Canceled"), defaultValue: "Unmarked" },
  userId: { type: Sequelize.STRING },
});

User.hasMany(Todo, { foreignKey: "userId" });
Todo.belongsTo(User, { foreignKey: "userId" });

module.exports = { sequelize, User, Todo };
