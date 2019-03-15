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
  connection.query("SELECT stock_quantity FROM products WHERE ?", { item_id: parseInt(item_id) }, function (err, res) {
    if (err) throw err;
    for(var i = 0; i < res.length; i++){
    var currentStock = res[0].stock_quantity;
    console.log(currentStock);
    connection.end();
    }
  });
}


// }).then(function(userPurchase) {

//   connection.query("SELECT * FROM products WHERE item_id=?", userPurchase.inputId, function(err, res) {
//       for (var i = 0; i < res.length; i++) {

//           if (userPurchase.inputNumber > res[i].stock_quantity) {

//               console.log("===================================================");
//               console.log("Sorry! Not enough in stock. Please try again later.");
//               console.log("===================================================");
//               startPrompt();

//           } else {
//               //list item information for user for confirm prompt
//               console.log("===================================");
//               console.log("Awesome! We can fulfull your order.");
//               console.log("===================================");
//               console.log("You've selected:");
//               console.log("----------------");
//               console.log("Item: " + res[i].product_name);
//               console.log("Department: " + res[i].department_name);
//               console.log("Price: " + res[i].price);
//               console.log("Quantity: " + userPurchase.inputNumber);
//               console.log("----------------");
//               console.log("Total: " + res[i].price * userPurchase.inputNumber);
//               console.log("===================================");

//               var newStock = (res[i].stock_quantity - userPurchase.inputNumber);
//               var purchaseId = (userPurchase.inputId);
//               //console.log(newStock);
//               confirmPrompt(newStock, purchaseId);
//           }
//       }
//   });
// });
// }