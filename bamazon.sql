DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
 item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
 product_name VARCHAR(100) NOT NULL,
 department_name VARCHAR(100) NOT NULL,
 price DECIMAL(10,2) NOT NULL,
 stock_quantity INT NOT NULL
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Roomba", "Home Improvement", 399.99, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nest Home Theromostat", "Home Improvement", 200.00, 145);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fire TV Stick", "Electronics", 39.99, 2000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Le Repas des Infants", "Fine Art", 4300.00, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Echo (2nd Generation)", "Electronics", 99.99, 2000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hill's Science Diet - Advanced Fitness", "Pets", 43.99, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Scout Chukka - Thursday Boots", "Clothing", 149.00, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Adidas NMD - Running Shoe", "Clothing", 180.00, 50);