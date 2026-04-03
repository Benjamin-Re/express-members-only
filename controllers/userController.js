const db = require('../db/queries')

async function showSignupForm(req, res) {
    res.render('signup-form')
}

async function addUser(req, res, next) {
    const user = req.body
    const userInDb = await db.addUser(user)
    req.login(userInDb, (err) => {
        if (err) {
            return next(err);
        }
        return res.redirect("/");
    });
}

async function showLoginForm(req, res) {
    res.render('login.ejs')
}

function showJoinTheClubForm(req, res) {
    res.render("join-club-form")
}

async function joinTheClub(req, res) {
    const result = await db.joinTheClub(req.user, req.body.secretCode)
    if (result) {
        res.redirect("/")
    } else {
        res.send("Incorrect Secret Code")
    }
}

function logoutUser(req, res) {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
}

module.exports = {
    showSignupForm,
    addUser,
    showLoginForm,
    showJoinTheClubForm,
    joinTheClub,
    logoutUser
}