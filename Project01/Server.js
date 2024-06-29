
// const http = require("http");
// const fs = require("fs");
// const url = require("url");

// const myServer = http.createServer((req, res) => {
//     const log = `${Date.now()}: ${req.method} ${req.url} New Req Received\n`;
//     const myUrl = url.parse(req.url, true);
//     console.log(myUrl);
//     fs.appendFile('log.txt',log, (err, data) => {
//         // if (err){
//         //     console.log("hello bro");
//         // }
//         // res.end("Hello from server again");
//         switch(myUrl.pathname) {
//             case '/': 
//             if(req.method === 'GET')
//                 res.end("homepage huhu")
//             res.end("HomePage");
//             break
//             case '/about': 
//             const username = myUrl.query.myname;
//             res.end(`hi, ${username}`);
//             break
//             // case '/signup' : 
//             // if(req.method === 'GET') 
//             //     res.end('this is a sign up form')
//             // else if(req.method === 'POST')
//             //     res.end("Success");

//             default: res.end("404 bad request")
//         }
//     });
// });

// myServer.listen(8001, () => console.log("Server Started"));

// using express that make thing easy for us and it let us handle routes and https method and express have in built functionality to work at ease 

// const express = require("express");

// const app = express();

// app.get("/", (req, res) => {
//     return res.send("hello from HOme page");
// });
// app.get("/about", (req, res) => {
//     return res.send("hello from about page");
// });
// app.get("/contact", (req, res) => {
//     return res.send("hello from contact page");
// });
// app.listen(8000, () => console.log("server started buddy"));
