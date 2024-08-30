function getUserProfile(){ 

    var request = new XMLHttpRequest();
    var token = sessionStorage.getItem("token");

    request.open('POST', "http://127.0.0.1:8080/user", true); // retrieve current user's info
    request.setRequestHeader("Content-Type","application/json");

    request.onload = function() {
        profileInfo = JSON.parse(request.responseText); 
        document.getElementById("username").value = profileInfo[0].username
        document.getElementById("email").value = profileInfo[0].email
        document.getElementById("password").value = profileInfo[0].password
        document.getElementById("target").src = profileInfo[0].pfp
    }

    var payload = {token : token}; // payload token
    request.send(JSON.stringify(payload));
}

function encode() { // this function reads images uploaded and turns them into base64 strings

    var selectedfile = document.getElementById('myinput').files;
    if (selectedfile.length > 0) {
        var imageFile = selectedfile[0];
        var fileReader = new FileReader();
        fileReader.onload = function (fileLoadedEvent) {
            console.log(fileLoadedEvent.target.result);
            profile_pic = fileLoadedEvent.target.result;
            document.getElementById('target').src = profile_pic;
        }
        fileReader.readAsDataURL(imageFile);
    }
}

function update(){
    updateProfilePic();
    updateProfile();
}


function updateProfilePic(){

    var request = new XMLHttpRequest();
    var link = "http://127.0.0.1:8080/userspfp/" + profileInfo[0].user_id;

    request.open('PUT', link, true);
    request.setRequestHeader("Content-Type","application/json");
    request.onload = function() {
        location.reload();
    }


    var pfp = document.getElementById('target').src
    var payload = { pfp:pfp }
    request.send(JSON.stringify(payload))
}

function updateProfile(){

    var request = new XMLHttpRequest();
    var link = "http://127.0.0.1:8080/users/" + profileInfo[0].user_id

    request.open('PUT', link, true);
    request.setRequestHeader("Content-Type","application/json");
    request.onload = function() {

    }
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    console.log(password)
    var payload = { username:username, email:email, password:password}
    request.send(JSON.stringify(payload))

}

function deleteProfile(){
    var request = new XMLHttpRequest();
    var link = "http://127.0.0.1:8080/users/" + profileInfo[0].user_id

    request.open('DELETE', link, true);
    request.setRequestHeader("Content-Type","application/json");
    request.onload = function() {

        window.location.href = "index.html";
        sessionStorage.removeItem("token");
    }

    request.send();
}