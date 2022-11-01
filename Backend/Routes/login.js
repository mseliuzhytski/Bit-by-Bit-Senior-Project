const alert = require('alert');
const path = require('path');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const db = require('../Database/db');

exports.get = function(req,res){
        res.sendFile(path.join(__dirname+'../../../Frontend/Pages/Login.html'));
    };

exports.post = async (req, res)=> {
    try{
        let username = req.body.username;
        let password = req.body.password;

        db.query('SELECT * FROM Employee WHERE Emp_username = ?', username,  async function(err,result, fields){
            if(err) throw error;
            if(result.length <= 0) {
                res.sendFile(path.join(__dirname+'../../../Frontend/Pages/Login.html'))
                alert("Invalid Username")
            }
            
            Object.keys(result).forEach(async function(key){
                let row = result[key];
                let passwordToCheck = row.Emp_PasswordHash;
                let isCorrectPassword = await bcrypt.compare(password, passwordToCheck);
                if(isCorrectPassword){
                    res.sendFile(path.join(__dirname+'../../../Frontend/Pages/Homepage.html'))
                }
                else{
                    res.sendFile(path.join(__dirname+'../../../Frontend/Pages/Login.html'))
                    alert("Invalid Password")
                }
            });

        });
    }catch{
        res.sendFile(path.join(__dirname+'../../../Frontend/Pages/Login.html'))
    }
};