const { Router } = require("express");
const userRouter = Router();
const { showSignupForm, addUser } = require("../controllers/userController")

userRouter.get("/signup", showSignupForm)
userRouter.post("/signup", addUser)

module.exports = userRouter;