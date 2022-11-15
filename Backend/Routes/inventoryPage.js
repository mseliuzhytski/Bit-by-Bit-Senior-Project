const path = require('path');
const inventory = require('./inventory');
const image = require('./image');

exports.get = function (req, res) {
    var { Car_Stock_Num } = req.query;

    inventory.getInventoryItem(Car_Stock_Num, (item) => {
        image.getAllImages(Car_Stock_Num, (images) => {

            res.render(path.join(__dirname + '../../../Frontend/Pages/InventoryPage.ejs'), {
                inventoryItem: item,
                imageItems: images,
                isLoggedIn: typeof req.session.userInfo !== 'undefined'
            });
        })
    })
};