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
var inventory = require('./Backend/Routes/inventory');
var employee = require('./Backend/Routes/employee');
var phone = require('./Backend/Routes/phone');
var email = require('./Backend/Routes/email');
var adminPage = require('./Backend/Routes/adminPage');

// variable declaration section
const app = express();
const router = express.Router();

app.use(express.static('Frontend'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(router, express.static(__dirname));
app.set('view engine', 'ejs');

// get section
app.get('/', homePage.get);
app.get('/Aboutus.ejs', about.get);
app.get('/ApplyNow.ejs', apply.get);
app.get('/ContactUs.ejs', contact.get);
app.get('/ChangePassword.ejs', change.get)
app.get('/Search.ejs', search.get);
app.get('/HomePage.ejs', homePage.get);
app.get('/Login.ejs', login.get);
app.get('/RegisterUser.ejs', register.get); 
app.get('/inventory', inventory.get);
app.get('/employee', employee.get);
app.get('/phone', phone.get);
app.get('/email', email.get);
app.get('/AdminPage.ejs', adminPage.get);

// post section
app.post('/change', change.post);
app.post('/login', login.post);
app.post('/register', register.post);
app.post('/contact', contact.post);
app.post('/inventory', inventory.post);
app.post('/employee', employee.post);
app.post('/phone', phone.post);
app.post('/email', email.post);

// delete section 
app.delete('/inventory', inventory.delete);
app.delete('/employee', employee.delete);
app.delete('/phone', phone.delete);
app.delete('/email', email.delete);

app.listen(port, () => console.log(`Listening on port ${port}`));
