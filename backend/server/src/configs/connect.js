const { Sequelize } = require("sequelize");

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize("frexco", "postgres", "postgres", {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
});

module.exports = sequelize;