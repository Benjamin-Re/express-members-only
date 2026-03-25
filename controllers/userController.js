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

async function showLoginForm(req, res) {
    res.render('login.ejs')
}

async function loginUser(req, res) {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/'
    })
}

module.exports = {
    showSignupForm,
    addUser,
    showLoginForm,
    loginUser
}