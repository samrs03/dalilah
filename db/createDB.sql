CREATE DATABASE dalilah;
CREATE USER 'samuelr'@'localhost' IDENTIFIED BY 'Comfenalco6!';
GRANT ALL PRIVILEGES ON * . * TO 'samuelr'@'localhost';
FLUSH PRIVILEGES;
USE dalila_restoh_carlos;


INSERT INTO users (user_name,user_email,user_full_name, user_phone,user_address, user_password,user_rol) 
values ('saro','samuel.rodriguez@outlook.com','Samuel Rodriguez','+573005194739','Calle 303 Sur', '1234', 1 );

INSERT INTO products (product_name, product_price, product_stock) 
values ('Bagel de salmón',425,20);