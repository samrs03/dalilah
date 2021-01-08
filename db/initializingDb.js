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

  const creatingOrdersTable = `CREATE TABLE IF NOT EXISTS orders (
    order_status ENUM('new','confirmed','making','delivered','cancelled'),
    order_date TIMESTAMP NOT NULL,    
    order_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    order_description VARCHAR(120) NOT NULL,
    order_pay_method VARCHAR(15) NOT NULL,
    order_price INT NOT NULL,
    user_id INT NOT NULL,
    CONSTRAINT FK_user_order FOREIGN KEY (user_id)
    REFERENCES users(user_id)   
  );`;
const creatingTables = (...params) => {
  for (let i = 0; i < params.length; i++) {
    mySqlConnectionObject.query(params[i], { raw: true });
  }
};
const startDB = () => {
  creatingTables(
    DBToUse,
    creatingUsersTable,
    creatingProductsTable,
    creatingOrdersTable
  );
};

startDB();
