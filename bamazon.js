var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "DLCfocus22!",
  database: "bamazon_db"
});

connection.connect(function (err, res) {
  if (err) throw err;
  readProducts();
});

function readProducts() {
  console.log("Inventory list...\n");
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    console.table(res);
    // connection.end();

    inquirer
      .prompt({
        name: "item_id",
        type: "input",
        message: "Please enter the ID number of the product you are searching for.",
      }).then(function (answer) {
        console.log(answer)
        var query = "SELECT item_id, product_name, price, stock_quantity FROM products WHERE ?";
        connection.query(query, { item_id: answer.item_id }, function (err, res) {
          if (err) throw err;
          for (var i = 0; i < res.length; i++) {
            console.table(res);
            askQuantity(answer.item_id);
            // connection.end();
          }
        });
      })

  });
}


function askQuantity(item_id) {
  inquirer.prompt({
      name: "quantity",
      type: "input",
      message: "Please enter quantity: "
  }).then(function (user) {
      connection.query("SELECT stock_quantity, price FROM products WHERE ?", { item_id: parseInt(item_id) }, function (err, res) {
          // console.log(res);
          if (err) throw err;
          for (var i = 0; i < res.length; i++) {
              // console.table(res[i].item_id + res[i].product_name);
          }

          // console.table(res);
          var currentStock = res[0].stock_quantity;
          var itemPrice = res[0].price;
          // console.log(res[0].price);
          // console.log(currentStock);

          if (user.quantity > currentStock) {
              console.log("I'm sorry but this product is currently out of stock.");
              readProducts();

            } else {
              console.log("This item has been successfully added to your cart. ");
              // console.log("Quantity: " + res[0].stock_quantity - user.quantity);
              // console.log("----------------");
              updatedQ= parseInt(currentStock) - parseInt(user.quantity);
              // console.log(updatedQ);
              connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [updatedQ , item_id ], function (err, res) {
                  // console.log("stock has been updated");
                  console.log("Your final total is: " + user.quantity * itemPrice);
                  connection.end();
              })
          }
      });
  })
}