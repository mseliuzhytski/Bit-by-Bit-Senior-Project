const path = require('path');
const db = require('../Database/db');
const alert = require("alert")

var reviews;


exports.get = async function(req,res){
        getReview(function(reviews){
            res.render(path.join(__dirname+'../../../Frontend/Pages/EditReview.ejs'),{
                reviews: reviews,
                isLoggedIn: typeof req.session.userInfo !== 'undefined'
            });
        });

};

exports.post = async (req, res)=> {
    if(typeof req.session.userInfo !== 'undefined'){
        try{
            let reviewNum = req.body.reviewNum;
            let reviewText= req.body.reviewText;

            db.query('SELECT * FROM Review WHERE Review_ID = ?', reviewNum,  async function(err,result, fields){
                if(err) throw error;
                if(result.length < 0) {
                    res.status(400).redirect('/editReview.ejs')
                    alert("Review Number Not Found.")
                }
                else{
                Object.keys(result).forEach(async function(key){
                    let row = result[key];
                    let checkReview = row.Review_ID;
                    let ValidReview = await compare(reviewNum, checkReview);
                    if(!ValidReview){
                        res.status(400).redirect('/editReview.ejs')
                        alert("Invalid Password")
                    }
                });

                db.query('UPDATE Review SET REVIEW_COMMENT = ? WHERE Review_ID = ?', [reviewText, reviewNum], (error) => {
                    if(error) throw error;
                    res.status(200).redirect('/Homepage.ejs')
                });
                }
            });
        }catch{
            res.status(400).redirect('/editReview.ejs')
        }
    }
    else{
        res.send("Access denied")
    }
};


function getReview(callback){
    
    db.query('SELECT * FROM REVIEW', (error,result) => {
        var reviews = [];
        if(error) throw error;
        Object.keys(result).forEach(function(key){
            let row = result[key];
            let review = {
                id: row.REVIEW_ID,
                comment: row.REVIEW_COMMENT,
                rating: row.REVIEW_RATING
            };
            reviews.push(review);
        });
        return callback(reviews);
    });
}


    