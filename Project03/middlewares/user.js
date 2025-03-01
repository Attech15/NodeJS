const fs = require("fs");

function logRequest(filename) {
  return (req, res, next) => {
    fs.appendFile(
      filename,
      `\n${Date.now()} : ${req.method} : ${req.path}\n`,
      (err, data) => {
        next();
      }
    );
  };
}
module.exports = {
    logRequest,
}