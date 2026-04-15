function isAuth(req,res,next) {
    if(req.isAuthenticated()) {
        next()
    } else {
        res.render('login')
    }
}

function isAdmin(req, res, next) {
    const isAdmin = req.user.isAdmin
    if (isAdmin) {
        console.log('user is admin')
        next()
    } else {
        res.render('/')
    }
}

module.exports = { isAuth, isAdmin }