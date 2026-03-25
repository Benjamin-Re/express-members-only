const { Router } = require("express");
const userRouter = Router();
const { showSignupForm, addUser, showLoginForm, loginUser } = require("../controllers/userController")

userRouter.get("/signup", showSignupForm)
userRouter.post("/signup", addUser)
userRouter.get("/login", showLoginForm)
userRouter.post("/login", loginUser)

module.exports = userRouter;