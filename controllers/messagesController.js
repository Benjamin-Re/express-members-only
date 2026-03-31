const db = require('../db/queries')

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
    const timestamp = new Date()
    const message = { title: req.body.title,
        content: req.body.content,
        timestamp: timestamp,
        author: req.user.id }
    await db.addNewMessage(message)
    res.redirect("/")
}

module.exports = {
    getAllMessages,
    showCreateMessageForm,
    addNewMessage
}