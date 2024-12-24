const jwt = require("jsonwebtoken");
const secret = "rajMane_84";
const expiresIn = process.env.EXPIRES_IN;

function generateToken(user) {
    const payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    }

    const token = jwt.sign(payload, secret)
    return token;
}

function verifyToken(token) {
    const payload = jwt.verify(token, secret);
    return payload;
}

module.exports = {generateToken, verifyToken}