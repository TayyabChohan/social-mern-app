const express = require("express");
const dotenv = require("dotenv");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const morgan = require("morgan");
// import { fileURLToPath } from "url";
const helmet = require("helmet");
const url = require("url");
const { register } = require("./controllers/auth");
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const userPosts = require("./routes/posts");
const { createPost } = require("./controllers/posts");
const { jwtoken } = require("./midllewhare/auth");
const Post = require("./models/Posts");
const User = require("./models/Users");
const { users, posts } = require("./data/index");
const app = express();

//confguartiona//
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
app.use("/static", express.static(path.join(__dirname, "/public")));
// app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyparser.json({ limit: "30mb", extended: true }));
app.use(bodyparser.urlencoded({ limit: "30mb", extended: true }));
// app.use("/assets", express.static(path.join(__dirname, "public/assets")));

///file storage///

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    // console.log(file, 'tayyan')
    cb(null, file.originalname);
  },
});
const uplaod = multer({ storage });
// Routes with files///
app.post("/auth/register", uplaod.single("picture"), register);
app.post("/posts", uplaod.single("picture"), createPost);
///Routes
app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/posts", userPosts);

const port = process.env.PORT || 6001;
mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://localhost:27017/node-social-app")
  // .connect(process.env.mongooDb, {
  //   useNewUrlParser: true,
  //   // useUnifiedTopology: truce,
  // })
  .then(() => console.log("Connected to mongodb"))
  .catch((error) => console.log(error));
app.listen(port, () => {
  // User.insertMany(users);
  // Post.insertMany(posts);
  console.log(`App is running at Port ${port}`);
});
