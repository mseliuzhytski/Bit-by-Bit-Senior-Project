const alert = require('alert');
const path = require('path');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');

exports.get = function(req,res){
    res.sendFile(path.join(__dirname+'../../../Frontend/Pages/RegisterUser.html'));
};

exports.post = async (req, res)=> {
    try{
        let username = req.body.username;
        let password = req.body.password;
        let foundUser = users.find(user=> user.username === username);


         if(!foundUser){

             const hash = await bcrypt.hash(password,12)

             users.push({
                 username,
                 password: hash
             })

             // There for debugging purposes and for a visual guide until database is up
             console.log(users)
         }
         else{
            res.sendFile(path.join(__dirname+'../../../Frontend/Pages/RegisterUser.html'))
            alert("Username Taken")
         }

         res.sendFile(path.join(__dirname+'../../../Frontend/Pages/Homepage.html'))
    }catch{
        res.sendFile(path.join(__dirname+'../../../Frontend/Pages/RegisterUser.html'))
    }
};
