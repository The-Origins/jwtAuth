const path = require("path"),
fs = require("fs"),
crypto = require("crypto"),
jwt = require("jsonwebtoken")

const privKeypath = path.join(__dirname, "..", "rsa_priv.pem")
const privKey = fs.readFileSync(privKeypath, "utf-8")

const generatePasswordHash = (password) =>
{
    const salt = crypto.randomBytes(32).toString("hex")
    const generatedHash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex")
    return {
        salt:salt,
        hash:generatedHash
    }
}

const validatePassword = (password, hash, salt) =>
{
    const newhash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex")
    return newhash === hash
}

const issueJwt = (user) =>
{
    const maxDays = "1d"
    const payload = 
    {
        sub:user._id,
        iat: Date.now()
    }

    const signedToken = jwt.sign(payload, privKey, {expiresIn:maxDays, algorithm:"RS256"})

    return{
        token: `Bearer ${signedToken}`,
        maxAge:maxDays
    }
}

module.exports = {generatePasswordHash, issueJwt, validatePassword}