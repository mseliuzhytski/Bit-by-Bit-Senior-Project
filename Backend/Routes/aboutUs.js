const path = require('path');

exports.get = function(req,res){
        res.sendFile(path.join(__dirname+'../../../Pages/Aboutus.html'));
    };