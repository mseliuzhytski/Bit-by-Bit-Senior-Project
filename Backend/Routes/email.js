const alert = require('alert');
const path = require('path');
var db = require('../Database/db');

// get email entries for specified Emp_ID (if query parameter exists)
// otherwise, get all email entries
exports.get = async (req, res)=> { 
    try {
        var { Emp_ID } = req.query;

        if (Emp_ID) {
            getEmailsByID(Emp_ID, function(foundEmails) {
                if (foundEmails[0]) {
                    console.log(foundEmails);
                    res.status(200).sendFile(path.join(__dirname+'../../../Frontend/Pages/LandingPage.html'));
                }
                else {
                    res.status(400).sendFile(path.join(__dirname+'../../../Frontend/Pages/LandingPage.html'));
                    console.log("Emails for Emp_ID: " + Emp_ID + " do not exist.");
                    alert("Emails for Emp_ID: " + Emp_ID + " do not exist.");
                }
            });
        } 
        else {
            db.query('SELECT * FROM Email', 
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

// add or update an email entry
exports.post = async (req, res)=> {
    try {
        var { Emp_ID } = req.query;
        var { Emp_Email, Emp_UpdateEmail } = req.body;
        
        getEmployeeByID(Emp_ID, function(foundEmployee) {
            if (foundEmployee) {
                // update email entry
                if (Emp_UpdateEmail) {
                    getEmailsByID(Emp_ID, function(foundEmails) {
                        var found = foundEmails.some(id => id.Emp_Email === Emp_UpdateEmail);
                        if (!found) {
                            db.query('UPDATE Email SET Emp_Email = ? WHERE Emp_ID = ? AND Emp_Email = ?', [Emp_UpdateEmail, Emp_ID, Emp_Email],
                            (error, results) => {
                                if (error) throw error;
                                if (results.affectedRows > 0) {
                                    res.status(200).sendFile(path.join(__dirname+'../../../Frontend/Pages/LandingPage.html'));
                                    console.log("Successfully updated email entry for Emp_ID: " + Emp_ID);
                                }
                                else {
                                    res.status(400).sendFile(path.join(__dirname+'../../../Frontend/Pages/LandingPage.html'));
                                    console.log("Emp_Email: " + Emp_Email + " for Emp_ID " + Emp_ID + " does not exist. Email update was unsuccessful.");
                                    alert("Emp_Email: " + Emp_Email + " for Emp_ID " + Emp_ID + " does not exist. Email update was unsuccessful.");
                                }
                            });
                        }
                        else {
                            res.status(400).sendFile(path.join(__dirname+'../../../Frontend/Pages/LandingPage.html'));
                            console.log("Emp_Email: " + Emp_Email + " for Emp_ID " + Emp_ID + " already exist. Email update was unsuccessful.");
                            alert("Emp_Email: " + Emp_Email + " for Emp_ID " + Emp_ID + " already exist. Email update was unsuccessful.");
                        }
                    });  
                }
                // add new email entry
                else {
                    getEmailsByID(Emp_ID, function(foundEmails) {
                        var found = foundEmails.some(id => id.Emp_Email === Emp_Email);
                        if (!found) {
                            db.query('INSERT INTO Email (Emp_ID, Emp_Email) VALUES (?, ?)', [Emp_ID, Emp_Email],
                            (error, results) => {
                                if (error) throw error;
                                res.status(200).sendFile(path.join(__dirname+'../../../Frontend/Pages/LandingPage.html'));
                                console.log("Successfully added new Emp_Email: " + Emp_Email + " for Emp_ID: " + Emp_ID);
                            });
                        }
                        else {
                            res.status(400).sendFile(path.join(__dirname+'../../../Frontend/Pages/LandingPage.html'));
                            console.log("Emp_Email: " + Emp_Email + " for Emp_ID " + Emp_ID + " already exist. Email update was unsuccessful.");
                            alert("Emp_Email: " + Emp_Email + " for Emp_ID " + Emp_ID + " already exist. Email update was unsuccessful.");
                        }
                    });
                }
            }
            else {
                res.status(400).sendFile(path.join(__dirname+'../../../Frontend/Pages/LandingPage.html'));
                console.log("Emp_ID " + Emp_ID + " does not exist. Email update was unsuccessful.");
                alert("Emp_ID " + Emp_ID + " does not exist. Email update was unsuccessful.");
            }
        });
    } 
    catch {
        res.status(500).sendFile(path.join(__dirname+'../../../Frontend/Pages/LandingPage.html'));
        alert("Error processing request.");
    }
};

// delete an email entry
exports.delete = async (req, res)=> {
    try {
        var { Emp_ID } = req.query;
        var { Emp_Email } = req.body;

        getEmployeeByID(Emp_ID, function(foundEmployee) {
            if (foundEmployee) {
                db.query('DELETE FROM Email WHERE Emp_ID = ? AND Emp_Email = ?', [Emp_ID, Emp_Email],
                    (error, results) => {
                        if (error) throw error;
                        if (results.affectedRows > 0) {
                            console.log("Successfully deleted Emp_Email: " + Emp_Email + " for Emp_ID: " + Emp_ID);
                            res.status(200).sendFile(path.join(__dirname+'../../../Frontend/Pages/LandingPage.html'));
                        }
                        else {
                            res.status(400).sendFile(path.join(__dirname+'../../../Frontend/Pages/LandingPage.html'));
                            console.log("Emp_Email: " + Emp_Email + " for Emp_ID " + Emp_ID + " does not exist. Email deletion was unsuccessful.");
                            alert("Emp_Email: " + Emp_Email + " for Emp_ID " + Emp_ID + " does not exist. Email deletion was unsuccessful.");
                        }
                    }
                );
            } 
            else {
                res.status(400).sendFile(path.join(__dirname+'../../../Frontend/Pages/LandingPage.html'));
                console.log("Emp_ID " + Emp_ID + " does not exist. Email deletion was unsuccessful.");
                alert("Emp_ID " + Emp_ID + " does not exist. Email deletion was unsuccessful.");
            }
        });
    }
    catch {
        res.status(500).sendFile(path.join(__dirname+'../../../Frontend/Pages/LandingPage.html'));
        alert("Error processing request.");
    }
};

function getEmailsByID(Emp_ID, callback) {
    db.query('SELECT * FROM Email WHERE Emp_ID = ?', [Emp_ID],
        (error, results) => {
            if (error) throw error;
            if (results) {
                return callback(results);
            }
            return callback();
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