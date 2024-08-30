"use strict";

class User{

    constructor(id, email, password, pfp, username) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.pfp = pfp;
        this.username = username;

    }

    getId(){
        return this.id;
    }
    getEmail(){
        return this.email;
    }
    getPassword(){
        return this.password;
    }
    getPfp(){
        return this.pfp;
    }
    getUsername(){
        return this.username;
    }
}

module.exports = User