const path = require('path');

exports.get = function(req,res){
        res.render(path.join(__dirname+'../../../Frontend/Pages/Aboutus.ejs'));
    };