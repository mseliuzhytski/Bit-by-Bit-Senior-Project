const path = require('path');
const alert = require('alert');
const nodemailer = require('nodemailer');
require("dotenv").config();

exports.get = function(req,res){
        res.render(path.join(__dirname+'../../../Frontend/Pages/ApplyNow.ejs'),{
            isLoggedIn: typeof req.session.userInfo !== 'undefined'
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
            res.status(500).render(path.join(__dirname+'../../../Frontend/Pages/ApplyNow.ejs'));
            alert("Unable to send apply form.")
        } else {
            res.status(200).render(path.join(__dirname+'../../../Frontend/Pages/ApplyNow.ejs'));
            alert("Apply form sent successfully.")
        }
        }); 

    } catch {
        res.status(500).render(path.join(__dirname+'../../../Frontend/Pages/ApplyNow.ejs'));
        alert("Error processing request.")
    }
};