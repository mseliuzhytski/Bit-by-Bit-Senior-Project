const alert = require('alert');
const path = require('path');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const db = require('../Database/db');

exports.get = function(req,res){
    if(typeof req.session.userInfo !== 'undefined' && req.session.userInfo.Emp_Role == 'Admin'){
    res.render(path.join(__dirname+'../../../Frontend/Pages/RegisterUser.ejs'));
    }
    else{
        res.send("Access Denied");
    }
};

exports.post = async (req, res)=> {
    if(typeof req.session.userInfo !== 'undefined' && req.session.userInfo.Emp_Role == 'Admin'){
        try{
            let username = req.body.username;
            let password = req.body.password;
            let fName = req.body.fName;
            let lName = req.body.lName;
            let role = req.body.Role;

            db.query('SELECT * FROM Employee WHERE Emp_username = ?', username,  async function(err,result, fields){
                if(err) throw error;
                if(result.length > 0) {
                    res.status(400).redirect('/RegisterUser.ejs');
                    alert("Username already in database")
                }
                else{
                const hash = await bcrypt.hash(password,12)


                db.query('INSERT INTO EMPLOYEE (Emp_Username, Emp_PasswordHash, Emp_FirstName, Emp_LastName, Emp_Role) VALUES (?)', [[username,hash, fName,lName,role]], (error) => {
                    if(error) throw error;
                    res.status(200).redirect('/Homepage.ejs');
                });
                }

            });
        }catch{
            res.status(500).redirect('/RegisterUser.ejs');
        }
    }
    else{
        res.send("Access Denied")
    }
};
