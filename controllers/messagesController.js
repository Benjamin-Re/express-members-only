const db = require('../db/queries')
const { body, validationResult, matchedData } = require('express-validator')

async function getAllMessages(req, res) {
    const isMember = req.user?.is_club_member
    let messages;
    if (isMember) {
        messages = await db.getAllMessagesWithAuthor()
    } else {
        messages = await db.getAllMessages()
    }
    res.render('index', { messages, user: req.user })
}

async function showCreateMessageForm(req, res) {
    res.render('create-message')
}

async function addNewMessage(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.send("Incorrect Title or Content Format")
    }
    const data = matchedData(req)
    const timestamp = new Date()
    const message = { title: data.title,
        content: data.content,
        timestamp: timestamp,
        author: req.user.id }
    await db.addNewMessage(message)
    res.redirect("/")
}

const validateMessageData = [
    body('title').trim().notEmpty().escape().isLength({ max: 20 }).withMessage('Incorrect Title Format'),
    body('content').trim().notEmpty().escape().isLength({ max: 100 }).withMessage('Incorrect Content Format')
]

module.exports = {
    getAllMessages,
    showCreateMessageForm,
    addNewMessage,
    validateMessageData
}