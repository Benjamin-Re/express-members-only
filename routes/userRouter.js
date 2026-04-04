const { Router } = require("express");
const passport = require('../config/passport')
const userRouter = Router();
const { showSignupForm, addUser, showLoginForm, 
    showJoinTheClubForm, joinTheClub, logoutUser
, validateData } = require("../controllers/userController")
const isAuth = require("../config/authMiddleware")

userRouter.get("/signup", showSignupForm)
userRouter.post("/signup", validateData, addUser)
userRouter.get("/login", showLoginForm)
userRouter.post("/login", passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/'
}))
userRouter.get("/join-the-club", isAuth, showJoinTheClubForm)
userRouter.post("/join-the-club", isAuth, joinTheClub)
userRouter.get('/logout', isAuth, logoutUser)

module.exports = userRouter;