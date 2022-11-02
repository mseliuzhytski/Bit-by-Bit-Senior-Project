const alert = require('alert');
const path = require('path');
var db = require('../Database/db');

// get phone entries for specified Emp_ID (if query parameter exists)
// otherwise, get all phone entries
exports.get = async (req, res)=> { 
    try {
        var { Emp_ID } = req.query;

        if (Emp_ID) {
            getPhonesByID(Emp_ID, function(foundPhones) {
                if (foundPhones[0]) {
                    console.log(foundPhones);
                    res.status(200).sendFile(path.join(__dirname+'../../../Frontend/Pages/LandingPage.html'));
                }
                else {
                    res.status(400).sendFile(path.join(__dirname+'../../../Frontend/Pages/LandingPage.html'));
                    console.log("Phones for Emp_ID: " + Emp_ID + " do not exist.");
                    alert("Phones for Emp_ID: " + Emp_ID + " do not exist.");
                }
            });
        } 
        else {
            db.query('SELECT * FROM Phone', 
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

// add or update a phone entry
exports.post = async (req, res)=> {
    try {
        var { Emp_ID } = req.query;
        var { Emp_Phone, Emp_UpdatePhone } = req.body;
        
        getEmployeeByID(Emp_ID, function(foundEmployee) {
            if (foundEmployee) {
                // update phone entry
                if (Emp_UpdatePhone) {
                    getPhonesByID(Emp_ID, function(foundPhones) {
                        var found = foundPhones.some(id => id.Emp_Phone === Emp_UpdatePhone);
                        if (!found) {
                            db.query('UPDATE Phone SET Emp_Phone = ? WHERE Emp_ID = ? AND Emp_Phone = ?', [Emp_UpdatePhone, Emp_ID, Emp_Phone],
                            (error, results) => {
                                if (error) throw error;
                                if (results.affectedRows > 0) {
                                    res.status(200).sendFile(path.join(__dirname+'../../../Frontend/Pages/LandingPage.html'));
                                    console.log("Successfully updated phone entry for Emp_ID: " + Emp_ID);
                                }
                                else {
                                    res.status(400).sendFile(path.join(__dirname+'../../../Frontend/Pages/LandingPage.html'));
                                    console.log("Emp_Phone: " + Emp_Phone + " for Emp_ID " + Emp_ID + " does not exist. Phone update was unsuccessful.");
                                    alert("Emp_Phone: " + Emp_Phone + " for Emp_ID " + Emp_ID + " does not exist. Phone update was unsuccessful.");
                                }
                            });
                        }
                        else {
                            res.status(400).sendFile(path.join(__dirname+'../../../Frontend/Pages/LandingPage.html'));
                            console.log("Emp_Phone: " + Emp_Phone + " for Emp_ID " + Emp_ID + " already exist. Phone update was unsuccessful.");
                            alert("Emp_Phone: " + Emp_Phone + " for Emp_ID " + Emp_ID + " already exist. Phone update was unsuccessful.");
                        }
                    });     
                }
                // add new phone entry
                else {
                    getPhonesByID(Emp_ID, function(foundPhones) {
                        var found = foundPhones.some(id => id.Emp_Phone === Emp_Phone);
                        if (!found) {
                            db.query('INSERT INTO Phone (Emp_ID, Emp_Phone) VALUES (?, ?)', [Emp_ID, Emp_Phone],
                            (error, results) => {
                                if (error) throw error;
                                res.status(200).sendFile(path.join(__dirname+'../../../Frontend/Pages/LandingPage.html'));
                                console.log("Successfully added new Emp_Phone: " + Emp_Phone + " for Emp_ID: " + Emp_ID);
                            }); 
                        }
                        else {
                            res.status(400).sendFile(path.join(__dirname+'../../../Frontend/Pages/LandingPage.html'));
                            console.log("Emp_Phone: " + Emp_Phone + " for Emp_ID " + Emp_ID + " already exist. Phone update was unsuccessful.");
                            alert("Emp_Phone: " + Emp_Phone + " for Emp_ID " + Emp_ID + " already exist. Phone update was unsuccessful.");
                        }
                    });
                }
            }
            else {
                res.status(400).sendFile(path.join(__dirname+'../../../Frontend/Pages/LandingPage.html'));
                console.log("Emp_ID " + Emp_ID + " does not exist. Phone update was unsuccessful.");
                alert("Emp_ID " + Emp_ID + " does not exist. Phone update was unsuccessful.");
            }
        });
    } 
    catch {
        res.status(500).sendFile(path.join(__dirname+'../../../Frontend/Pages/LandingPage.html'));
        alert("Error processing request.");
    }
};

// delete a phone entry
exports.delete = async (req, res)=> {
    try {
        var { Emp_ID } = req.query;
        var { Emp_Phone } = req.body;

        getEmployeeByID(Emp_ID, function(foundEmployee) {
            if (foundEmployee) {
                db.query('DELETE FROM Phone WHERE Emp_ID = ? AND Emp_Phone = ?', [Emp_ID, Emp_Phone],
                    (error, results) => {
                        if (error) throw error;
                        if (results.affectedRows > 0) {
                            res.status(200).sendFile(path.join(__dirname+'../../../Frontend/Pages/LandingPage.html'));
                            console.log("Successfully deleted Emp_Phone: " + Emp_Phone + " for Emp_ID: " + Emp_ID);
                        }
                        else {
                            res.status(400).sendFile(path.join(__dirname+'../../../Frontend/Pages/LandingPage.html'));
                            console.log("Emp_Phone: " + Emp_Phone + " for Emp_ID " + Emp_ID + " does not exist. Phone deletion was unsuccessful.");
                            alert("Emp_Phone: " + Emp_Phone + " for Emp_ID " + Emp_ID + " does not exist. Phone deletion was unsuccessful.");
                        }
                    }
                );
            } 
            else {
                res.status(400).sendFile(path.join(__dirname+'../../../Frontend/Pages/LandingPage.html'));
                console.log("Emp_ID " + Emp_ID + " does not exist. Phone deletion was unsuccessful.");
                alert("Emp_ID " + Emp_ID + " does not exist. Phone deletion was unsuccessful.");
            }
        });
    }
    catch (error) {
        res.status(500).sendFile(path.join(__dirname+'../../../Frontend/Pages/LandingPage.html'));
        alert("Error processing request.");
    }
};

function getPhonesByID(Emp_ID, callback) {
    db.query('SELECT * FROM Phone WHERE Emp_ID = ?', [Emp_ID],
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