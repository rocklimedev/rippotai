const { Sequelize } = require("sequelize");
const config = require("./db.json"); // adjust path if needed

const env = "development";
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.DB_NAME,
  dbConfig.DB_USER,
  dbConfig.DB_PASSWORD,
  {
    host: dbConfig.DB_HOST,
    dialect: "mysql",
    logging: false,
  },
);

module.exports = sequelize;
