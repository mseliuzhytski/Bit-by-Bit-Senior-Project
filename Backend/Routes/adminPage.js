const path = require('path');
const employee = require('./employee');
const phone = require('./phone');
const email = require('./email');

exports.get = function (req, res) {

    employee.getAllEmployees((employees) => {
            
        phone.getAllEmployeePhones((phones) => {

            email.getAllEmployeeEmails((emails) => {
                
                res.render(path.join(__dirname + '../../../Frontend/Pages/AdminPage.ejs'), {
                    employeeItems: employees,
                    phoneItems: phones,
                    emailsItems: emails
                });
            })
        })
    })
};