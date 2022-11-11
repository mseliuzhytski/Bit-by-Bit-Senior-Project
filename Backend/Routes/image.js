require("dotenv").config();
const alert = require('alert');
const path = require('path');
const { s3Upload } = require("../Database/s3");
var db = require('../Database/db');

exports.getAllImages = function(Car_Stock_Num, callback) {
  db.query('SELECT * FROM Images WHERE Car_Stock_Num = ' + Car_Stock_Num,
  (error, imgResult) => {
      if (error) throw error;
      return callback(imgResult);
  })
}

exports.post = async (req, res) => {
  try {
      var { Car_Stock_Num } = req.body;

      if (Car_Stock_Num) {
        const results = await s3Upload(req.files);

        for (let i = 0; i < results.length; i++) {
            addNewVehicleImage(Car_Stock_Num, results[i].Location);
        }
        res.redirect(200, '/Image.ejs');
      }
      else {
        res.redirect(400, '/Image.ejs');
        alert('Missing car stock number.')
      }
  } 
  catch {
    res.redirect(500, '/Image.ejs');
    alert('Unable to process request.')
  }
};

exports.imageErrors = ((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
      if (error.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          message: "file is too large",
        });
      }
  
      if (error.code === "LIMIT_FILE_COUNT") {
        return res.status(400).json({
          message: "File limit reached",
        });
      }
  
      if (error.code === "LIMIT_UNEXPECTED_FILE") {
        return res.status(400).json({
          message: "File must be an image",
        });
      }
    }
  });

// add new inventory image
// return true if successfully, false otherwise
function addNewVehicleImage(Car_Stock_Num, Car_Image) {
    db.query('INSERT INTO IMAGES (Car_Stock_Num, Car_Image) VALUES (?, ?)', 
    [Car_Stock_Num, Car_Image],
        (error, result) => {
            if (error) throw error;
            if (result.affectedRows == 0) {
                return false;
            }
            return true;
        });
};