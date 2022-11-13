const path = require('path');
const inventory = require('./inventory');

exports.get = function (req, res) {

    inventory.getAllInventoryItems("All", "All", "All", 
    "All", "All", "All", "All", "All", (items) => {

            res.render(path.join(__dirname+'../../../Frontend/Pages/LandingPage.ejs'), {
                inventoryItems: items
            });
        });
};