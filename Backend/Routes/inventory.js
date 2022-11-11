var db = require('../Database/db');

// get specified inventory item
function getSingleInventoryItem(Car_Stock_Num) {

    db.query('SELECT * FROM Inventory WHERE Car_Stock_Num = ?', [Car_Stock_Num],
        (error, results) => {
            if (error) throw error;
            return results[0];
        });
};

/// EDITED NEW OVER HERE
function getAllInventoryItems(callback){
    
    db.query('SELECT * FROM INVENTORY', (error, result) => {
        var items = [];
        if (error) throw error;
        Object.keys(result).forEach(function (key) {
            let row = result[key];
            let item = {
                stock: row.Car_Stock_Num,
                make: row.Car_Make,
                model: row.Car_Model,
                year: row.Car_Year,
                price: row.Car_Price,
                mileage: row.Car_Mileage,
                body: row.Car_BodyType,
                condition: row.Car_Condition,
                color: row.Car_Color
            };
            items.push(item);      
        });
        return callback(items);
    });
}

// add new inventory item
// return new Car_Stock_Num
function addNewVehicleItem(Car_Make, Car_Model, Car_Year, Car_Price, 
    Car_Mileage, Car_BodyType, Car_Condition, Car_Color) {
    
    db.query('INSERT INTO Inventory (Car_Make, Car_Model, Car_Year, Car_Price, Car_Mileage, Car_BodyType, Car_Condition, Car_Color)' +
    'VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
    [Car_Make, Car_Model, Car_Year, Car_Price, Car_Mileage, Car_BodyType, Car_Condition, Car_Color],
        (error, results) => {
            if (error) throw error;
            results.insertId;
        });
};

// update an inventory item
// return true if successfully, false otherwise
function updateVehicleItem(Car_Stock_Num, Car_Make, Car_Model, Car_Year, Car_Price, 
    Car_Mileage, Car_BodyType, Car_Condition, Car_Color) {
    
    db.query('UPDATE Inventory SET Car_Make = ?, Car_Model = ?, Car_Year = ?,' + 
    'Car_Price = ?, Car_Mileage = ?, Car_BodyType = ?, Car_Condition = ?, Car_Color = ? WHERE Car_Stock_Num = ?', 
    [Car_Make, Car_Model, Car_Year, Car_Price, Car_Mileage, Car_BodyType, Car_Condition, Car_Color, Car_Stock_Num],
        (error, results) => {
            if (error) throw error;
            if (results.affectedRows == 0) {
                return false;
            }
            return true;
        });
};

// delete an inventory item by car_stock_num 
// return true if successfull, false otherwise
function deleteInventoryItem(Car_Stock_Num) {
    
    db.query('DELETE FROM Inventory WHERE Car_Stock_Num = ?', [Car_Stock_Num],
        (error, result) => {
            if (error) throw error;
            if (result.affectedRows == 0) {
                return false;
            }
            return true;
        });
};

module.exports = {getSingleInventoryItem, getAllInventoryItems,
addNewVehicleItem, updateVehicleItem, deleteInventoryItem};
