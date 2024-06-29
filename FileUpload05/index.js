const path = require("path");
const express = require("express");
const multer  = require("multer");

const app = express();
const PORT = 8000;

// const upload = multer({ dest: "uploads/" }); // frontend se jo bhi user file upload karega usse uploads folder me dal do aur jo yeh upload h vo ek middleware h.


// to handle the image because we cant see the image (file) in our folder and we cant read the file because we have corrupted the file using upload midddleware.to manipulate the file we have a ways to handle that .
// we are using diskstorage that give us full control how we can store the file into the disk so we can read the file.

const storage = multer.diskStorage({ // we have two function one is destination and other is filename both have original request , file that user want to upload and cb is callback function that need to be fired at the end when the work is done . cb have two parameter first is error is if no error then write null and second is folder name in destination and filename we created filename.
    destination: function (req, file, cb) { 
        return cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage })

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    return res.render("homepage");
});
app.post("/upload", upload.single("profileImage") ,(req, res) => {
console.log(req.body);
console.log(req.file);

return res.redirect("/");
})


app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));