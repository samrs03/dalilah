const { Sequelize } = require("sequelize");
const config  = require("config");

const mySqlConnectionObject = new Sequelize(
  config.DBConfiguration.db,
  config.DBConfiguration.User,
  config.DBConfiguration.Password,
  {
    host: config.DBConfiguration.Host,
    dialect: config.DBConfiguration.Dialect,
  }
);

mySqlConnectionObject
  .sync({ force: false })
  .then(() => {
    console.log(
      `${config.DBConfiguration.db} database initialized successfully`
    );
  })
  .catch((error) => {
    console.error(error);
  });

module.exports = {
    mySqlConnectionObject
}