const path = require('path');
const inventory = require('./inventory');

exports.get = async function (req, res) {
    inventory.getAllInventoryItems(function (items) {
        res.render(path.join(__dirname + '../../../Frontend/Pages/Search.ejs'), {
            inventoryItems: items});
        });
    } 
