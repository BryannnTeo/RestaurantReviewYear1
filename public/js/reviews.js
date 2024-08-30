
function getReviewData(){
    var request = new XMLHttpRequest();
    var id = localStorage.getItem("restaurantID")
    var link ='http://127.0.0.1:8080/reviews/' + id

    request.open("GET", link, true);
    request.onload = function() { 
        reviews_array = JSON.parse(request.responseText);
        displayReviews();
    };

    request.send();
}

function displayReviews(){
    token = sessionStorage.getItem('token');


    if (token != null) { // Check if user is logged in
        document.getElementById("newReview").style.display = "block"; //show

    }else{
        document.getElementById("newReview").style.display = "none"; //hide
    }

    var table = document.getElementById("reviewsTable");

    table.innerHTML = "";
    totalReviews = reviews_array.length;
    for (var count = 0; count < totalReviews; count++) {
        var picture = reviews_array[count].pfp;
        var username = reviews_array[count].username;
        var review = reviews_array[count].review;
        var rating = reviews_array[count].rating;
        var date = reviews_array[count].date;
        var stars = getStars(rating);
        var edit = "";

        if (token != null) {
            if (profile[0].username == reviews_array[count].username) {
                edit = '<div class="user-review" id="user-review">' +
                            '<a onclick="openPopupEdit(' + count + ');">Edit</a>' +
                            '&nbsp;&nbsp;&nbsp;' +
                            '<a onClick="deleteReview(' + count + ')">Delete</a>' +
                        '</div>';
            } else {
                edit = "";
            }
        } else {
            edit = "";
        }

        var cell =  '<div class="reviews-container">' +
                        '<div class="review-box">' +
                            '<div class="box-top">' +
                                '<div class="profile">' +
                                    '<div class="profile-img">' +
                                        '<img src= '+ picture +'>' +
                                    '</div>' +
                                    '<div class="name-user">' +
                                        '<strong>' + username + '</strong>' +
                                        '<span>' + date + '</span>' +
                                    '</div>' +
                                '</div>' +
                                '<div class="ratings">' +
                                    '<div class="rating">'+ stars +'</div>' +
                                '</div>' +
                            '</div>' +
                            '<div class="comments">' +
                                '<p>' + review + '</p>' +
                            '</div>' +
                            edit +
                        '</div>' +
                    '</div>';

        table.insertAdjacentHTML('beforeend', cell);
    }
}

function getStars(rating){
    var stars = ""

    if (rating == 1) {
        stars = '<i class="ri-star-fill"></i>' +
                '<i class="ri-star-line"></i>' +
                '<i class="ri-star-line"></i>' +
                '<i class="ri-star-line"></i>' +
                '<i class="ri-star-line"></i>';
    }   else if (rating == 2) {
        stars = '<i class="ri-star-fill"></i>' +
                '<i class="ri-star-fill"></i>' +
                '<i class="ri-star-line"></i>' +
                '<i class="ri-star-line"></i>' +
                '<i class="ri-star-line"></i>';
    }   else if (rating == 3) {
        stars = '<i class="ri-star-fill"></i>' +
                '<i class="ri-star-fill"></i>' +
                '<i class="ri-star-fill"></i>' +
                '<i class="ri-star-line"></i>' +
                '<i class="ri-star-line"></i>';
    }   else if (rating == 4) {
        stars = '<i class="ri-star-fill"></i>' +
                '<i class="ri-star-fill"></i>' +
                '<i class="ri-star-fill"></i>' +
                '<i class="ri-star-fill"></i>' +
                '<i class="ri-star-line"></i>';
    }   else if (rating == 5) {
        stars = '<i class="ri-star-fill"></i>' +
                '<i class="ri-star-fill"></i>' +
                '<i class="ri-star-fill"></i>' +
                '<i class="ri-star-fill"></i>' +
                '<i class="ri-star-fill"></i>';
    }
    return stars;
}


function rateIt(element) {
    var num = element.getAttribute("value");
    var classname = element.getAttribute("class");
    var stars = document.getElementsByClassName(classname);
    var classTarget = "." + classname;
    
    // This is another way of writing 'for' loop, which initialises the 
    // popcorn images to use black and white.
    for (let star of stars){
        star.setAttribute("src", 'images/star_bw.png');
    }
    changeStarImage(num, classTarget);
}

function changeStarImage(num, classTarget) {
    var starImage = "images/star.png"
    switch (eval(num)) {
        case 1:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", starImage);
            ratings = 1;
            break;
        case 2:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", starImage);
            ratings = 2;
            break;
        case 3:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='3']").setAttribute("src", starImage);
            ratings = 3;
            break;
        case 4:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='3']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='4']").setAttribute("src", starImage);
            ratings = 4;
            break;
        case 5:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='3']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='4']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='5']").setAttribute("src", starImage);
            ratings = 5;
            break;
    }
}

function addReview() {

    var token = sessionStorage.getItem('token');
    if(token != null){

        var review = new Object();
        review.restaurant_id1 = localStorage.getItem("restaurantID")
        review.user_id1 = profile[0].user_id
        review.review = document.getElementById("userReviews").value; // Value from HTML input text
        review.date = null; // Change the datePosted to null instead of taking the timestamp on the client side;
        review.rating = ratings;
        
        var postReview = new XMLHttpRequest(); 
        
        postReview.open("POST", 'http://127.0.0.1:8080/reviews', true); 
        
        postReview.setRequestHeader("Content-Type", "application/json");
        postReview.onload = function() {
            getReviewData(); 
        };     
        // Convert the data in Comment object to JSON format before sending to the server.
        postReview.send(JSON.stringify(review));
    }
}

function deleteReview(element) {
    var token = sessionStorage.getItem('token');

    if (token != null) {
        if (profile[0].username == reviews_array[element].username) {
            var response = confirm("Are you sure you want to delete this comment?");
            if (response == true) {
                var eraseComment = new XMLHttpRequest();
                var link = "http://127.0.0.1:8080/reviews/" + reviews_array[element].review_id;
                eraseComment.open("DELETE", link, true);
                eraseComment.onload = function () {
                    getReviewData(); 
                };
                eraseComment.send();
            }
        }
    }
}

function updateReview() {
    var token = sessionStorage.getItem('token');
    var index = document.querySelector(".array-index").textContent;
    if (token != null) {
        if (profile[0].username== reviews_array[index].username) {
            var response = confirm("Are you sure you want to update this comment?");
            if (response == true) {
                var updateReview = new XMLHttpRequest();
                var link =  "http://127.0.0.1:8080/reviews/" + reviews_array[index].review_id;

                updateReview.open("PUT", link, true);
                updateReview.setRequestHeader("Content-Type", "application/json");
                reviews_array[index].review = document.getElementById("editUserReviews").value;
                reviews_array[index].rating = ratings;
                updateReview.onload = function () {
                    getReviewData();
                };
                updateReview.send(JSON.stringify(reviews_array[index]));
            }
        }
    }
}

let popup = document.querySelector(".popup");
let popupEdit = document.querySelector(".popupEdit");
function openPopup(){
    popup.classList.add('open');
    document.getElementById("userReviews").value = "";
}
function closePopup(){
    popup.classList.remove('open');
}

function openPopupEdit(element){
    document.querySelector(".array-index").textContent = element;
    document.getElementById("editUserReviews").value = "";
    popupEdit.classList.add('open');
}
function closePopupEdit(){
    popupEdit.classList.remove('open');
}