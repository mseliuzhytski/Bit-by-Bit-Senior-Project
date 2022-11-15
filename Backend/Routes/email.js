const alert = require('alert');
const path = require('path');
var db = require('../Database/db');

// get all emails for specified employee
exports.getSingleEmployeeEmails = function getSingleEmployeeEmails(Emp_ID, callback) {
    db.query('SELECT * FROM Email WHERE Emp_ID = ?', [Emp_ID],
        (error, results) => {
            if (error) throw error;
            return callback(results);
        });
};

// get all emails for all employees
exports.getAllEmployeeEmails = function getAllEmployeeEmails(callback) {
    db.query('SELECT * FROM Email',
        (error, results) => {
            if (error) throw error;
            return callback(results);
        });
};

// add a new email entry
exports.post = async (req, res)=> {
    if(typeof req.session.userInfo !== 'undefined'){
        try {
            var { Emp_ID } = req.query;
            var { Emp_Email } = req.body;
            
            getEmployeeByID(Emp_ID, function(foundEmployee) {
                if (foundEmployee) {
                    getSingleEmployeeEmailsFunc(Emp_ID, function(foundEmails) {
                            var found = foundEmails.some(id => id.Emp_Email === Emp_Email);
                            if (!found) {
                                db.query('INSERT INTO Email (Emp_ID, Emp_Email) VALUES (?, ?)', [Emp_ID, Emp_Email],
                                (error) => {
                                    if (error) throw error;
                                    res.status(200).redirect('/AdminPage.ejs');
                                    alert("Successfully added new Emp_Email: " + Emp_Email + " for Emp_ID: " + Emp_ID);
                                });
                            }
                            else {
                                res.status(400).redirect('/AdminEditPage.ejs?Emp_ID=' + Emp_ID);
                                alert("Emp_Email: " + Emp_Email + " for Emp_ID " + Emp_ID + " already exist. Email update was unsuccessful.");
                            }
                        });
                }
                else {
                    res.status(400).redirect('/AdminEditPage.ejs?Emp_ID=' + Emp_ID);
                    alert("Emp_ID " + Emp_ID + " does not exist. Email update was unsuccessful.");
                }
            });
        } 
        catch {
            res.status(500).redirect('/AdminEditPage.ejs?Emp_ID=' + Emp_ID);
            alert("Error processing request.");
        }
    }
    else{
        res.send("Access Denied")
    }
};

// delete an email entry
exports.delete = async (req, res)=> {
    if(typeof req.session.userInfo !== 'undefined'){
        try {
            var { Emp_ID } = req.query;
            var { Emp_Email } = req.body;

            getEmployeeByID(Emp_ID, function(foundEmployee) {
                if (foundEmployee) {
                    if (Emp_Email) {
                        db.query('DELETE FROM Email WHERE Emp_ID = ? AND Emp_Email = ?', [Emp_ID, Emp_Email],
                            (error, results) => {
                                if (error) throw error;
                                if (results.affectedRows > 0) {
                                    res.status(200).redirect('/AdminPage.ejs');
                                    alert("Successfully deleted Emp_Email: " + Emp_Email + " for Emp_ID: " + Emp_ID);
                                }
                                else {
                                    res.status(400).redirect('/AdminEditPage.ejs?Emp_ID=' + Emp_ID);
                                    alert("Emp_Email: " + Emp_Email + " for Emp_ID " + Emp_ID + " does not exist. Email deletion was unsuccessful.");
                                }
                            }
                        );
                    }
                    else {
                        db.query('DELETE FROM Email WHERE Emp_ID = ?', [Emp_ID],
                            (error) => {
                                if (error) throw error;
                                res.status(200).redirect('/AdminPage.ejs');
                                alert("Successfully deleted all Emp_Emails for Emp_ID: " + Emp_ID);
                            }
                        );
                    }
                } 
                else {
                    res.status(400).redirect('/AdminEditPage.ejs?Emp_ID=' + Emp_ID);
                    alert("Emp_ID " + Emp_ID + " does not exist. Email deletion was unsuccessful.");
                }
            });
        }
        catch {
            res.status(500).redirect('/AdminEditPage.ejs?Emp_ID=' + Emp_ID);
            alert("Error processing request.");
        }
    }
    else{
        res.send("Access Denied")
    }
};

function getSingleEmployeeEmailsFunc(Emp_ID, callback) {
    db.query('SELECT * FROM Email WHERE Emp_ID = ?', [Emp_ID],
        (error, results) => {
            if (error) throw error;
            return callback(results);
        });
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