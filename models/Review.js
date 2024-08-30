"use strict";

class Review{
    constructor(id, restaurantId, userId, review, rating, date){
        this.restaurantId = restaurantId;
        this.userId = userId;
        this.id = id;
        this.review = review;
        this.rating = rating;
        this.date = date;
    }
    
    getRestaurantId(){
        return this.restaurantId;
    }
    getUserId(){
        return this.userId;
    }
    getId(){
        return this.id;
    }
    getReview(){
        return this.review;
    }
    getRating(){
        return this.rating;
    }
    getDate(){
        return this.date;
    }
}
module.exports = Review;