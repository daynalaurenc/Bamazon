# Bamazon

Bamazon will be a command line Node app that takes in parameters and gives user back data. 
MySQL is used as the schema for the inventory database.

* Make sure you save and require the MySQL and Inquirer npm packages, your app will need them for data input and storage.


## Description
Bamazon represents an Amazon-like storefront utilizing MySQL to showcase the inventory. The app will take in orders from customers and deplete stock from the store's inventory.

+ Typing node bamazon.js will render the Bamazon inventory list.
Displayed as : | item_id | product_name | department_name | price | stock_quantity |

+ Prompt will then ask you to input an item's id (item_id column).

+ The app will display the single item's information, and prompt user to enter quantity for purchase.

+ Depending on the amount, the app will calculate user's total purchase price.

+ Sequence can be repeated, notice that the stock quantity of previous purchase has been updated and displayed correctly in inventory list.



## Sample View

![Bamazon Screenshot](/images/transaction.jpg/)
![Bamazon Screenshot](/images/update_inventory.jpg/)



## Technology

+ Javascript
+ NODE
+ MySQL


