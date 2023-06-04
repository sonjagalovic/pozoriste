var ActorModel = require('../models/actor')

var find = function() {
    return ActorModel.find().populate('plays')
}

var findById = function(id) {
    return ActorModel.findById(id).populate('plays')
}

var saveActor = function(name) {
    return ActorModel.saveActor(name);
}

module.exports = {
    find,
    findById,
    saveActor
}