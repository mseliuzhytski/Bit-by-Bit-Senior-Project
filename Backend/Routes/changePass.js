const alert = require('alert');
const path = require('path');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const db = require('../Database/db');

exports.get = function(req,res){
    res.render(path.join(__dirname+'../../../Frontend/Pages/ChangePassword.ejs'));
};

exports.post = async (req, res)=> {
    try{
        let username = req.body.username;
        let oldPassword = req.body.oldPassword;
        let password = req.body.newPassword;

        db.query('SELECT * FROM Employee WHERE Emp_username = ?', username,  async function(err,result, fields){
            if(err) throw error;
            if(result.length < 0) {
                res.render(path.join(__dirname+'../../../Frontend/Pages/ChangePassword.ejs'))
                alert("Username not in the database. Please make an account")
            }
            else{
            Object.keys(result).forEach(async function(key){
                let row = result[key];
                let passwordToCheck = row.Emp_PasswordHash;
                let isCorrectPassword = await bcrypt.compare(oldPassword, passwordToCheck);
                if(!isCorrectPassword){
                    res.render(path.join(__dirname+'../../../Frontend/Pages/ChangePassword.ejs'))
                    alert("Invalid Password")
                }
            });
            const hash = await bcrypt.hash(password,12)

             db.query('UPDATE Employee SET Emp_PasswordHash = ? WHERE Emp_username = ?', [hash, username], (error) => {
                if(error) throw error;
                res.render(path.join(__dirname+'../../../Frontend/Pages/Homepage.ejs'))
            });
            }
        });
    }catch{
        res.render(path.join(__dirname+'../../../Frontend/Pages/ChangePassword.ejs'))
    }
};
