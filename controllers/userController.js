const db = require('../db/queries')

async function showSignupForm(req, res) {
    res.render('signup-form')
}

async function addUser(req, res) {
    const user = req.body
    console.log(user)
    await db.addUser(user)
    res.redirect("/")
}

module.exports = {
    showSignupForm,
    addUser
}