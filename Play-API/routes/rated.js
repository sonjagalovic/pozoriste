var PlayService = require('../services/plays')
var express = require('express')
var router = express.Router()
var passport = require('./config/config')


router.get('/',
    passport.authenticate('jwt', { session: false }),
    async(req, res) => {
        var plays = await PlayService.getRated(req.user._id)

        res.send(plays)
    })



module.exports = router