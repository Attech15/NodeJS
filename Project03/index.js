// here we connect the mongoDb with nodeJs and ExpressJs by using mongoose. mongoose is package that help us connect mongoDb with nodeJs.
const express = require("express");
const { connectMongoDb } = require('./connection');
// const mongoose = require("mongoose");
const { logRequest } = require("./middlewares/user");
const userRouter = require('./routes/user');

const app = express();
const PORT = 8000;

// Connection 
connectMongoDb("mongodb://127.0.0.1:27017/youtube-app-1")
.then(() => console.log("mongoDb Connected"))
.catch(() => console.log("mongoDb is not Connected"))


// Middleware - pluggin 
app.use(express.urlencoded({extended: false}))
app.use(logRequest('log.txt'));

// connection (In this we have connected the mongoose and we have given local url of database and set the name of database after that it will give the promise.)
// mongoose.connect('mongodb://127.0.0.1:27017/youtube-app-1')
// .then(() => console.log('MongoDb is connected'))
// .catch((err => console.log("Mongo Error", err)));

// Schema (we create the Schema)
// const userSchema = new mongoose.Schema({
//     firstName: {
//         type: String,
//         required: true,
//     },
//     lastName: {
//         type: String,
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     gender: {
//         type: String,
//     },
//     jobTitle: {
//         type: String,
//     }
// }, {timestamps: true });
// const User = mongoose.model('user', userSchema);// we have created the model using schema;


// app.get("/", (req, res) => {
//         return res.send("hello from HOme page");
// });
// // app.get("/about", (req, res) => {
// //         return res.send("hello from about page");
// // });
// // app.get("/contact", (req, res) => {
// //         return res.send("hello from contact page");
// // });
// app.get("/api/users", async (req, res) => {
//     const allDbUsers = await User.find({});
//     return res.json(allDbUsers);
// })
// app.get('/users', async (req, res) => {
//     const allDbUsers = await User.find({});
//     const html = `
//     <ul>
//     ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email} </li>`).join("")}
//     </ul>
//     `;
//     res.send(html);
// })
// app.post('/users', async (req, res) => {
//     // TODO : Create new user
//     const body = req.body; // we wil get in this line of code data from frontend and express js dont know what kind of data are present and dont know how to handle this data this is why we use middleware .
//     if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
//         return res.status(400).json({error: "Please provide all the details."})
//     }
//    const result = await User.create({
//     firstName: body.first_name,
//     lastName: body.last_name,
//     email: body.email,
//     gender: body.gender,
//     jobTitle: body.job_title
//    });
//    console.log("result", result);
//    return res.status(201).json({msg: 'success'});
// });
// app.route("/api/users/:id")
// .get(async (req, res) => { 
//     const user = await User.findById(req.params.id);
//     if(!user) return res.status(404).json({error : 'user not found'})
//     return res.json(user);
// })
// .patch(async (req, res) => {
//         // TODO : Edit the user with id
//         await User.findByIdAndUpdate(req.params.id, {lastName: "changed"})
//         console.log(User);
//         return res.send({ status : "user have been updated" });     
//     })
// .delete(async (req, res) => {
//         // TODO : Delete the user with id
//         await User.findByIdAndDelete(req.params.id)
//         return res.send({ status : "user have been deleted" });
//     })

// routes
app.use('/users', userRouter);

app.listen(PORT, () => console.log(`Server started at PORT : ${PORT}`));
