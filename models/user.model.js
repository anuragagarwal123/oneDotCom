const sequelize = require("sequelize");
const db = require("./../util/database");

const User = db.define(
  "user",
  {
    email: {
      type: sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    userName: {
      allowNull: true,
      type: sequelize.STRING,
      unique: true,
    },
    password: {
      allowNull: true,
      type: sequelize.STRING,
    },
    firstName: {
      type: sequelize.STRING,
    },
    lastName: {
        type: sequelize.STRING,
      },
    role: {
      type: sequelize.ENUM("admin", "seller", "supporter", "customer"),
    },
  },
  {
    timestamps: true,
  }
);

module.exports = User;
