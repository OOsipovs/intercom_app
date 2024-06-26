const User = require("../models/User")
const Post = require("../models/Post")

exports.mustBeLoggenIn = function(req, res, next) {
    if(req.session.user){
        next()
    } else {
        req.flash("errors", "You must be logged in to perfom that action")
        req.session.save(function() {
            res.redirect('/')
        })
    }
}

exports.login = function(req, res) {
    let user = new User(req.body)
    user.login().then(function(result) {
        req.session.user = {avatar:user.avatar, username: user.data.username, _id: user.data._id}
        req.session.save(function(){
            res.redirect("/")
        })
    }).catch(function(err){
        req.flash("errors", err)
        req.session.save(function(){
            res.redirect("/");
        })
    })
}

exports.logout = function(req, res) {
    req.session.destroy(function(){
        res.redirect("/")
    })
}

exports.register = function(req, res) {
    let user = new User(req.body)
    user.register().then(() => {
        req.session.user = {username: user.data.username, avatar: user.avatar, _id: user.data._id }
        req.session.save(function(){
            res.redirect("/")
        })
    }).catch((regErrors) => {
        regErrors.forEach(function(err){
            req.flash("regErrors", err)
        })
        req.session.save(function(){
            res.redirect("/")
        })
    })
}

exports.home = (req, res) => {
    if(req.session.user) {
        res.render("home-dashboard")
    } else {
        res.render("home-guest", { regErrors: req.flash("regErrors")})
    }
}

exports.ifUserExists = function(req, res, next) {
    User.findByUsername(req.params.username).then(function(userDocument) {
        req.profileUser = userDocument
        next()
    }).catch(function() {
        res.render("404")
    })
}

exports.profilePostsScreen = function(req, res) {
    Post.findByAuthorId(req.profileUser._id).then(function(posts) {
        res.render("profile", {
            posts: posts,
            profileUsername: req.profileUser.username,
            profileAvatar: req.profileUser. avatar
        })
    }).catch( function() {
        res.render("404")
    })
}