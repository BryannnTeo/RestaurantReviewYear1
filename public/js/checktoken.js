function checkToken(){

    var token = sessionStorage.getItem("token");

    if (token != null) {
        getUserData();
        $(document.getElementById("login")).hide();
        $(document.getElementById("signout")).show();
        $(document.getElementById("profile")).show();
    } else {
        $(document.getElementById("login")).show();
        $(document.getElementById("signout")).hide();
        $(document.getElementById("profile")).hide();
    }
}

function getUserData(){ 

    var request = new XMLHttpRequest();
    var token = sessionStorage.getItem("token");

    request.open('POST', "http://127.0.0.1:8080/user", true); // retrieve current user's info
    request.setRequestHeader("Content-Type","application/json");

    request.onload = function() {
        profile = JSON.parse(request.responseText); 
        displayUserData();
    }

    var payload = {token : token}; // payload token
    request.send(JSON.stringify(payload));
}

function displayUserData(){
    var pfp = profile[0].pfp;
    var name = profile[0].username;
    document.getElementById("accountPfp").src = pfp;
    document.getElementById("accountUsername").textContent = name;
}
