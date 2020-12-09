const { mySqlConnectionObject } = require("./connectDB");
const config = require("config");
const DBToUse = `USE ${config.DBConfiguration.db}`;
const creatingUsersTable = `CREATE TABLE IF NOT EXISTS users (
    user_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    user_name VARCHAR(50) UNIQUE NOT NULL,
    user_email VARCHAR(30) UNIQUE NOT NULL,
    user_full_name VARCHAR(70) NOT NULL,
    user_phone VARCHAR(15) NOT NULL,
    user_address VARCHAR(60) NOT NULL,
    user_password VARCHAR(10) NOT NULL,
    user_rol BOOLEAN NOT NULL    
);`;
const creatingProductsTable = `CREATE TABLE IF NOT EXISTS products (
  product_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  product_name VARCHAR(60) NOT NULL,    
  product_price INTEGER NOT NULL,
  product_stock INTEGER NOT NULL   
);`;
const creatingTables = (...params) => {
  for (let i = 0; i < params.length; i++) {
    mySqlConnectionObject.query(params[i], { raw: true });
  }
};
const startDB = () => {
  creatingTables(DBToUse, creatingUsersTable,creatingProductsTable);
};

startDB();
