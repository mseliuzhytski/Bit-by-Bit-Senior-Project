const alert = require('alert');
var db = require('../Database/db');

// get specified inventory item
exports.getInventoryItem = function getInventoryItem(Car_Stock_Num, callback) {

    db.query('SELECT * FROM Inventory WHERE Car_Stock_Num = ?', [Car_Stock_Num],
        (error, results) => {
            if (error) throw error;
            return callback(results[0]);
        });
};

// get all inventory items
exports.getAllInventoryItems = function getAllInventoryItems(Car_Make, Car_Model, Car_Year, Car_Price, 
    Car_Mileage, Car_BodyType, Car_Condition, Car_Color, callback) {

    if (containsForbiddenInputs([Car_Make, Car_Model, Car_Year, Car_Price, Car_Mileage,
        Car_BodyType, Car_Condition, Car_Color])) {
        console.log("Invalid input found!!!");
    }

    // parameters which are undefined or "All" get set to default value
    if (!Car_Make || Car_Make === "All") { Car_Make = "Car_Make"; }
    if (!Car_Model || Car_Model === "All") { Car_Model = "Car_Model"; }
    if (!Car_Year || Car_Year === "All") { Car_Year = "Car_Year"; }
    if (!Car_Price || Car_Price === "All") { Car_Price = "Car_Price"; }
    if (!Car_Mileage || Car_Mileage === "All") { Car_Mileage = "Car_Mileage"; }
    if (!Car_BodyType || Car_BodyType === "All") { Car_BodyType = "Car_BodyType"; }
    if (!Car_Condition || Car_Condition === "All") { Car_Condition = "Car_Condition"; }
    if (!Car_Color || Car_Color === "All") { Car_Color = "Car_Color"; }

    // if params not defualt values, wrap in quotes for query
    if (Car_Make != "Car_Make") { Car_Make = "'" + Car_Make + "'" }
    if (Car_Model != "Car_Model") { Car_Model = "'" + Car_Model + "'" }
    if (Car_Year != "Car_Year") { Car_Year = "'" + Car_Year + "'" }
    if (Car_Price != "Car_Price") { Car_Price = "'" + Car_Price + "'" }
    if (Car_Mileage != "Car_Mileage") { Car_Mileage = "'" + Car_Mileage + "'" }
    if (Car_BodyType != "Car_BodyType") { Car_BodyType = "'" + Car_BodyType + "'" }
    if (Car_Condition != "Car_Condition") { Car_Condition = "'" + Car_Condition + "'" }
    if (Car_Color != "Car_Color") { Car_Color = "'" + Car_Color + "'" }
    
    db.query('SELECT * FROM Inventory WHERE Car_Make = ' + Car_Make + ' AND Car_Model = ' + Car_Model + 
    ' AND Car_Year = ' + Car_Year + ' AND Car_Price = ' + Car_Price + ' AND Car_Mileage = ' + Car_Mileage + 
    ' AND Car_BodyType = ' + Car_BodyType + ' AND Car_Condition = ' + Car_Condition + ' AND Car_Color = ' + Car_Color, 
        (error, results) => {
            if (error) throw error;
            return callback(results);
    });
};

// add or update an inventory item
exports.post = async (req, res)=> {
    if(typeof req.session.userInfo !== 'undefined'){
        try {
            var { Car_Stock_Num } = req.query;
            var { Car_Make, Car_Model, Car_Year, Car_Price, 
                Car_Mileage, Car_BodyType, Car_Condition, Car_Color } = req.body;

            // update inventory item
            if (Car_Stock_Num) {
                getInventoryItemFunc(Car_Stock_Num, function(foundVehicle) {
                    if (foundVehicle) {
                        db.query('UPDATE Inventory SET Car_Make = ?, Car_Model = ?, Car_Year = ?,' + 
                        'Car_Price = ?, Car_Mileage = ?, Car_BodyType = ?, Car_Condition = ?, Car_Color = ? WHERE Car_Stock_Num = ?', 
                        [Car_Make, Car_Model, Car_Year, Car_Price, Car_Mileage, Car_BodyType, Car_Condition, Car_Color, Car_Stock_Num],
                            (error) => {
                                if (error) throw error;
                                res.status(200).redirect('/LandingPage.ejs');
                                alert("Successfully updated inventory item: " + Car_Stock_Num);
                            }
                        ); 
                    }
                    else {
                        res.status(400).redirect('/EditInventoryPage.ejs');
                        alert("Car_Stock_Num " + Car_Stock_Num + " does not exist. Update unsuccessful.");
                    }
                });
            }
            // add new inventory item
            else {
                db.query('INSERT INTO Inventory (Car_Make, Car_Model, Car_Year, Car_Price, Car_Mileage, Car_BodyType, Car_Condition, Car_Color)' +
                'VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
                [Car_Make, Car_Model, Car_Year, Car_Price, Car_Mileage, Car_BodyType, Car_Condition, Car_Color],
                    (error) => {
                        if (error) throw error;
                        res.status(200).redirect('/LandingPage.ejs');
                        alert("Successfully added new inventory item: " + Car_Stock_Num);
                    }
                ); 
            }
        } 
        catch {
            res.status(500).redirect('/EditInventoryPage.ejs');
            alert("Error processing request.");
        }
    }
    else{
        res.send("Access denied")
    }
};

// delete an inventory item by car_stock_num
exports.delete = async (req, res)=> {
    if(typeof req.session.userInfo !== 'undefined'){
        try {
            var { Car_Stock_Num } = req.query;

            getInventoryItemFunc(Car_Stock_Num, function(foundVehicle) {
                if (foundVehicle) {
                    db.query('DELETE FROM Inventory WHERE Car_Stock_Num = ?', [Car_Stock_Num],
                        (error) => {
                            if (error) throw error;
                            res.status(200).redirect('/LandingPage.ejs');
                            alert("Successfully deleted inventory item: " + Car_Stock_Num);
                        }
                    );
                } 
                else {
                    res.status(400).redirect('/EditInventoryPage.ejs');
                    alert("Car_Stock_Num " + Car_Stock_Num + " does not exist. Deletion unsuccessful.");
                }
            });
        }
        catch {
            res.status(500).redirect('/EditInventoryPage.ejs');
            alert("Error processing request.");
        }
    }
    else{
        res.send("Access Denied")
    }
};

function getInventoryItemFunc(Car_Stock_Num, callback) {

    db.query('SELECT * FROM Inventory WHERE Car_Stock_Num = ?', [Car_Stock_Num],
        (error, results) => {
            if (error) throw error;
            return callback(results[0]);
        });
};

function containsForbiddenInputs(filters) {
    var forbiddenInputs = ["drop", "update", "delete", "insert", "into", "create", "table", "altar", "database", "index", "where", "join", "and", "(", ")", ";"]
    
    var foundForbiddenWord = false;

    filters.forEach((filter) => {
        if (!foundForbiddenWord && filter) {
            forbiddenInputs.forEach((forbiddenInput) => {
                if (filter.includes(forbiddenInput)) {
                    console.log("Forbidden word: " + forbiddenInput);
                    foundForbiddenWord = true;
                }
            });
        }
    });
    return foundForbiddenWord;
}