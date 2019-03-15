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
  // productChoice();
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
          // runSearch();
        });
      })

  });
}

function askQuantity(item_id) {
  inquirer.prompt({

    name: "quantity",
    type: "input",
    message: "How many units of this item would you like to purchase?"

  }).then(function (user) {
   connection.query("SELECT stock_quantity FROM products WHERE ?", { item_id: parseInt(item_id) }, function (err, res) {
      // if (err) throw err;
      for (var i = 0; i < res.length; i++) { 
        var currentStock = res[0].stock_quantity;
        // connection.end();
        if (user.quantity > res[0].stock_quantity) {
          console.log("Sorry! Not enough in stock. Please try again later.");
          // askQuantity();
          readProducts();
        } else {
          console.log("Awesome! We can fulfull your order.");
          console.log("Quantity: " + res[0].stock_quantity - user.quantity);
          // console.log("----------------");
          updatedQ= parseInt(res[0].stock_quantity) - parseInt(user.quantity)
          console.log("below should be 47")
          console.log(updatedQ)
          connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [updatedQ , item_id ], function (err, res) {
              console.log("updated")
          })
        
          // var newStock = (res[i].stock_quantity - user.item_id);
          // var purchaseId = (user.item_id);
         
        }
      };
    });
  })
}