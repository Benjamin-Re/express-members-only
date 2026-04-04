const db = require('../db/queries')
const { body, validationResult, matchedData } = require('express-validator')

const strongPasswordOptions = {
    minLength: 6,
    minLowerCase: 1,
    minUpperCase: 1,
    minNumbers: 1,
    minSymbols: 1
}

const validateData = [ 
	body('firstname').trim().isAlpha().withMessage('Must contain only letters')
    .isLength({min: 1,max: 10}).withMessage('Must be between 1 and 10 characters long'), 
	body('lastname').trim().isAlpha().withMessage('Must contain only letters')
    .isLength({min: 1,max: 10}).withMessage('Must be between 1 and 10 characters long'),
    body('email').trim().isEmail().withMessage('Must be an email'),
    body('password').trim().isStrongPassword(strongPasswordOptions)
]

async function showSignupForm(req, res) {
    res.render('signup-form')
}

async function addUser(req, res, next) {
    const errors = validationResult(req) 
	if (!errors.isEmpty()) {
        res.render('signup-form', { errors: errors.array(), bodyPrev: req.body })
    }
	const user = matchedData(req)
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
    logoutUser,
    validateData
}