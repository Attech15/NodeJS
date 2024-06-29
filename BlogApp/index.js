const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const cookieParser = require("cookie-parser");
const { checkForAuthenticationCookie } = require("./middlewares/authentication");
const Blog = require("./models/Blog");

const app = express();
const PORT = 8000;

mongoose.connect('mongodb://127.0.0.1:27017/blogify')
.then(() => console.log("MongoDb connected"))
.catch(() => console.log("MongoDB is not connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"))
app.use(express.static(path.resolve('public')));

app.get('/', async (req, res) => {
    const allBlogs = await Blog.find({});
    res.render("homepage", {
        user: req.user,
        blogs: allBlogs,
    });
})
app.use('/user',userRoute);
app.use('/blog', blogRoute);



app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));