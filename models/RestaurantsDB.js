"use strict";

var db = require('../db-connections');
class RestaurantsDB{
    getAllRestaurants(callback){
        var sql = "SELECT restaurant_id, restaurant_name, restaurant_pfp, location, google_map, open_time, address, description, restaurant_link, ROUND(AVG(reviews.rating),1) as avg_rating FROM reviews INNER JOIN restaurant ON reviews.restaurant_id1 = restaurant.restaurant_id GROUP BY restaurant_id ORDER BY avg_rating DESC";
        db.query(sql, callback);
    }

    getRestaurant(id, callback){
        var sql =  "SELECT restaurant_id, restaurant_name, restaurant_pfp, location, google_map, open_time, address, description, restaurant_link, ROUND(AVG(reviews.rating),1) as avg_rating FROM reviews INNER JOIN restaurant ON reviews.restaurant_id1 = restaurant.restaurant_id WHERE restaurant_id = ?";
        db.query(sql, [id], callback);
    }

    searchRestaurants(search, callback){
        var restaurant_search = "%" + search + "%"
        var sql = "SELECT restaurant_id, restaurant_name, restaurant_pfp, location, google_map, open_time, address, description, restaurant_link, ROUND(AVG(reviews.rating),1) as avg_rating FROM reviews INNER JOIN restaurant ON reviews.restaurant_id1 = restaurant.restaurant_id WHERE restaurant_name LIKE ? GROUP BY restaurant_id ORDER BY avg_rating DESC "
        db.query(sql, [restaurant_search], callback)
    }
}
module.exports = RestaurantsDB;