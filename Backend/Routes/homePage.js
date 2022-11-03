const path = require('path');
const db = require('../Database/db');
const alert = require("alert")

var reviews;


exports.get = async function(req,res){
        getReview(function(reviews){
            res.render(path.join(__dirname+'../../../Frontend/Pages/Homepage.ejs'),{
                reviewOne: reviews[0].comment, 
                reviewTwo: reviews[1].comment, 
                reviewThree: reviews[2].comment});
        });

        

};

function addReview(comment, rating){
    let info = [comment,rating];
    db.query('INSERT INTO REVIEW (REVIEW_COMMENT,REVIEW_RATING) VALUES ?', [info], (error) => {
        if(error) throw error;
    });

}

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

function deleteReview(id){
db.query('DELETE FROM REVIEW WHERE REVIEW_ID = ?', id, (error) => {
        if(error) throw error;
    });
}

    