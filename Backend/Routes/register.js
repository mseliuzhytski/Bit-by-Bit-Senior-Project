const alert = require('alert');
const path = require('path');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const db = require('../Database/db');

exports.get = function(req,res){
    res.sendFile(path.join(__dirname+'../../../Frontend/Pages/RegisterUser.html'));
};

exports.post = async (req, res)=> {
    try{
        let username = req.body.username;
        let password = req.body.password;

         db.query('SELECT * FROM Employee WHERE Emp_username = ?', username,  async function(err,result, fields){
            if(err) throw error;
            if(result.length > 0) {
                res.sendFile(path.join(__dirname+'../../../Frontend/Pages/RegisterUser.html'))
                alert("Username already in database")
            }
            else{
            const hash = await bcrypt.hash(password,12)

             db.query('INSERT INTO EMPLOYEE (Emp_Username, Emp_PasswordHash) VALUES (?)', [[username,hash]], (error) => {
                if(error) throw error;
                res.sendFile(path.join(__dirname+'../../../Frontend/Pages/Homepage.html'))
            });
            }

        });
    }catch{
        res.sendFile(path.join(__dirname+'../../../Frontend/Pages/RegisterUser.html'))
    }
};
