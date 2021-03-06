const mysql = require('mysql');

// Connected to MySQL Workbench
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "USER",
    password: "PASSWORD",
    database: "bamazon"
  });

// Function to display product from MySQL
// item_id AS 'Item ID changes display name for console.table
  const showProducts = () => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT
        item_id AS 'Item ID',
        product_name AS 'Product Title',
        department_name AS 'Department',
        price as 'Price',
        stock_quantity AS 'Quantity'
         FROM products`;
        connection.query(sql, (err, res) => {
            if (err) reject(err);
            resolve(res);
            console.log(`\n`);
        });
    });
  };

// Function to grab the item id
  const searchID = (id) => {
    return new Promise ((resolve, reject) => {
        const sql = `SELECT 
        * FROM products 
        WHERE item_id = ${id}`;
        connection.query(sql, (err, res) => {
          if (err) reject(err);
          resolve(res[0]);
        });
    });
};

// Function to update inventory for selected quantity
const updateStore = (id, quantity) => {
    return new Promise ((resolve, reject) => {
        const sql = `UPDATE products
        SET stock_quantity = ${quantity}
        WHERE item_id = ${id}`;
        connection.query(sql, (err, res) => {
            if(err) reject(err);
            resolve(res[0]);
        });
    });
}

// Export functions -> bamazonCustomer.js
  module.exports = {
      connection,
      showProducts,
      searchID,
      updateStore
  };