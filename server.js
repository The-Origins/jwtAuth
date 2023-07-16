require("dotenv").config()
require("./config/database")
require("./models/user")
const express = require("express")
const session = require("express-session")
const passport = require("passport")
const server = express()

server.use(express.json())
server.use(express.urlencoded({extended:true}))
// server.use(session(require("./config/session")))
// server.use(passport.initialize())
// server.use(passport.session())
// server.use((req, res, next) =>
// {
//     console.log(req.session)
//     console.log(req.user)
//     next()
// })
require("./config/passport")(passport)
server.use(require("./routes"))


server.get("*", (req, res) => 
{
    res.status(404).send(`No path ${req.path}`)
})

server.listen(process.env.SERVER_PORT, () => console.log(`Listening on http://localhost:${process.env.SERVER_PORT}`))