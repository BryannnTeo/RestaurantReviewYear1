"use strict";

var db = require('../db-connections');
class UsersDB{
    getAllUsers(callback){
        var sql = "SELECT * FROM myDB.user";
        db.query(sql, callback);
    }

    getUser(email, callback){
        var sql = "SELECT * FROM myDB.user WHERE email LIKE ?"
        db.query(sql, [email], callback);
    }

    addUser(user, callback){
        var sql = "INSERT INTO user(email, password, pfp, username) VALUES (?,?,?,?)";
        db.query(sql, [user.getEmail(), user.getPassword(), user.getPfp(), user.getUsername()], callback);
    }

    updateUser(user, callback){
        var sql = "UPDATE user SET email = ?, password = ?, username = ? WHERE user_id=?";
        db.query(sql, [user.getEmail(), user.getPassword(),
            user.getUsername(), user.getId()], callback);
    }

    updateUserPfp(user, callback){
        var sql = "UPDATE user SET pfp = ? WHERE user_id=?";
        db.query(sql, [user.getPfp(), user.getId()], callback);
    }

    deleteUser(userId, callback){
        var sql = "DELETE FROM user WHERE user_id = ?";
        db.query(sql, [userId], callback);
    }

    loginUser(email, callback){
        var sql = "SELECT password FROM myDB.user WHERE email LIKE ?";
        return db.query(sql,[email], callback);
    }
}

module.exports = UsersDB;