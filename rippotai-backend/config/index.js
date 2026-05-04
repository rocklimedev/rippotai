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
    port: dbConfig.DB_PORT || 3306,
    dialect: "mysql",
    logging: false,
    dialectOptions: {
      connectTimeout: 20000,
      ssl: false,
      family: 4,
    },
  },
);

module.exports = sequelize;
