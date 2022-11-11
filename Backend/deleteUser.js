const db = require("./Database/db");


//Params: Employee ID
//Returns: Either a 1 or 0 which correlate to true or false depending on if the user was deleted in form of a callback function
//Usage: Trys to delete user without having to call a route
function deleteUser(employeeId, callback){
    db.query('DELETE FROM EMAIL WHERE EMP_ID = ?', employeeId, function(err, res){
        if(err) throw err;
        db.query('DELETE FROM PHONE WHERE EMP_ID = ?', employeeId, function(err, res){
            if(err) throw err;
            db.query('DELETE FROM EMPLOYEE WHERE EMP_ID = ?', employeeId, function(err, res){
                if(err) throw err;
                if(res.affectedRows > 0){
                    return callback(1);
                }
                return callback(0);
            });
        });
    });
}

module.exports = deleteUser;