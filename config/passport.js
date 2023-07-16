const JWTStrategy = require("passport-jwt").Strategy,
extractJwt = require("passport-jwt").ExtractJwt,
fs = require("fs"),
path = require("path"),
User = require("./database").models.User

const pubKeypath = path.join(__dirname, "..", "rsa_pub.pem")
const pubKey = fs.readFileSync(pubKeypath, "utf-8")

const jwtOptions = {
    jwtFromRequest:extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:pubKey,
    algorithms:["RS256"]
}

const strategy = new JWTStrategy(jwtOptions, (payload, done) =>
{
    User.findOne({_id:payload.sub})
    .then((user) => 
    {
        if(user)
        {
            return done(null, user)
        }
        else
        {
            return done(null, false)
        }
    })
    .catch((err) => done(err))
})

module.exports = (passport) =>
{
    passport.use(strategy)
}