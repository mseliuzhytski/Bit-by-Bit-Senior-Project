const path = require('path');
const alert = require('alert');
const nodemailer = require('nodemailer');
require("dotenv").config();

exports.get = function(req,res){
        res.sendFile(path.join(__dirname+'../../../Frontend/Pages/ContactUs.html'));
    };

exports.post = async (req, res)=> {
    try {
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var contactPreference = req.body.contactPreference;
        var contactInfo = req.body.contactInfo;
        var subject = req.body.subject;

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
        text: 'Name: ' + firstName + ' ' + lastName + ' \n' + 
                'Contact preference: ' + ' ' + contactPreference + ' \n' + 
                'Contact info: ' + ' ' + contactInfo + ' \n\n' + 
                'Subject: ' + ' ' + subject
        };

        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            res.status(500).send('Unable to send contact form.')
            alert("Unable to send contact form.")
        } else {
            res.status(200).send('Contact form sent successfully.')
            alert("Contact form sent successfully.")
        }
        }); 

    } catch {
        res.sendFile(path.join(__dirname+'../../../Pages/ContactUs.html'))
    }
};