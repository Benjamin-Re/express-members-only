const { Router } = require("express");
const messagesRouter = Router();
const { getAllMessages } = require("../controllers/messagesController")

messagesRouter.get("/", getAllMessages)

module.exports = messagesRouter;