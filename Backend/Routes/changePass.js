const alert = require('alert');
const path = require('path');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');

exports.get = function(req,res){
    res.sendFile(path.join(__dirname+'../../../Frontend/Pages/ChangePassword.html'));
};

exports.post = async (req, res)=> {
    try{
        let username = req.body.username;
        let password = req.body.oldPassword;

        let foundUser = users.find(user=> user.username === username);

        if(!foundUser){
            res.sendFile(path.join(__dirname+'../../../Pages/ChangePassword.html'))
             alert("Invalid Username");
         }

        let isCorrectPassword = await bcrypt.compare(password, foundUser.password);

        if(!isCorrectPassword){
            res.sendFile(path.join(__dirname+'../../../Pages/ChangePassword.html'))
            alert("Invalid Password")
        }

        //updates password
        const index = users.indexOf(foundUser);
        if(index > -1){
            users.splice(index, 1);
        }
        const hash = await bcrypt.hash(req.body.newPassword,12)
        users.push({
            username,
            password: hash
        })

        console.log(users)

        res.sendFile(path.join(__dirname+'../../../Pages/Homepage.html'))
    }catch{
        res.sendFile(path.join(__dirname+'../../../Pages/ChangePassword.html'))
    }
};