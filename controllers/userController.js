const db = require('../db/queries')

async function showSignupForm(req, res) {
    res.render('signup-form')
}

async function addUser(req, res) {
    const user = req.body
    await db.addUser(user)
    res.redirect("/")
}

async function showLoginForm(req, res) {
    res.render('login.ejs')
}

function showJoinTheClubForm(req, res) {
    res.render("join-club-form")
}

async function joinTheClub(req, res) {
    const result = await db.joinTheClub(req.user, req.body.secretCode)
    if(result) {
        res.redirect("/")
    } else {
        res.send("Incorrect Secret Code")
    }
}

module.exports = {
    showSignupForm,
    addUser,
    showLoginForm,
    showJoinTheClubForm,
    joinTheClub
}