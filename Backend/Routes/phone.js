const alert = require('alert');
const path = require('path');
var db = require('../Database/db');

exports.getSingleEmployeePhones = function getSingleEmployeePhones(Emp_ID, callback) {
    db.query('SELECT * FROM Phone WHERE Emp_ID = ?', [Emp_ID],
        (error, results) => {
            if (error) throw error;
            return callback(results);
        });
};

exports.getAllEmployeePhones = function getAllEmployeePhones(callback) {
    db.query('SELECT * FROM Phone',
        (error, results) => {
            if (error) throw error;
            return callback(results);
        });
};

// add a new phone entry
exports.post = async (req, res)=> {
    if(typeof req.session.userInfo !== 'undefined'){
        try {
            var { Emp_ID } = req.query;
            var { Emp_Phone } = req.body;
            
            getEmployeeByID(Emp_ID, function(foundEmployee) {
                if (foundEmployee) {
                        getPhonesByID(Emp_ID, function(foundPhones) {
                            var found = foundPhones.some(id => id.Emp_Phone === Emp_Phone);
                            if (!found) {
                                db.query('INSERT INTO Phone (Emp_ID, Emp_Phone) VALUES (?, ?)', [Emp_ID, Emp_Phone],
                                (error, results) => {
                                    if (error) throw error;
                                    res.status(200).redirect('/AdminPage.ejs');
                                    alert("Successfully added new Emp_Phone: " + Emp_Phone + " for Emp_ID: " + Emp_ID);
                                }); 
                            }
                            else {
                                res.status(400).redirect('/AdminEditPage.ejs');
                                alert("Emp_Phone: " + Emp_Phone + " for Emp_ID " + Emp_ID + " already exist. Phone update was unsuccessful.");
                            }
                        });
                    }
                else {
                    res.status(400).redirect('/AdminEditPage.ejs');
                    alert("Emp_ID " + Emp_ID + " does not exist. Phone update was unsuccessful.");
                }
            });
        } 
        catch {
            res.status(500).redirect('/AdminEditPage.ejs');
            alert("Error processing request.");
        }
    }
    else{
        res.send("Access Denied")
    }
};

// delete a phone entry
exports.delete = async (req, res)=> {
    if(typeof req.session.userInfo !== 'undefined'){
        try {
            var { Emp_ID } = req.query;
            var { Emp_Phone } = req.body;

            getEmployeeByID(Emp_ID, function(foundEmployee) {
                if (foundEmployee) {
                    db.query('DELETE FROM Phone WHERE Emp_ID = ? AND Emp_Phone = ?', [Emp_ID, Emp_Phone],
                        (error, results) => {
                            if (error) throw error;
                            if (results.affectedRows > 0) {
                                res.status(200).redirect('/AdminPage.ejs');
                                alert("Successfully deleted Emp_Phone: " + Emp_Phone + " for Emp_ID: " + Emp_ID);
                            }
                            else {
                                res.status(400).redirect('/AdminEditPage.ejs');
                                alert("Emp_Phone: " + Emp_Phone + " for Emp_ID " + Emp_ID + " does not exist. Phone deletion was unsuccessful.");
                            }
                        }
                    );
                } 
                else {
                    res.status(400).redirect('/AdminEditPage.ejs');
                    alert("Emp_ID " + Emp_ID + " does not exist. Phone deletion was unsuccessful.");
                }
            });
        }
        catch (error) {
            res.status(500).redirect('/AdminEditPage.ejs');
            alert("Error processing request.");
        }
    }
    else{
        res.send("Access Denied")
    }
};

function getEmployeeByID(Emp_ID, callback) {
    db.query('SELECT * FROM Employee WHERE Emp_ID = ?', [Emp_ID],
        (error, results) => {
            if (error) throw error;
            if (results) {
                return callback(results[0]);
            }
            return callback();
        });
};