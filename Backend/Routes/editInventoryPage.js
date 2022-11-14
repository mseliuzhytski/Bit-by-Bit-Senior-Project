const path = require('path');
const inventory = require('./inventory');
const image = require('./image');

exports.get = function (req, res) {
    if(typeof req.session.userInfo !== 'undefined'){
        var { Car_Stock_Num } = req.query;

        inventory.getInventoryItem(Car_Stock_Num, (item) => {

            image.getAllImages(Car_Stock_Num, (imagesFound) => {

                res.render(path.join(__dirname + '../../../Frontend/Pages/EditInventoryPage.ejs'), {
                    inventoryItem: item,
                    imageItems: imagesFound
                });
            })
        })
    }
    else{
        res.send("Access Denied")
    }
};