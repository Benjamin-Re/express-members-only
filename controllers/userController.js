const db = require('../db/queries')
const passport = require('../config/passport')
const { body, validationResult, matchedData } = require('express-validator')

const strongPasswordOptions = {
    minLength: 6,
    minLowerCase: 1,
    minUpperCase: 1,
    minNumbers: 1,
    minSymbols: 1
}

const validateSignupData = [
    body('firstname')
        .trim()
        .escape()
        .isAlpha().withMessage('Must contain only letters')
        .isLength({ min: 1, max: 10 }).withMessage('Must be between 1 and 10 characters long'),
    body('lastname')
        .trim()
        .escape()
        .isAlpha().withMessage('Must contain only letters')
        .isLength({ min: 1, max: 10 }).withMessage('Must be between 1 and 10 characters long'),
    body('email')
        .trim()
        .escape()
        .isEmail()
        .isLength({ max: 20 })
        .withMessage('Must be an email'),
    body('password')
        .trim()
        .escape()
        .isLength({ max: 20 })
        .isStrongPassword(strongPasswordOptions).withMessage('minLength 6, min -Lower, -Upper, -Num and -Symbol: 1')
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

const validateClubData = [
    body('secretCode').trim().escape().notEmpty().isLength({ max: 20 }).withMessage('Invalid code')
]

async function joinTheClub(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.send("Incorrect Secret Code")
    }
    const secretCode = matchedData(req).secretCode
    const result = await db.joinTheClub(req.user, secretCode)
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

const validateLoginData = [
    body('email').trim().isEmail().isLength({ max: 20 }).withMessage('email expected'),
    body('password').trim().notEmpty().isLength({ max: 20 }).withMessage('expected password')
]

function loginValidatorMiddleware(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.redirect('/login');
    }
    next();
}

const loginUser = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
})

module.exports = {
    showSignupForm,
    addUser,
    showLoginForm,
    showJoinTheClubForm,
    joinTheClub,
    logoutUser,
    loginUser,
    loginValidatorMiddleware,
    validateSignupData,
    validateLoginData,
    validateClubData,
}