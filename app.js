/* 
To run the code make sure you have Node.js, Express.js, 
and all of the import section on your computer. 
Then run command "node app.js" on your terminal.
*/

//import statement section
const alert = require('alert');
const { response } = require('express');
const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path');
const nodemailer = require('nodemailer');

// variable declaration section
const app = express();
const router = express.Router();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({extended: false}));
app.use(router, express.static(__dirname));

// temporary until database is connected
users = [];


app.post('/login', async (req, res)=> {
    try{
        let username = req.body.username;
        let password = req.body.password;

        let foundUser = users.find(user=> user.username === username);

        if(!foundUser){
            res.sendFile(path.join(__dirname+'/Pages/Login.html'))
             alert("Invalid Username");
         }

        let isCorrectPassword = await bcrypt.compare(password, foundUser.password);

        if(isCorrectPassword){
            res.sendFile(path.join(__dirname+'/Pages/Homepage.html'))
        }
        else{
            res.sendFile(path.join(__dirname+'/Pages/Login.html'))
            alert("Invalid Password")
        }
    }catch{
        res.sendFile(path.join(__dirname+'/Pages/Login.html'))
    }
});

app.post('/register', async (req, res)=> {
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
            res.sendFile(path.join(__dirname+'/Pages/RegisterUser.html'))
            alert("Username Taken")
         }

         res.sendFile(path.join(__dirname+'/Pages/Homepage.html'))
    }catch{
        res.sendFile(path.join(__dirname+'/Pages/RegisterUser.html'))
    }
});

app.post('/submitForm', (req, res)=> {
    try {
        const firstName = req.body.firstName;
        const lastName = req.body.lastname;
        const contactPreference = req.body.contactPreference;
        const contactInfo = req.body.contactInfo;
        const subject = req.body.subject;

        var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'youremail@gmail.com',
            pass: 'yourpassword'
        }
        });

        var mailOptions = {
        from: 'youremail@gmail.com',
        to: 'youremail@gmail.com',
        subject: 'OKAIDI VEHICLE INQUIRY',
        text: 'Name: ' + firstName + ' ' + lastname + ' \n' + 
                'Contact preference: ' + ' ' + contactPreference + ' \n' + 
                'Contact info: ' + ' ' + contactInfo + ' \n\n' + 
                'Subject: ' + ' ' + subject
        };

        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            res.status(500).send('Unable to send contact form.')
        } else {
            res.status(200).send('Email sent: ' + info.response)
        }
        }); 

    } catch {
        res.sendFile(path.join(__dirname+'/Pages/ContactUs.html'))
    }
});


router.get('/', function(req,res){
    res.sendFile(path.join(__dirname+'/Pages/Homepage.html'));
});

router.get('/HomePage.html', function(req,res){
    res.sendFile(path.join(__dirname+'/Pages/Homepage.html'));
});

router.get('/Aboutus.html', function(req,res){
    res.sendFile(path.join(__dirname+'/Pages/Aboutus.html'));
});

router.get('/RegisterUser.html', function(req,res){
    res.sendFile(path.join(__dirname+'/Pages/RegisterUser.html'));
});

router.get('/ApplyNow.html', function(req,res){
    res.sendFile(path.join(__dirname+'/Pages/ApplyNow.html'));
});

router.get('/ContactUs.html', function(req,res){
    res.sendFile(path.join(__dirname+'/Pages/ContactUs.html'));
});

router.get('/Login.html', function(req,res){
    res.sendFile(path.join(__dirname+'/Pages/Login.html'));
});

router.get('/Signup.html', function(req,res){
    res.sendFile(path.join(__dirname+'/Pages/signup.html'));
});

router.get('/Search.html', function(req,res){
    res.sendFile(path.join(__dirname+'/Pages/Search.html'));
});

// server is started at http://localhost:8000
server.listen(8000);