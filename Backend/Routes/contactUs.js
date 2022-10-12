const path = require('path');
const alert = require('alert');
const nodemailer = require('nodemailer');

exports.get = function(req,res){
        res.sendFile(path.join(__dirname+'../../../Pages/ContactUs.html'));
    };

exports.post = async (req, res)=> {
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
            res.status(200).send('Email sent: ' + info.response)
            alert("Contact form sent successfully.")
        }
        }); 

    } catch {
        res.sendFile(path.join(__dirname+'../../../Pages/ContactUs.html'))
    }
};