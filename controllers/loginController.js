const User = require("../config/database").models.User
const { validatePassword , issueJwt} = require("../lib/utils")

const login = (req, res, next) =>
{
    if(req.body.username&&req.body.password)
    {
        User.findOne({username:req.body.username})
        .then((user) => 
        {
            if(!user) 
            { 
                return res.status(401).json({success:false, data:[], message:`No user with those credentials`})
            }
            const isValid = validatePassword(req.body.password, user.hash, user.salt)
            if(isValid)
            {
                const jwt = issueJwt(user)
                return res.status(201).json({success:true, user:user, ...jwt})
            }
            else
            {
                return res.status(401).json({success:false, data:[], message:`Invalid user credentials`})
            }

        })
        .catch((err) => next(err))
    }
    else
    {
        next(new Error("Username and password required"))
    }
}

module.exports = login