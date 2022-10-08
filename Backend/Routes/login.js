const alert = require('alert');
const path = require('path');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

exports.get = function(req,res){
        res.sendFile(path.join(__dirname+'../../../Pages/Login.html'));
    };

exports.post = async (req, res)=> {
    try{
        let username = req.body.username;
        let password = req.body.password;

        let foundUser = users.find(user=> user.username === username);

        if(!foundUser){
            res.sendFile(path.join(__dirname+'../../../Pages/Login.html'))
             alert("Invalid Username");
         }

        let isCorrectPassword = await bcrypt.compare(password, foundUser.password);

        if(isCorrectPassword){
            res.sendFile(path.join(__dirname+'../../../Pages/Homepage.html'))
        }
        else{
            res.sendFile(path.join(__dirname+'../../../Pages/Login.html'))
            alert("Invalid Password")
        }
    }catch{
        res.sendFile(path.join(__dirname+'../../../Pages/Login.html'))
    }
};