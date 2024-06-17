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
router.post("/create-post", userController.mustBeLoggenIn, postController.create)
router.get("/post/:id", postController.viewSingle)
router.get("/post/:id/edit", postController.viewEditScreen)
router.post("/post/:id/edit", postController.edit)

//profile route
router.get("/profile/:username", userController.ifUserExists, userController.profilePostsScreen)

module.exports = router