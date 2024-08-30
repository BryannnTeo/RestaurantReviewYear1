"use strict";

var db = require('../db-connections');
class ReviewsDB{
    getAllReviews(id, callback){
        var sql = "SELECT review_id, username, restaurant_name, review, pfp, rating, date FROM myDB.reviews INNER JOIN user ON reviews.user_id1 = user.user_id INNER JOIN restaurant ON reviews.restaurant_id1 = restaurant.restaurant_id WHERE restaurant_id = ?";
        db.query(sql, [id], callback);
    }

    addReview(review, callback){
        var sql = "INSERT INTO reviews(restaurant_id1, user_id1, review, rating, date) VALUES (?,?,?,?,?)";
        db.query(sql, [review.getRestaurantId(), review.getUserId(), review.getReview(), review.getRating(),
            review.getDate()], callback);
    }
    updateReview(review, callback){
        var sql = "UPDATE reviews SET review = ?, rating = ?, date = ? WHERE review_id=?";
        db.query(sql, [review.getReview(), review.getRating(),
            review.getDate(), review.getId()], callback);
    }
    deleteReview(reviewId, callback){
        var sql = "DELETE FROM reviews WHERE review_id = ?";
        db.query(sql, [reviewId], callback);
    }

    getAvgRating(restaurantId, callback){
        var sql = "SELECT AVG(rating) AS Avg_Rating FROM reviews WHERE restaurant_id1 = ?"
        db.query(sql, [restaurantId], callback)
    }
}
module.exports = ReviewsDB;