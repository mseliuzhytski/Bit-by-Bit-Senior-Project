/* 
To run the code make sure you have Node.js, Express.js, 
and all of the import section on your computer. 
Then run command "node app.js" on your terminal.
*/

// import statement section
const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.PORT || 8000;

// import route file section
var about = require('./Backend/Routes/aboutUs');
var apply = require('./Backend/Routes/applyNow');
var contact = require('./Backend/Routes/contactUs');
var change = require('./Backend/Routes/changePass');
var homePage = require('./Backend/Routes/homePage');
var login = require('./Backend/Routes/login');
var register = require('./Backend/Routes/register');
var search = require('./Backend/Routes/search');

// variable declaration section
const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({extended: false}));
app.use(router, express.static(__dirname));


// temporary until database is connected
users = [];


// get section
app.get('/', homePage.get);
app.get('/Aboutus.html', about.get);
app.get('/ApplyNow.html', apply.get);
app.get('/ContactUs.html', contact.get);
app.get('/ChangePassword.html', change.get)
app.get('/Search.html', search.get);
app.get('/HomePage.html', homePage.get);
app.get('/Login.html', login.get);
app.get('/RegisterUser.html', register.get); 


// post section
app.post('/change', change.post);
app.post('/login', login.post);
app.post('/register', register.post);


app.listen(port, () => console.log(`Listening on port ${port}`));