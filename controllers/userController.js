"use strict";

const UsersDB = require('../models/UsersDB');
const User = require('../models/User');
const bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');
var secret = "somesecretkey";
var usersDB = new UsersDB();

function getAllUsers(request, respond){
    usersDB.getAllUsers(function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });
}

function getUser(request, respond){
    var token = request.body.token;
    try {
        var email = jwt.verify(token, secret);
        usersDB.getUser(email ,function(error, result){
            if(error){
                respond.json(error);
            }
            else{
                respond.json(result);
            }
        });
    } catch (error) {    
        respond.json({result:"Invalid Token"});
    }
}

function addUser(request, respond){
    var pfp = "images/user_pfp/default.jpg";
    var password = bcrypt.hashSync(request.body.password,2)
    var user = new User(null, request.body.email, password, pfp, 
        request.body.username);
        usersDB.addUser(user,function(error,result){
            if(error){
                respond.json(error);
            }
            else{
                respond.json(result);
            }
        });
}

function updateUser(request, respond){
    var password = bcrypt.hashSync(request.body.password,2)
    var user = new User(parseInt(request.params.id), request.body.email, password, request.body.pfp, request.body.username);
        usersDB.updateUser(user,function(error,result){
            if(error){
                respond.json(error);
            }
            else{
                respond.json(result);
            }
        });
}


function updateUserPfp(request, respond){
    var user = new User(parseInt(request.params.id), request.body.email, request.body.password, request.body.pfp, request.body.username);
        usersDB.updateUserPfp(user,function(error,result){
            if(error){
                respond.json(error);
            }
            else{
                respond.json(result);
            }
        });
}


function deleteUser(request,respond){
    var userId = request.params.id;
    usersDB.deleteUser(userId, function(error,result){
        if (error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });
}

function loginUser(request, respond){
    var email = request.body.email;
    var passwordInput = request.body.password;
        usersDB.loginUser(email,function(error,result){
            if(error){
                respond.json(error);
            }
            else{
                
                if (result.length == 0){
                    respond.json(error);
                } else {
                    const hash = result[0].password;
                    var flag = bcrypt.compareSync(passwordInput,hash);
                    if (flag) {
                        var token = jwt.sign(email, secret)
                        respond.json({result:token})
                    } else {
                        respond.json({result:"false"})
                    } 
                }
            }
        });
}

module.exports = {getAllUsers, getUser, addUser, updateUser, deleteUser, updateUserPfp, loginUser};