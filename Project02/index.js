// in this we have building rest api with json data and html code acc to user and using express js to handle the https method and mockaru.com website provide the data of 1000 user since we dont know the mongodb yet. we dont have way to request the patch , post , delete.
const express = require('express');
// const users = require('./MOCK_DATA.json');
const fs = require('fs');

// })
const file_path = __dirname + '/MOCK_DATA.json';
let users = require(file_path); // Read initial data

const app = express();
const PORT = 8000;

// Middleware - pluggin 
app.use(express.urlencoded({extended: false})) // this will get the data and then we can use data. middleware get the form data from the post request by the postman.

// we create the middleware 
// middleware is function that present btw client and server.
// req is request by the user that contains the request related data
// res is result of request if middleware find out the request contains some kind of issues, virus , hacking related stuff or not validated request then middleware stop the request before passing the req to the server
// next means represent the next middleware or route . between the client and server there can be more than one middleware.
// app.use((req, res, next) => {
// console.log("Hello from middleware 1");
// req.myUserName = "AkashMathur.dev";
// next();
// });
// app.use((req, res, next) => {
//     console.log("hello from middleware 2", req.myUserName);
//     return res.end("finish");
// });

// Routes
app.route("/api/users/:id").get((req, res) => { // we many https methods use same route then we can handle this way use function route with handler and apply the https method more than one which have same route. get request is by default of browser but patch , delete , post not then we have to handle this https method by postman or any external resources.
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if(!user) return res.status(404).json({error : 'user not found'})
    return res.json(user);
})
.patch((req, res) => {
    // const { id } = req.params;
    const id = Number(req.params.id);

  const { first_name, last_name, email, gender, job_title} = req.body;

  const user = users.find((user) => user.id === id)

  if(first_name) user.first_name = first_name;
  if(last_name) user.last_name = last_name;
  if(email) user.email = email;
  if(gender) user.gender = gender;
  if(job_title) user.job_title = job_title;
  fs.writeFile(file_path, JSON.stringify(users, null, 2), (err) => {
    if (err) {
        return res.status(500).json({ error: "Failed to update user data" });
    }
    res.json(`${user} has been updated`);
    // res.send(`User with the ${id} has been updated`)
});

//          // TODO : Edit the user with id
//          const id = Number(req.params.id);
        
//         //  const user = users.find((user) => user.id === id)
//          fs.writeFile(file_path, JSON.stringify(user), (err, data) => {
//             return res.json({status: "Success", id: user.id});
//         });     
})
.delete((req, res) => {
    // TODO : Delete the user with id
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id)
    users = users.filter((user) => user.id !== id)
    fs.writeFile(file_path, JSON.stringify(users, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ error: "Failed to update user data" });
        }
        res.end(`${id} has been deleted from the database`);
    });
    //  return res.json({ status : "pending" });
})
app.get('/users', (req, res) => {
    const html = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
    res.send(html);
})
app.get("/api/users", (req, res) => {
    // res.setHeader('X-myName', 'Akash Mathur'); // we have create our own header . header is meta information of the request and responce.
    // console.log(req.headers);
    return res.json(users);
})
// app.get("/api/users/:id", (req, res) => {
//     const id = Number(req.params.id);
//     const user = users.find((user) => user.id === id);
//     return res.json(user);


app.post('/api/users', (req, res) => {
    // TODO : Create new user
    const body = req.body; // we wil get in this line of code data from frontend and express js dont know what kind of data are present and dont know how to handle this data this is why we use middleware .
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
        return res.status(400).json({error: "Please provide all the details."})
    }
    users.push({...body, id: users.length + 1});
    fs.writeFile(file_path, JSON.stringify(users), (err, data) => {
        return res.status(201).json({status: "Success", id: users.length});
    });
});
// app.patch('/api/users/:id', (req, res) => {
//     // TODO : Edit the user with id
//     return res.join({ status : "pending" });     
// })
// app.delete('/api/users/:id', (req, res) => {
//     // TODO : Delete the user with id
//     return res.join({ status : "pending" });
// })
app.listen(PORT, () => console.log(`Server started at PORT : ${PORT}`));
