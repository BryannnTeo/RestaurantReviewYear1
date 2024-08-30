"use strict";

var db = require('../db-connections');
class LinkDB{
    getAllLinks(id, callback){
        var sql = "SELECT * FROM myDB.links WHERE restaurant_id3 = ?";
        db.query(sql, [id], callback);
    }
}
module.exports = LinkDB;