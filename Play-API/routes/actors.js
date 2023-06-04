var ActorService = require('../services/actors')
var express = require('express')
var router = express.Router()
var passport = require('./config/config')


router.get('/',
    async(req, res) => {
        var actors = await ActorService.find();

        res.send(actors)
    })

router.get('/:id',
    async(req, res) => {
        var actor = await ActorService.findById(req.params.id);

        res.send(actor)
    })

router.post('/',
    //passport.authenticate('jwt', { session: false }),
    async(req, res) => {
        var actor = await ActorService.saveActor(req.body.name);
        res.send(actor);
    })

module.exports = router