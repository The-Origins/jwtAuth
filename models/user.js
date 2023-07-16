const mongoose = require("mongoose")

const User = new mongoose.Schema(
    {
        usename:String,
        admin:{
            type:Boolean,
            default:false
        },
        hash:String,
        salt:String
    })
    
mongoose.model("User", User, "users")