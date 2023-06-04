const mongoose = require('mongoose');
const { use } = require('passport');

var PlaySchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    theater: { type: String },
    date: { type: Date },
    hours: { type: Number },
    minutes: { type: Number },
    duration: { type: Number },
    ratings: [{
        user: { type: mongoose.Schema.Types.ObjectId },
        rating: { type: Number }
    }],
    actors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "actor"
    }],
    images: [{ type: String }],
    director: { type: String }
})

var PlayModel = mongoose.model('play', PlaySchema)

PlayModel.savePlay = function(name, description, theater, date, hours, minutes, duration, actors, images, director) {
    var newPlay = new PlayModel({
        name: name,
        description: description,
        theater: theater,
        date: date,
        hours: hours,
        minutes: minutes,
        duration: duration,
        actors: actors,
        images: images,
        director: director
    })

    newPlay.save().then(play => {

        play.actors.forEach(async function(actor) {
            console.log(actor.toString())
            console.log(play._id)
            var actor1 = await ActorModel.findById(actor)
            console.log(actor1)
            await ActorModel.findOneAndUpdate(actor, {
                $push: { plays: play._id }
            })
        })

    })

    return newPlay;
}

PlayModel.ratePlay = function(playId, userId, rating) {
    console.log("play id", playId)
    console.log("user id", userId)
    return PlayModel.findByIdAndUpdate(playId, {
        $push: { ratings: { user: userId, rating: rating } }
    })
}

PlayModel.giveMyRateForThisPlay = async function(playId, userId) {
    //ako je ocenio -> vraca ocenu od 1 do 5
    //ako nije ocenio -> vraca 0

    var mark = await PlayModel.findById(playId).then(async function(play) {
        if (typeof play !== 'undefined' && play) {
            var oneRating = play.ratings.find(r => r.user == userId.toString());
            if (oneRating == undefined)
                return 0; //korisnik nije ocenio ovu predstavu
            return oneRating.rating;
        }
        return 0; //ova predstava ne postoji
    })

    return mark
}

PlayModel.deletePlay = async function(playId) {
    var status = await PlayModel.findByIdAndDelete(playId).then(async function(play) {
        if (typeof play !== 'undefined' && play) {

            play.actors.forEach(async function(actor) { //actor => {
                console.log(actor)
                console.log(play._id)
                var ac = await ActorModel.findOne(actor)
                console.log(ac)
                var actor = await ActorModel.findOneAndUpdate(actor, {
                    $pullAll: { plays: [play._id] }
                })
            })

            return true;
        }
        return false
    })

    return status
}

module.exports = PlayModel

var ActorModel = require('./actor');
const UserModel = require('./user');