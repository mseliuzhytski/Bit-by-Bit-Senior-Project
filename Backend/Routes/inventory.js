const alert = require('alert');
const path = require('path');
var db = require('../Database/db');

// get specified inventory item (if query parameter exists)
// otherwise, get all inventory items
exports.get = async (req, res)=> { 
    try {
        var { Car_Stock_Num } = req.query;

        if (Car_Stock_Num) {
            getVehicleByID(Car_Stock_Num, function(foundVehicle) {
                if (foundVehicle) {
                    console.log(foundVehicle);
                    res.status(200).render(path.join(__dirname+'../../../Frontend/Pages/Search.ejs'));
                    /*
                    var yearMakeModel = foundVehicle.Car_Year + " " + foundVehicle.Car_Make + " " + foundVehicle.Car_Model;
                    var priceTest = "$" + foundVehicle.Car_Price;
                    var mileageTest = "Mileage: " + foundVehicle.Car_Mileage;

                    res.render(path.join(__dirname+'../../../Frontend/Pages/Search.ejs'),{
                        yearMakeModelTest: yearMakeModel, 
                        priceTest: priceTest, 
                        mileageTest: mileageTest});
                    */
                }
                else {
                    res.status(400).render(path.join(__dirname+'../../../Frontend/Pages/Search.ejs'));
                    console.log("Car_Stock_Num " + Car_Stock_Num + " does not exist.");
                    alert("Car_Stock_Num " + Car_Stock_Num + " does not exist.");
                }
            });
        } 
        else {
            db.query('SELECT * FROM Inventory', 
                (error, results) => {
                    if (error) throw error;
                    console.log(results);
                    res.status(200).render(path.join(__dirname+'../../../Frontend/Pages/Search.ejs'));
                }
            );
        }
    }
    catch {
        res.status(500).render(path.join(__dirname+'../../../Frontend/Pages/Search.ejs'));
        alert("Error processing request.");
    }
};

// add or update an inventory item
exports.post = async (req, res)=> {
    try {
        var { Car_Stock_Num } = req.query;
        var { Car_Make, Car_Model, Car_Year, Car_Price, 
            Car_Mileage, Car_BodyType, Car_Condition, Car_Color } = req.body;
        
        // update inventory item
        if (Car_Stock_Num) {
            getVehicleByID(Car_Stock_Num, function(foundVehicle) {
                if (foundVehicle) {
                    db.query('UPDATE Inventory SET Car_Make = ?, Car_Model = ?, Car_Year = ?,' + 
                    'Car_Price = ?, Car_Mileage = ?, Car_BodyType = ?, Car_Condition = ?, Car_Color = ? WHERE Car_Stock_Num = ?', 
                    [Car_Make, Car_Model, Car_Year, Car_Price, Car_Mileage, Car_BodyType, Car_Condition, Car_Color, Car_Stock_Num],
                        (error) => {
                            if (error) throw error;
                            console.log("Successfully updated inventory item. Car_Stock_Num: " + Car_Stock_Num);
                            res.status(200).render(path.join(__dirname+'../../../Frontend/Pages/Search.ejs'));
                        }
                    ); 
                }
                else {
                    res.status(400).render(path.join(__dirname+'../../../Frontend/Pages/Search.ejs'));
                    console.log("Car_Stock_Num " + Car_Stock_Num + " does not exist. Update unsuccessful.");
                    alert("Car_Stock_Num " + Car_Stock_Num + " does not exist. Update unsuccessful.");
                }
            });
        }
        // add new inventory item
        else {
            db.query('INSERT INTO Inventory (Car_Make, Car_Model, Car_Year, Car_Price, Car_Mileage, Car_BodyType, Car_Condition, Car_Color)' +
            'VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
            [Car_Make, Car_Model, Car_Year, Car_Price, Car_Mileage, Car_BodyType, Car_Condition, Car_Color],
                (error, results) => {
                    if (error) throw error;
                    console.log("Successfully added new inventory item. Car_Stock_Num: " + results.insertId);
                    res.status(200).render(path.join(__dirname+'../../../Frontend/Pages/Search.ejs'));
                }
            ); 
        }
    } 
    catch {
        res.status(500).render(path.join(__dirname+'../../../Frontend/Pages/Search.ejs'));
        alert("Error processing request.");
    }
};

// delete an inventory item by car_stock_num
exports.delete = async (req, res)=> {
    try {
        var { Car_Stock_Num } = req.query;

        getVehicleByID(Car_Stock_Num, function(foundVehicle) {
            if (foundVehicle) {
                db.query('DELETE FROM Inventory WHERE Car_Stock_Num = ?', [Car_Stock_Num],
                    (error) => {
                        if (error) throw error;
                        console.log("Successfully deleted inventory item: " + Car_Stock_Num);
                        res.status(200).render(path.join(__dirname+'../../../Frontend/Pages/Search.ejs'));
                    }
                );
            } 
            else {
                res.status(400).render(path.join(__dirname+'../../../Frontend/Pages/Search.ejs'));
                console.log("Car_Stock_Num " + Car_Stock_Num + " does not exist. Deletion unsuccessful.");
                alert("Car_Stock_Num " + Car_Stock_Num + " does not exist. Deletion unsuccessful.");
            }
        });
    }
    catch {
        res.status(500).render(path.join(__dirname+'../../../Frontend/Pages/Search.ejs'));
        alert("Error processing request.");
    }
};

function getVehicleByID(Car_Stock_Num, callback) {
    db.query('SELECT * FROM Inventory WHERE Car_Stock_Num = ?', [Car_Stock_Num],
        (error, results) => {
            if (error) throw error;
            if (results[0]) {
                return callback(results[0]);
            }
            return callback();
        })
};