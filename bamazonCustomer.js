const inquirer = require('inquirer');
const table = require('console.table');
const run = require('./run');

// Function to get all products from the database // async result is a promise // await is waiting for that promise
const getProducts = async () => {
    try {
        let products = await run.showProducts();
        if (products.length === 0) {
            throw new Error('There are currently no products available. Check back soon.');
        } else {
            return products;
        }
    } catch (err) {
        throw new Error(err.message);
    }  
};

// Function to ask the user what product they want to purchase // async result is a promise // await is waiting for that promise
const selectID = async () => {
    try {
        const id = await inquirer.prompt([
            {
                type: "input",
                message: "What would like to purchase? Enter the Item ID.",
                name: "id"
            }
        ]);
        if (isNaN(Number(id.id))) {
            throw new Error();
        } else {
            const product = await run.searchID(id.id);
            return {
                id: id.id,
                name: product.product_name,
                price: product.price,
                quantity: product.stock_quantity,
                sales: product.product_sales
            };
        }
    } catch (err) {
        throw new Error('Unable to find a product with the requested ID. Please try again.');
        
    }
};

// Function to ask the user how many items they want // async result is a promise // await is waiting for that promise
const selectQuantity = async (product) => {
    try {
        const quantity = await inquirer.prompt([
            {
                type: "input",
                message: "How many would you like to buy?",
                name: "request"
            }
        ]);
        if (isNaN(Number(quantity.request))) {
            throw new Error('Your request is not valid. Please try again.');
        } else if (Number(quantity.request) > product.quantity) {
            throw new Error('There is not enough inventory. Please check back soon or select a lower quantity.')
        } else {
            return Number(quantity.request);
        }
    } catch (err) {
        throw new Error(err.message);
    }
};

// Function to aprocess the customer purchase // async result is a promise // await is waiting for that promise
const purchase = async (product, quantity) => {
    try {
        const updatedQuantity = product.quantity - quantity;
        const total = product.price * quantity;
        const updatedSale = product.sales + total;
        await run.updateStore(product.id, updatedQuantity, updatedSale);
        return `
        \nThank you. Your order is confirmed.
        \nYou purchased ${quantity} of the ${product.name}.
        \nSubtotal: $${total.toFixed(2)}
        \r---------------------------
        \rShipping: Amazon Prime
        \r---------------------------
        \rTotal: $${total.toFixed(2)}
        \n`;
    } catch (err) {
        throw new Error('Unable to process your purchase. Please try again.');
    }
};

// Where all the magic happens
  const initialize = async () => {
      try {
          const products = await getProducts();
          console.table(products);
          const id = await selectID();
          const quantity = await selectQuantity(id);
          return await purchase(id, quantity);
      } catch (err) {
          throw new Error(err);
      };
  };
 
// Start the magic
initialize()
    .then((message) => {
    run.connection.end();
    console.log(message);
    })
    .catch((err) => {
    run.connection.end();
    console.log(err.message);
});