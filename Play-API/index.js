const express = require('express')
const app = express()
const config = require('./config')
const cors = require('cors')


var mongoose = require('mongoose')
mongoose.connect(config.dbConnection)
const playRoutes = require('./routes/plays')
const actorRoutes = require('./routes/actors')
const authRoutes = require('./routes/auth')
const ratedRoutes = require('./routes/rated')

app.use(cors())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use("/auth", authRoutes)
app.use("/actors", actorRoutes)
app.use("/plays", playRoutes)
app.use("/rated", ratedRoutes)

app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`)
})