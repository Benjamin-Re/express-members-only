const { Router } = require("express");
const passport = require('../config/passport')
const userRouter = Router();
const { showSignupForm, addUser, showLoginForm, loginUser } = require("../controllers/userController")

userRouter.get("/signup", showSignupForm)
userRouter.post("/signup", addUser)
userRouter.get("/login", showLoginForm)
userRouter.post("/login", passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/'
}))

module.exports = userRouter;