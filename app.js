/* 
To run the code make sure you have Node.js, Express.js, 
and all of the import section on your computer. 
Then run command "node app.js" on your terminal.
*/

// import statement section
const express = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const bodyParser = require('body-parser');
const multer  = require('multer')

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
var employee = require('./Backend/Routes/employee');
var phone = require('./Backend/Routes/phone');
var email = require('./Backend/Routes/email');
var adminPage = require('./Backend/Routes/adminPage');
var landingPage = require('./Backend/Routes/landingPage');
var employeeInventoryPage = require('./Backend/Routes/employeeInventory');
var image = require('./Backend/Routes/image');
var inventoryPage = require('./Backend/Routes/inventoryPage');
var adminEditPage = require('./Backend/Routes/adminEditPage');
var editInventoryPage = require('./Backend/Routes/editInventoryPage');
var inventory = require('./Backend/Routes/inventory');


// variable declaration section
const app = express();
const router = express.Router();

app.use(express.static('Frontend'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(router, express.static(__dirname));
app.use(express.json());
app.use(cookieParser());
app.set('view engine', 'ejs');

// sessions - define session parameters
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: process.env.SESSION_SECRET,
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));

// multer - store images temporarily in memory before uploading to S3
const storage = multer.memoryStorage();

// multer - filter for image types
const fileFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] === "image") {
    cb(null, true);
  } else {
    cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
  }
};

// multer - limit individual file size 10 MB, and max 8 uploads at once
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1000000000, files: 8 },
});

// multer - error handling middleware
app.use('/image', image.imageErrors);


// get section
app.get('/', homePage.get);
app.get('/Aboutus.ejs', about.get);
app.get('/AdminPage.ejs', adminPage.get);
app.get('/ApplyNow.ejs', apply.get);
app.get('/ContactUs.ejs', contact.get);
app.get('/ChangePassword.ejs', change.get);
app.get('/EmployeeInventory.ejs', employeeInventoryPage.get);
app.get('/HomePage.ejs', homePage.get);
app.get('/LandingPage.ejs', landingPage.get);
app.get('/Login.ejs', login.get);
app.get('/RegisterUser.ejs', register.get); 
app.get('/Search.ejs', search.get);
app.get('/InventoryPage.ejs', inventoryPage.get);
app.get('/AdminEditPage.ejs', adminEditPage.get);
app.get('/EditInventoryPage.ejs', editInventoryPage.get);

// post section
app.post('/change', change.post);
app.post('/login', login.post);
app.post('/register', register.post);
app.post('/contact', contact.post);
app.post('/employee', employee.post);
app.post('/phone', phone.post);
app.post('/email', email.post);
app.post('/apply', apply.post);
app.post('/image', upload.array('upload_file'), image.post);
app.post('/inventory', inventory.post);

// delete section 
app.delete('/employee', employee.delete);
app.delete('/phone', phone.delete);
app.delete('/email', email.delete);
app.delete('/inventory', inventory.delete);


// handle logout, destroy session + delete cookie
app.get("/logout", (req, res) => {
    req.session.destroy();
    res.clearCookie("bit-by-bit-session");
    res.redirect('/');
})
app.get("/isAuthenticated", (req, res) => { res.send(req.session) })


app.listen(port, () => console.log(`Listening on port ${port}`));
