const { getUser } = require('../service/auth');

// async function restrictToLoggedinUserOnly(req, res, next) {

//     const userUid = req.cookies?.uid;

//     if(!userUid) return res.redirect("/login");

//     const user = await getUser(userUid);

//     if(!user) return res.redirect("/login");

//     req.user = user;
//     next();
// }
function checkForAuthentication(req, res , next) {
    const tokenCookie = req.cookies?.token;
    // const authorizationHeaderValue = req.headers["authorization"];
    req.user = null;
    if(!tokenCookie) return next();

    // if(!authorizationHeaderValue || !authorizationHeaderValue.startsWith("Bearer")) return next();

    // const token = authorizationHeaderValue.split("Bearer ")[1];
    const token = tokenCookie;
    const user = getUser(token);

    req.user = user;
    return next();
}

function restrictTo(roles = []) {
    return function (req, res, next) {
        if(!req.user) return redirect("/login");

        if(!roles.includes(req.user.role)) return res.end("Unauthorized");

        return next();
    }
}

module.exports = {
    checkForAuthentication,
    restrictTo,
}