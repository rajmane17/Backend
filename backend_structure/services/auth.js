const jwt = require("jsonwebtoken");
const secret= "r_mane84"

// This function generates token for the user
// Remember:- sessionId is generated new every time but token remains the same
function setUser(user) {
    const payLoad ={
        id: user._id,
        name: user.name,
        email: user.email,
    }

    return jwt.sign(payLoad, secret)
}

// This function verifys the token, which is send by the client and make 
// sures that the provided token is generated using the above sercret key
function getUser(token){
    if(!token) return null;
    try {
        /* if the token gets verified we will be returned with a user object, which is stored in db */
        return jwt.verify(token, secret)
    } catch (error) {
        return null;
        
    }
}

module.exports = {setUser, getUser} 