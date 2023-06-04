var PlayModel = require('../models/play')

var find = function() {
    return PlayModel.find().populate('actors')
}

var findById = function(id) {
    return PlayModel.findById(id).populate('actors')
}

var getRated = function(userId) {
    // return PlayModel.find({ratings: {user: userId}})
    return PlayModel.find({ "ratings.user": userId })
}

var savePlay = function(name, description, theater, date, hours, minutes, duration, actors, images, director) {
    return PlayModel.savePlay(name, description, theater, date, hours, minutes, duration, actors, images, director)
}

var ratePlay = function(playId, userId, rating) {
    return PlayModel.ratePlay(playId, userId, rating)
}

var giveMyRateForThisPlay = async function(playId, userId) {
    return PlayModel.giveMyRateForThisPlay(playId, userId)
}

var deletePlay = async function(playId) {
    return PlayModel.deletePlay(playId)
}

module.exports = {
    find,
    findById,
    getRated,
    savePlay,
    ratePlay,
    deletePlay,
    giveMyRateForThisPlay
}