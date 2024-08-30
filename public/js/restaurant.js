function getRestaurantData() {    
    var request = new XMLHttpRequest();    
    request.open("GET", "http://127.0.0.1:8080/restaurants", true);    
    //This function will be called when data returns from the web api    
    request.onload = function() {        
        //get all the restaurants records into our restaurant array        
        restaurant_array = JSON.parse(request.responseText);
        console.log(restaurant_array);
        displayRestaurants();    
    
    };    
   
    request.send();
}


function displayRestaurants() {
    var table = document.getElementById("restaurantsTable");
    var filter = document.getElementById("selectLocation").value;
    var sort = document.getElementById("selectSort").value


    if (sort == "AverageRating") {
        restaurant_array.sort(byRating);
        function byRating(a, b) {
            if (a.avg_rating < b.avg_rating) {
                return 1;
            } else if (a.avg_rating > b.avg_rating) {
                return -1;
            } else {
                return 0;
            }
        };
    } else if (sort == "Alphabatic") {
        restaurant_array.sort(byName);
        function byName(a, b){
            if (a.restaurant_name > b.restaurant_name) {
                return 1;
            } else if (a.restaurant_name < b.restaurant_name) {
                return -1;
            } else {
                return 0;
            }
        };

    } else if (sort == "AlphabaticOpp") {
        restaurant_array.sort(byNameOpp);
        function byNameOpp(a, b){
            if (a.restaurant_name > b.restaurant_name) {
                return -1;
            } else if (a.restaurant_name < b.restaurant_name) {
                return 1;
            } else {
                return 0;
            }
        };
    }
    
    table.innerHTML = "";
    totalRestaurants = restaurant_array.length;


    if (filter == "") { 
        for (var count = 0; count < totalRestaurants; count++) {
            var picture = restaurant_array[count].restaurant_pfp;
            var name = restaurant_array[count].restaurant_name;
            var avg_rating = restaurant_array[count].avg_rating;

            var cell =  '<div class="col-md-3" style="float: none; margin: 0;">' +
                            '<div class="container">' +              
                                '<div class="circle" item="' + count + '" onClick="getRestaurantDetails(this);">' +
                                    '<img src ='+ picture +'>'+     
                                '</div>'+                              
                                '<div class="text">'+                                   
                                    '<p class="name">' + name + '</p>' +
                                    '<p>' + avg_rating + '<i class="ri-star-fill" id="averagestars"></i></p>'
                                '</div>'+
                            '</div>'+
                        '</div>';
            table.insertAdjacentHTML('beforeend', cell);
        }
    } else {
        for (var count = 0; count < totalRestaurants; count++) {
            if (restaurant_array[count].location == filter) {
            var picture = restaurant_array[count].restaurant_pfp;
            var name = restaurant_array[count].restaurant_name;
            var avg_rating = restaurant_array[count].avg_rating;
    
            var cell =  '<div class="col-md-3" style="float: none; margin: 0;">' +
                            '<div class="container">' +              
                                '<div class="circle" item="' + count + '" onClick="getRestaurantDetails(this);">' +
                                    '<img src ='+ picture +'>'+     
                                '</div>'+                              
                                '<div class="text">'+                                   
                                    '<p class="name">' + name + '</p>' +
                                    '<p>' + avg_rating + '</p>'
                                '</div>'+
                            '</div>'+
                        '</div>';
            table.insertAdjacentHTML('beforeend', cell);
            }
        }
    }
}


function SearchRestaurant(){
    const input = document.getElementById('filter').value.toUpperCase();
    const cardContainer = document.getElementById('restaurantsTable');
    const cards = cardContainer.getElementsByClassName('col-md-3');
    for(let i = 0; i < cards.length; i++){ 
        let name = cards[i].querySelector(".name")
        /*  index of checks the position of the array */
        if(name.innerText.toUpperCase().indexOf(input) > -1){
            /*if less than -1 means there is no value that match the input*/
            cards[i].style.display = "";
        }
        else{
            cards[i].style.display = "none";
        }
    }
}

function getRestaurantDetails(element){

    item = element.getAttribute("item");
    var restaurantID = restaurant_array[item].restaurant_id;
    localStorage.clear("restaurantID");
    localStorage.setItem("restaurantID", restaurantID);

    window.location.href = "restaurantDetails.html";
}

function showRestaurantDetails()
{
    var id = localStorage.getItem("restaurantID")
    var link ='http://127.0.0.1:8080/restaurants/' + id
    
    var restaurantData = new XMLHttpRequest();    
    restaurantData.open("GET", link, true);

    restaurantData.onload = function() {
        restaurantInfo = JSON.parse(restaurantData.responseText);
        displayRestaurantInfo();
    };
    
    restaurantData.send();
}

function displayRestaurantInfo(){

    document.getElementById("name").textContent = restaurantInfo[0].restaurant_name;
    document.getElementById("description").textContent = restaurantInfo[0].description;
    document.getElementById("google-map").innerHTML = restaurantInfo[0].google_map;
    document.getElementById("open-time").textContent = restaurantInfo[0].open_time;
    document.getElementById("address").textContent = restaurantInfo[0].address;
    document.getElementById("website").href = restaurantInfo[0].restaurant_link;
}

function getRestaurantLinks(){
    var id = localStorage.getItem("restaurantID")
    var link ='http://127.0.0.1:8080/links/' + id

    var restaurantLinks = new XMLHttpRequest();
    restaurantLinks.open("GET", link, true);

    restaurantLinks.onload = function () {
        link_array = JSON.parse(restaurantLinks.responseText)
        displayRestaurantLinks();
    };

    restaurantLinks.send()
}

function displayRestaurantLinks(){
    document.getElementById("facebook").href = link_array[0].link;
    if (link_array[0].link == "") {
        document.getElementById("facebook").style.display = "none";
    }
    document.getElementById("instagram").href = link_array[1].link;
    if (link_array[1].link== "") {
        document.getElementById("instagram").style.display = "none";
    }
    document.getElementById("twitter").href = link_array[2].link;
    if (link_array[2].link == "") {
        document.getElementById("twitter").style.display = "none";
    }
}

function getRestaurantMenu(){
    var id = localStorage.getItem("restaurantID")
    var link ='http://127.0.0.1:8080/menu/' + id

    var restaurantMenu = new XMLHttpRequest();
    restaurantMenu.open("GET", link, true);

    restaurantMenu.onload = function () {
        menu_array = JSON.parse(restaurantMenu.responseText)
        displayRestaurantMenu();
    };

    restaurantMenu.send()
}

function displayRestaurantMenu(){
    document.getElementById("menu-item-1").src = menu_array[0].food_pfp;
    document.getElementById("menu-item-2").src = menu_array[1].food_pfp;
    document.getElementById("menu-item-3").src = menu_array[2].food_pfp;
    document.getElementById("menu-item-4").src = menu_array[3].food_pfp;
    document.getElementById("menu-item-5").src = menu_array[4].food_pfp;
}