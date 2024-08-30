"use strict";

const ReviewsDB = require('../models/ReviewsDB');
const Review = require('../models/Review')
var reviewsDB = new ReviewsDB();

function getAllReviews(request, respond){
    var id = request.params.id
    reviewsDB.getAllReviews(id, function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });
}

function addReview(request, respond){
    var now = Date();
    var review = new Review(null, request.body.restaurant_id1, request.body.user_id1, request.body.review, 
        request.body.rating, now.toString());
        reviewsDB.addReview(review,function(error,result){
            if(error){
                respond.json(error);
            }
            else{
                respond.json(result);
            }
        });
}

function updateReview(request, respond){
    var now = Date();
    var review = new Review(parseInt(request.params.id), request.body.restaurant_id1, request.body.user_id1, request.body.review, request.body.rating, now.toString());
        reviewsDB.updateReview(review,function(error,result){
            if(error){
                respond.json(error);
            }
            else{
                respond.json(result);
            }
        });
}

function deleteReview(request,respond){
    var reviewId = request.params.id;
    reviewsDB.deleteReview(reviewId, function(error,result){
        if (error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });
}

function getAvgRating(request,respond){
    var restaurantId = request.params.restaurantId
    reviewsDB.getAvgRating(restaurantId, function(error,result){
        if (error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });
}
module.exports = {getAllReviews, addReview, updateReview, deleteReview, getAvgRating};