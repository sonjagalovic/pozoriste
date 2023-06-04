const mongoose = require('mongoose');

var ActorSchema = mongoose.Schema({
    name: { type: String, required: true },
    plays: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "play"
    }]
})

var ActorModel = mongoose.model('actor', ActorSchema)

ActorModel.saveActor = function(name) {
    var newActor = new ActorModel({
        name: name,
        plays: []
    })

    newActor.save();
    return newActor
}

module.exports = ActorModel

var PlayModel = require('./play');