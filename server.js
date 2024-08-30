var express = require("express");

var restaurantController = require('./controllers/restaurantController');
var reviewController = require('./controllers/reviewController');
var menuController = require('./controllers/menuController');
var linkController = require('./controllers/linkController');
var userController = require('./controllers/userController');
var app = express();

app.use(express.static("./public"));
app.use(express.json());

app.route("/restaurants").get(restaurantController.getAllRestaurants);
app.route("/restaurants/:id").get(restaurantController.getRestaurant);
app.route("/restaurant/:search").get(restaurantController.searchRestaurants);

app.route("/reviews/:id").get(reviewController.getAllReviews);
app.route("/reviews").post(reviewController.addReview);
app.route("/reviews/:id").put(reviewController.updateReview);
app.route("/reviews/:id").delete(reviewController.deleteReview);
app.route("/average_rating/:restaurantId").get(reviewController.getAvgRating);

app.route("/menu/:id").get(menuController.getAllMenu);

app.route("/links/:id").get(linkController.getAllLinks);

app.route("/users").get(userController.getAllUsers);
app.route('/user').post(userController.getUser);
app.route("/users").post(userController.addUser);
app.route("/users/:id").put(userController.updateUser);
app.route("/userspfp/:id").put(userController.updateUserPfp);
app.route("/users/:id").delete(userController.deleteUser);
app.route("/login").post(userController.loginUser);

app.listen(8080, "127.0.0.1");
console.log("web server running @ https://127.0.0.1:8080");