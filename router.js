const express = require("express")
const router = express.Router()
const userController = require("./controllers/userController")
const postController = require("./controllers/postController")

router.get("/", userController.home)
router.post("/login", userController.login)
router.post("/logout", userController.logout)
router.post("/register", userController.register)

//post routes
router.get("/create-post", userController.mustBeLoggenIn, postController.viewCreateScreen)



module.exports = router