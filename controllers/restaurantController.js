"use strict";

const RestaurantsDB = require('../models/RestaurantsDB');
var restaurantsDB = new RestaurantsDB();
function getAllRestaurants(request, respond){
    restaurantsDB.getAllRestaurants(function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });
}

function getRestaurant(request, respond){
    var id = request.params.id;
    restaurantsDB.getRestaurant(id, function(error,result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });
}

function searchRestaurants(request, respond){
    var restaurant_name = request.params.search;
    restaurantsDB.searchRestaurants(restaurant_name, function(error,result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });
}

module.exports = {getAllRestaurants, getRestaurant, searchRestaurants};