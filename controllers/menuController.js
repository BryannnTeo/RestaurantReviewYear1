"use strict";

const MenuDB = require('../models/MenuDB');
var menuDB = new MenuDB();
function getAllMenu(request, respond){
    var id = request.params.id;
    menuDB.getAllMenu(id, function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });
}
module.exports = {getAllMenu};