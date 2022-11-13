const path = require('path');

exports.get = function (req, res) {
    if(typeof req.session.userInfo !== 'undefined' && req.session.userInfo.Emp_Role == 'Admin'){
        res.render(path.join(__dirname + '../../../Frontend/Pages/AdminEditPage.ejs'));
    }
    else{
        res.send("Access Denied")
    }
};