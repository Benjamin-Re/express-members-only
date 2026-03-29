const { Router } = require("express");
const passport = require('../config/passport')
const userRouter = Router();
const { showSignupForm, addUser, showLoginForm, showJoinTheClubForm, joinTheClub } = require("../controllers/userController")
const isAuth = require("../config/authMiddleware")

userRouter.get("/signup", showSignupForm)
userRouter.post("/signup", addUser)
userRouter.get("/login", showLoginForm)
userRouter.post("/login", passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/'
}))
userRouter.get("/join-the-club", isAuth, showJoinTheClubForm)
userRouter.post("/join-the-club", isAuth, joinTheClub)

module.exports = userRouter;