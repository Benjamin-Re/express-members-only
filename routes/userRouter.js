const { Router } = require("express");
const userRouter = Router();
const { showSignupForm, addUser, showLoginForm, 
    showJoinTheClubForm, joinTheClub, logoutUser
, validateSignupData, loginUser, validateLoginData, loginValidatorMiddleware,
validateClubData } = require("../controllers/userController")
const isAuth = require("../config/authMiddleware")

userRouter.get("/signup", showSignupForm)
userRouter.post("/signup", validateSignupData, addUser)
userRouter.get("/login", showLoginForm)
userRouter.post("/login", validateLoginData, loginValidatorMiddleware, loginUser)
userRouter.get("/join-the-club", isAuth, showJoinTheClubForm)
userRouter.post("/join-the-club", isAuth, validateClubData, joinTheClub)
userRouter.get('/logout', isAuth, logoutUser)

module.exports = userRouter;