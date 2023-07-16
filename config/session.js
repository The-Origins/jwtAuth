require("dotenv").config()
const mongoose = require("mongoose")
const MongoStore = require("connect-mongo")

const session = {
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:true,
    store:MongoStore.create({
        mongoUrl:process.env.DATABASE_URL,
        mongooseConnection:mongoose.connection,
        ttl:24*60*60,
        collectionName:process.env.SESSION_COLLECTION
        }
    ),
    cookie:
    {
        maxAge:24*60*60*1000,
        httpOnly:true
    }
}

module.exports = session