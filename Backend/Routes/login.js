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

        db.query('SELECT * FROM Employee WHERE Emp_username = ?', [username],  async function( err , result, fields) {

            if( err ) throw err;

            if(result.length <= 0) {
                res.status(400).redirect('/Login.ejs');
                alert("Invalid Username")
            }
            
            Object.keys(result).forEach(async function(key){
                let row = result[key];
                let passwordToCheck = row.Emp_PasswordHash;
                let isCorrectPassword = await bcrypt.compare(password, passwordToCheck);
                
                if(isCorrectPassword){
                    // authenticate
                    req.session.userInfo = {
                        "sessionId": req.session.id,
                        Emp_ID: row.Emp_ID,
                        Emp_Username: row.Emp_Username,
                        Emp_FirstName: row.Emp_FirstName,
                        Emp_LastName: row.Emp_LastName,
                        Emp_Role: row.Emp_Role,
                        Emp_Email: "",
                        Emp_Phone: ""
                    }

                    let id = row.Emp_ID


                    var [phoneResult] = await db.promise().query("SELECT EMP_PHONE FROM PHONE WHERE EMP_ID = ?", [id])
                    let phoneLen = (await phoneResult.length)
                    if(await phoneLen != 0 && typeof phoneLen !== 'undefined'){
                        req.session.userInfo.Emp_Phone = await phoneResult[0].EMP_PHONE
                    }

                    
                    var [emailResult] = await db.promise().query("SELECT Emp_Email FROM EMAIL WHERE Emp_ID = ?", [id])
                    let emailLen = (await emailResult.length)
                    if(await emailLen != 0 && typeof emailLen !== 'undefined'){                    
                        req.session.userInfo.Emp_Email = await emailResult[0].Emp_Email;
                    }

                    const oneDay = 1000 * 60 * 60 * 24;
                    
                    res.cookie('bit-by-bit-session', JSON.stringify(req.session.userInfo) , { maxAge: oneDay , httpOnly: true, encode: String });
                    res.status(200).redirect("/LandingPage.ejs");
                }
                else{
                    res.status(400).redirect('/Login.ejs');
                    alert("Invalid Password")
                }
            });
        });
    }catch{
        res.status(500).redirect('/Login.ejs');
    }
};