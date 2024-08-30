"use strict";

const LinkDB = require('../models/LinkDB');
var linkDB = new LinkDB();
function getAllLinks(request, respond){
    var id = request.params.id;
    linkDB.getAllLinks(id, function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });
}
module.exports = {getAllLinks};