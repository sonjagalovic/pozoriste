var PlayService = require('../services/plays')
var express = require('express')
var router = express.Router()
var passport = require('./config/config')

router.get('/', async(req, res) => {
    var plays = await PlayService.find()

    res.send(plays)
})

router.get('/:id', async(req, res) => {
    var play = await PlayService.findById(req.params.id)

    res.send(play)
})



router.post('/',
    passport.authenticate('jwt', { session: false }),
    async(req, res) => {
        var play = await PlayService.savePlay(req.body.name, req.body.description, req.body.theater, req.body.date, req.body.hours, req.body.minutes, req.body.duration, req.body.actors, req.body.images, req.body.director);
        res.send(play);
    })

router.post('/rate/:id',
    passport.authenticate('jwt', { session: false }),
    async(req, res) => {
        var play = await PlayService.ratePlay(req.params.id, req.user._id, req.body.rating);
        if (typeof play !== 'undefined' && play) {
            res.send(true)
        } else
            res.send(false)
    })

router.get('/rate/:id',
    passport.authenticate('jwt', { session: false }),
    async(req, res) => {
        var myRate = await PlayService.giveMyRateForThisPlay(req.params.id, req.user._id) //id predstave i usera, provera da li je user ocenio predstavu

        //console.log(myRate)
        res.status(200).send((myRate).toString());
    })

router.delete('/:id',
    passport.authenticate('jwt', { session: false }),
    passport.authorizeRoles('ADMIN'),
    async(req, res) => {
        var status = await PlayService.deletePlay(req.params.id)
        res.send(status)
    })

module.exports = router