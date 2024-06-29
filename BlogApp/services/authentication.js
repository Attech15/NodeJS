const JWt = require("jsonwebtoken");

const secret = "$uperMan@123";

function createTokenForUser(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        profileImageURL: user. profileImageUrl,
        role: user.role,
    };
    const token = JWt.sign(payload, secret);
    return token;
}

function validateToken(token) {
    const payload = JWt.verify(token, secret);
    return payload;
}

module.exports = {
    createTokenForUser,
    validateToken,
}