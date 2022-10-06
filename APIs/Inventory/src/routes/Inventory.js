import express from "express"
import { getDbConnection } from '@Common';
export const Inventory = express.Router()



// the name of the url /inventory/getAllInventory
Inventory.route("/getAllInventory").get((req, res) => {
    // return all Inventory

    const conn = getDbConnection()
    
    conn.execute(
        'SELECT * FROM inventory',
        function(err, results, fields) {
            res.json(results)
        }
    )
})

// /inventory/add
Inventory.route("/add").post((req, res) => {
    // add new Inventory

    const Car_Name = req.body.Car_Name
    const Car_Type = req.body.Car_Type
    const Car_Price = req.body.Car_Price

    const conn = getDbConnection()
    
    conn.execute(
        'INSERT INTO inventory (Car_Name, Car_Type, Car_Price) VALUES (?, ?, ?)',
        [Car_Name, Car_Type, Car_Price],
        function(err, results, fields) {
            console.log(err, results, fields)
        }
    )

    res.send(".")
})



// /inventory/remove/
Inventory.route("/remove/:id").delete((req, res) => {
    // delete a Inventory by id
    
    const conn = getDbConnection()
    
    conn.execute(
        'DELETE FROM inventory WHERE CAR_Stock_Num = ?',
        [req.params.id],
        function(err, results, fields) {
            res.json(results)
        }
    )

    
})
