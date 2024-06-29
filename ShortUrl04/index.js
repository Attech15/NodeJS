const express = require("express");
const { connectToMongoDb } = require("./connection");
const URL = require("./models/url");
const path = require('path');
const cookieParser = require("cookie-parser");
const { restrictTo, checkForAuthentication } = require('./middlewares/auth')


const staticRoute = require("./routes/staticRouter")
const urlRoute = require("./routes/url");
const userRoute = require('./routes/user');

const app = express();
const PORT = 8001;

connectToMongoDb("mongodb://127.0.0.1:27017/short-url")
  .then(() => console.log("MongoDb connected"))
  .catch(() => console.log("MongoDb is not connected"));


app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'))

app.use(express.json());
app.use(express.urlencoded({ extended : false}))
app.use(cookieParser());
app.use(checkForAuthentication);

app.use("/url", restrictTo(["NORMAL","ADMIN"]), urlRoute);
app.use('/user', userRoute);
app.use('/', staticRoute);

app.get('/test', async (req, res) => {
    const url = await URL.find({});
    return res.render('home', {
        urls : url,
    });
})

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    },
  );
  res.redirect(entry.redirectUrl);
});

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
