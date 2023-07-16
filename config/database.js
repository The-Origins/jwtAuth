require("dotenv").config()
const mongoose = require("mongoose")

const connection = mongoose.createConnection(process.env.DATABASE_URL, {useNewUrlParser:true, useUnifiedTopology:true})
connection.on("error", (err) => console.error(err))
connection.once("open", () => console.log("Database started"))

const User = new mongoose.Schema(
    {
        username:String,
        admin:{
            type:Boolean,
            default:false
        },
        hash:String,
        salt:String
    })

connection.model("User", User, "users")

module.exports = connection