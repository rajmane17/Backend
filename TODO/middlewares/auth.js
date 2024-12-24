const {verifyToken} =require("../service/auth")

// checks cookies on every request
function checkAuthenticationOfCookie (cookieName) {
    return (req, res, next) => {
        const tokenValue = req.cookies[cookieName];

        if( !tokenValue ) {
            return next();
        }

        try {
            const payload = verifyToken(tokenValue);
            req.user = payload;
            next();
        } catch (error) {
            console.log("error:", error);
        }
    }
}

async function checkAuth (req, res, next) {
    const tokenValue = req.cookies?.token;
    const user = verifyToken(tokenValue);
    req.user = user;
    next();
}

module.exports = {checkAuthenticationOfCookie, checkAuth};