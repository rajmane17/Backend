const {getUser} = require("../services/auth");

// This function will only allow validate users to access a partcular url to which this middleware is applied
async function validateCookie(req, res, next) {

    /* we can access the cookie using request object and in the end 
    we have to define the name which we had given to our cookie */
    const token = req.cookies?.token;

    if (!token) return res.redirect("/login")

    const user = getUser(token);

    if (user) {
        // if we get the user then we put that user in our request object and call next() function
        req.user = user;
        next();
    }else{
        // if user is not found then we can redirect to login page
        return res.redirect("/login")
    }
}

// This function does the same work as validateCookie, but not that rigerously
// It is helpful in cases where we have just display a users generated urls or todos etc
async function checkAuth (req, res, next) {
    const cookie_uid = req.cookies?.uid;
    const user = getUser(cookie_uid);
    req.user = user;
    next();
}

module.exports = {
    validateCookie,
    checkAuth
}