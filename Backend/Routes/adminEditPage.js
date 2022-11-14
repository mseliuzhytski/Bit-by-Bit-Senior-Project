const path = require('path');
const employee = require('./employee');
const phone = require('./phone');
const email = require('./email');

exports.get = function (req, res) {
    if(typeof req.session.userInfo !== 'undefined' && req.session.userInfo.Emp_Role == 'Admin'){
        var { Emp_ID } = req.query;

        employee.getEmployee(Emp_ID, (employeeResult) => {
                
            phone.getSingleEmployeePhones(Emp_ID, (phones) => {

                email.getSingleEmployeeEmails(Emp_ID, (emails) => {
                    console.log("emp -> " + employee)
                    
                    res.render(path.join(__dirname + '../../../Frontend/Pages/AdminEditPage.ejs'), {
                        employeeItems: employeeResult,
                        phoneItems: phones,
                        emailsItems: emails
                    });
                })
            })
        })
    }
    else{
        res.send("Access Denied")
    }
};