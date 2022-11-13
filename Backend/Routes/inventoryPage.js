const path = require('path');

exports.get = function (req, res) {
    if(typeof req.session.userInfo !== 'undefined'){
        res.render(path.join(__dirname + '../../../Frontend/Pages/InventoryPage.ejs'));
    }
    else{
        res.send("Access Denied")
    }
};