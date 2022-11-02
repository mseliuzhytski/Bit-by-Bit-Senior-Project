const alert = require('alert');
const path = require('path');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const db = require('../Database/db');

exports.get = function(req,res){
        res.render(path.join(__dirname+'../../../Frontend/Pages/Login.ejs'));
    };

exports.post = async (req, res)=> {
    try{
        let username = req.body.username;
        let password = req.body.password;

        db.query('SELECT * FROM Employee WHERE Emp_username = ?', username,  async function(err,result, fields){
            if(err) throw error;
            if(result.length <= 0) {
                res.render(path.join(__dirname+'../../../Frontend/Pages/Login.ejs'))
                alert("Invalid Username")
            }
            
            Object.keys(result).forEach(async function(key){
                let row = result[key];
                let passwordToCheck = row.Emp_PasswordHash;
                let isCorrectPassword = await bcrypt.compare(password, passwordToCheck);
                if(isCorrectPassword){
                    res.render(path.join(__dirname+'../../../Frontend/Pages/Homepage.ejs'))
                }
                else{
                    res.render(path.join(__dirname+'../../../Frontend/Pages/Login.ejs'))
                    alert("Invalid Password")
                }
            });

        });
    }catch{
        res.render(path.join(__dirname+'../../../Frontend/Pages/Login.ejs'))
    }
};