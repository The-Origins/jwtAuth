const crypto = require("crypto")
const fs = require("fs")

const generateKeyPair = () =>
{
    const keyPair = crypto.generateKeyPairSync("rsa",{
        modulusLength:4096,
        publicKeyEncoding:{
            type:"pkcs1",
            format:"pem"
        },
        privateKeyEncoding:{
            type:"pkcs1",
            format:"pem"
        }
    })
    fs.writeFileSync(__dirname + "/rsa_priv.pem", keyPair.privateKey)
    fs.writeFileSync(__dirname + "/rsa_pub.pem", keyPair.publicKey)
}

generateKeyPair()