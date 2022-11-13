const alert = require('alert');
const path = require('path');
var db = require('../Database/db');

// get specified employee entry
exports.getEmployee = function getEmployee(Emp_ID, callback) {

    db.query('SELECT * FROM Employee WHERE Emp_ID = ?', [Emp_ID],
        (error, results) => {
            if (error) throw error;
            return callback(results[0]);
        });
};

// get all employees
exports.getAllEmployees = function getAllEmployees(callback) {

    db.query('SELECT * FROM Employee', 
        (error, results) => {
            if (error) throw error;
            return callback(results);
    });
}

// update an employee entry
exports.post = async (req, res)=> {
    try {
        var { Emp_ID } = req.query;
        var { Emp_Username, Emp_FirstName, Emp_LastName, Emp_Role } = req.body;
        
        // update employee entry
        getEmployee(Emp_ID, function(foundEmployee) {
            if (foundEmployee) {
                db.query('UPDATE Employee SET Emp_Username = ?, Emp_FirstName = ?,' + 
                'Emp_LastName = ?, Emp_Role = ? WHERE Emp_ID = ?', 
                [Emp_Username, Emp_FirstName, Emp_LastName, Emp_Role, Emp_ID],
                    (error) => {
                        if (error) throw error;
                        res.status(200).redirect('/AdminPage.ejs');
                        alert("Successfully updated emplyee entry. Emp_ID: " + Emp_ID);
                    }
                ); 
            }
            else {
                res.status(400).redirect('/AdminEditPage.ejs');
                alert("Emp_ID " + Emp_ID + " does not exist. Update unsuccessful.");
            }
        });
        
    } 
    catch {
        res.status(500).redirect('/AdminEditPage.ejs');
        alert("Error processing request.");
    }
};

// delete an employee entry by Emp_ID
exports.delete = async (req, res)=> {
    try {
        var { Emp_ID } = req.query;

        getEmployee(Emp_ID, function(foundEmployee) {
            if (foundEmployee) {
                db.query('DELETE FROM Employee WHERE Emp_ID = ?', [Emp_ID],
                    (error) => {
                        if (error) throw error;
                        res.status(200).redirect('/AdminPage.ejs');
                        alert("Successfully deleted employee entry: " + Emp_ID);
                    }
                );
            } 
            else {
                res.status(400).redirect('/AdminEditPage.ejs');
                alert("Emp_ID " + Emp_ID + " does not exist. Deletion unsuccessful.");
            }
        });
    }
    catch {
        res.status(500).redirect('/AdminEditPage.ejs');
        alert("Error processing request.");
    }
};