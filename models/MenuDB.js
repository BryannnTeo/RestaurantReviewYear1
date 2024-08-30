"use strict";

var db = require('../db-connections');
class MenuDB{
    getAllMenu(id, callback){
        var sql = "SELECT * FROM myDB.menu WHERE restaurant_id2 = ?";
        db.query(sql, [id],callback);
    }
}
module.exports = MenuDB;