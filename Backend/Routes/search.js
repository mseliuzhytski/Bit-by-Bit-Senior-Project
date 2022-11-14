const path = require('path');
const inventory = require('./inventory');
const image = require('./image');

exports.get = function(req, res) {
    var { Car_Make, Car_Model, Car_Year, Car_Price, Car_Mileage,
    Car_BodyType, Car_Condition, Car_Color } = req.query;

    inventory.getAllInventoryItems(Car_Make, Car_Model, Car_Year, 
        Car_Price, Car_Mileage, Car_BodyType, Car_Condition, Car_Color, (items) => {

            var currentQueryParams = [Car_Make, Car_Model, Car_Year, 
                Car_Price, Car_Mileage, Car_BodyType, Car_Condition, Car_Color];

            var imageItemSum = [];
            var countDown = items.length;

            if (countDown > 0) {
                items.forEach((item) => {
                    image.getAllImages(item.Car_Stock_Num, (imagesFound) => {
                        
                        if (imagesFound[0]) {
                            imageItemSum.push(imagesFound)
                        }
                        countDown--;

                        if (countDown === 0) {
                            res.render(path.join(__dirname+'../../../Frontend/Pages/Search.ejs'), {
                                inventoryItems: items,
                                imageItems: imageItemSum,
                                filtersParams: currentQueryParams,
                                isLoggedIn: typeof req.session.userInfo !== 'undefined'
                            });
                        };
                    });
                });
            }
            else {
                res.render(path.join(__dirname+'../../../Frontend/Pages/Search.ejs'), {
                    inventoryItems: [],
                    imageItems: [],
                    filtersParams: currentQueryParams,
                    isLoggedIn: typeof req.session.userInfo !== 'undefined'
                });
            };
        });
};
