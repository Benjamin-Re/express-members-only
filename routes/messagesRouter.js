const { Router } = require("express");
const messagesRouter = Router();
const { getAllMessages, showCreateMessageForm } = require("../controllers/messagesController")

messagesRouter.get("/", getAllMessages)
messagesRouter.get("/create-message", showCreateMessageForm)

module.exports = messagesRouter;