const fs = require("fs");
const ok = fs.writeFileSync("./text.txt", "utf-8");
const ik = fs.readFileSync("./text.txt", "utf-8");
console.log(ik);