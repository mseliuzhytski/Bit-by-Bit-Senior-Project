const path = require('path');
const alert = require('alert');
const nodemailer = require('nodemailer');
require("dotenv").config();

exports.get = function(req,res){
    var { Car_Stock_Num } = req.query;

    if (!Car_Stock_Num) { Car_Stock_Num = ""; }
    
    res.render(path.join(__dirname+'../../../Frontend/Pages/ApplyNow.ejs'),{
        isLoggedIn: typeof req.session.userInfo !== 'undefined',
        CarNum: Car_Stock_Num
    });
};

exports.post = async (req, res)=> {
    try {
        var { firstname, lastname, contact,
            stockNumber } = req.body;

        var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PW
        }
        });

        var mailOptions = {
        from: 'okaidiautosalescontact@gmail.com',
        to: 'okaidiautosalescontact+receive@gmail.com',
        subject: 'OKAIDI CONTACT FORM',
        text: 'Name: ' + firstname + ' ' + lastname + ' \n' + 
                'Contact information: ' + ' ' + contact + ' \n' + 
                'StockNumber: ' + ' ' + stockNumber
        };

        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            res.status(400).redirect("/ApplyNow.ejs");
            alert("Unable to send apply form.")
        } else {
            res.status(200).redirect("/ApplyNow.ejs");
            alert("Apply form sent successfully.")
        }
        }); 

    } catch {
        res.status(500).redirect("/ApplyNow.ejs");
        alert("Error processing request.")
    }
};