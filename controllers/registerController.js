const User = require("../config/database").models.User
const {generatePasswordHash, issueJwt} = require("../lib/utils")

const register = (req, res, next) =>
{
    if(req.body.username&&req.body.password)
    {
        const generatedHash = generatePasswordHash(req.body.password)
        User.create({
            ...req.body,
            ...generatedHash
        })
        .then((user) => {
            const jwt = issueJwt(user)
            res.status(201).json({success:true, user:user, ...jwt})
        })  
        .catch((err) => {
            console.error(err)
            next(err)
        })
    }
    else
    {
        // next(new Error("Username and password needed"))
    }
}
module.exports = register