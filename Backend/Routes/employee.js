const alert = require('alert');
const path = require('path');
var db = require('../Database/db');

// get specified employee entry (if query parameter exists)
// otherwise, get all employee entries
exports.get = async (req, res)=> { 
    try {
        var { Emp_ID } = req.query;

        if (Emp_ID) {
            getEmployeeByID(Emp_ID, function(foundEmployee) {
                if (foundEmployee) {
                    //document.getElementById("results").innerHTML = foundEmployee;
                    res.json(foundEmployee);
                    console.log(foundEmployee);
                    res.status(200).sendFile(path.join(__dirname+'../../../Frontend/Pages/LandingPage.html'));
                }
                else {
                    res.status(400).sendFile(path.join(__dirname+'../../../Frontend/Pages/LandingPage.html'));
                    console.log("Emp_ID: " + Emp_ID + " does not exist.");
                    alert("Emp_ID: " + Emp_ID + " does not exist.");
                }
            });
        } 
        else {
            db.query('SELECT * FROM Employee', 
                (error, results) => {
                    if (error) throw error;
                    console.log(results);
                    res.status(200).sendFile(path.join(__dirname+'../../../Frontend/Pages/LandingPage.html'));
                }
            );
        }
    }
    catch {
        res.status(500).sendFile(path.join(__dirname+'../../../Frontend/Pages/LandingPage.html'));
        alert("Error processing request.");
    }
};

// add or update an employee entry
exports.post = async (req, res)=> {
    try {
        var { Emp_ID } = req.query;
        var { Emp_Username, Emp_PasswordHash, Emp_FirstName, Emp_LastName, Emp_Role } = req.body;
        
        // update employee entry
        if (Emp_ID) {
            getEmployeeByID(Emp_ID, function(foundEmployee) {
                if (foundEmployee) {
                    db.query('UPDATE Employee SET Emp_Username = ?, Emp_PasswordHash = ?, Emp_FirstName = ?,' + 
                    'Emp_LastName = ?, Emp_Role = ? WHERE Emp_ID = ?', 
                    [Emp_Username, Emp_PasswordHash, Emp_FirstName, Emp_LastName, Emp_Role, Emp_ID],
                        (error) => {
                            if (error) throw error;
                            res.status(200).sendFile(path.join(__dirname+'../../../Frontend/Pages/LandingPage.html'));
                            console.log("Successfully updated emplyee entry. Emp_ID: " + Emp_ID);
                        }
                    ); 
                }
                else {
                    res.status(400).sendFile(path.join(__dirname+'../../../Frontend/Pages/LandingPage.html'));
                    console.log("Emp_ID " + Emp_ID + " does not exist. Update unsuccessful.");
                    alert("Emp_ID " + Emp_ID + " does not exist. Update unsuccessful.");
                }
            });
        }
        // add new employee entry
        else {
            db.query('INSERT INTO Employee (Emp_Username, Emp_PasswordHash, Emp_FirstName, Emp_LastName, Emp_Role)' +
            'VALUES (?, ?, ?, ?, ?)', 
            [Emp_Username, Emp_PasswordHash, Emp_FirstName, Emp_LastName, Emp_Role],
                (error, results) => {
                    if (error) throw error;
                    res.status(200).sendFile(path.join(__dirname+'../../../Frontend/Pages/LandingPage.html'));
                    console.log("Successfully added new employee entry. Emp_ID: " + results.insertId);
                }
            );
        }
    } 
    catch {
        res.status(500).sendFile(path.join(__dirname+'../../../Frontend/Pages/LandingPage.html'));
        alert("Error processing request.");
    }
};

// delete an employee entry by Emp_ID
exports.delete = async (req, res)=> {
    try {
        var { Emp_ID } = req.query;

        getEmployeeByID(Emp_ID, function(foundEmployee) {
            if (foundEmployee) {
                db.query('DELETE FROM Employee WHERE Emp_ID = ?', [Emp_ID],
                    (error) => {
                        if (error) throw error;
                        console.log("Successfully deleted employee entry: " + Emp_ID);
                        res.status(200).sendFile(path.join(__dirname+'../../../Frontend/Pages/LandingPage.html'));
                    }
                );
            } 
            else {
                res.status(400).sendFile(path.join(__dirname+'../../../Frontend/Pages/LandingPage.html'));
                console.log("Emp_ID " + Emp_ID + " does not exist. Deletion unsuccessful.");
                alert("Emp_ID " + Emp_ID + " does not exist. Deletion unsuccessful.");
            }
        });
    }
    catch {
        res.status(500).sendFile(path.join(__dirname+'../../../Frontend/Pages/LandingPage.html'));
        alert("Error processing request.");
    }
};

function getEmployeeByID(Emp_ID, callback) {
    db.query('SELECT * FROM Employee WHERE Emp_ID = ?', [Emp_ID],
        (error, results) => {
            if (error) throw error;
            if (results[0]) {
                return callback(results[0]);
            }
            return callback();
        });
};