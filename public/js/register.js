function registerMe(){
    var registerUser = new XMLHttpRequest;
    
    registerUser.open("POST", "http://127.0.0.1:8080/users", true);
    registerUser.setRequestHeader("Content-Type", "application/json");
    registerUser.onload=function(){
        console.log("ok");
        window.location.href = "login.html";
    }

    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var payload = { email:email, password:password, username:username}
    registerUser.send(JSON.stringify(payload));
}

function loginMe(){
    var loginUser = new XMLHttpRequest;
    
    loginUser.open("POST", "http://127.0.0.1:8080/login", true);
    loginUser.setRequestHeader("Content-Type", "application/json");
    loginUser.onload=function(){
        var token = JSON.parse(loginUser.responseText);
        console.log(token)

        if (token == null) {
            alert("Login Failed. Your email or password may be incorrect.")
        }
        else if (token.result != "false") {
            sessionStorage.setItem("token", token.result)
            window.location.href = "index.html";
        } 
        else {
            alert("Login Failed. Your email or password may be incorrect.")
        }

    }

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    var payload = { email:email, password:password }
    loginUser.send(JSON.stringify(payload));
}

function logoutMe(){
    sessionStorage.removeItem("token");
    location.reload();
}



