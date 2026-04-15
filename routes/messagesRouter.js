const { Router } = require("express");
const messagesRouter = Router();
const { getAllMessages, showCreateMessageForm, addNewMessage, validateMessageData, deleteMessage } = require("../controllers/messagesController")
const { isAuth, isAdmin } = require('../config/authMiddleware')

messagesRouter.get("/", getAllMessages)
messagesRouter.get("/create-message", showCreateMessageForm)
messagesRouter.post("/create-message", isAuth, validateMessageData, addNewMessage)
messagesRouter.post("/delete/:id", isAuth, isAdmin, deleteMessage)

module.exports = messagesRouter;