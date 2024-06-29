// const sessionIdToUserMap = new Map();

// function setUser(id , user) {
//     sessionIdToUserMap.set(id, user);
// }

// function getUser(id) {
//     return sessionIdToUserMap.get(id);
// }

// module.exports = {
//     setUser,
//     getUser,
// }

// Using json web token (jwt) authentication since we dont use the stateful authentication. we put the state in the payload.

const jwt = require("jsonwebtoken");
const secret = "secret";

function setUser(user) {
    return jwt.sign({
        _id: user._id,
        email: user.email,
        role: user.role,
    }, secret);
}
function getUser(token) {
    if(!token) return null;
    return jwt.verify(token, secret);
}
module.exports = {
    setUser, 
    getUser,
}