const router = require("express").Router()

router.use("/users", require("./users"))
router.use(require("../controllers/middleware/errorHandler"))

module.exports =router