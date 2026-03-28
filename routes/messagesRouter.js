const { Router } = require("express");
const messagesRouter = Router();
const { getAllMessages, showCreateMessageForm, addNewMessage } = require("../controllers/messagesController")
const isAuth = require('../config/authMiddleware')

messagesRouter.get("/", getAllMessages)
messagesRouter.get("/create-message", showCreateMessageForm)
messagesRouter.post("/create-message", isAuth, addNewMessage)

module.exports = messagesRouter;