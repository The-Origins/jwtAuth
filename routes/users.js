const passport = require("passport")
const router = require("express").Router()


router.get("/protected-route", passport.authenticate("jwt", {session:false}) ,require("../controllers/protectedController"))
router.get("/admin-route", require("../controllers/adminController"))
router.post("/login", require("../controllers/loginController"))
router.post("/register", require("../controllers/registerController"))

module.exports = router