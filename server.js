require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const jwtDecode = require("jwt-decode");
const mongoose = require("mongoose");
const jwt = require("express-jwt");
const csrf = require("csurf");
const bodyParser = require("body-parser");
const { hashPassword } = require("./server/utilities");
const User = require("./server/models/user.model");

const publicRoutes = require("./server/routes/public.routes");
const privateRoutes = require("./server/routes/private.routes");

const csrfProtection = csrf({ cookie: true });

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client", "build")));


const defaultUser = async (req, res, next) => {
  try {
    const defaultpass = "password";
    const hashedPassword = await hashPassword(defaultpass);

    const userData = {
      email: "admin@admin.com",
      firstname: "admin",
      lastname: "admin",
      username: "admin",
      password: hashedPassword,
      role: "admin",
      changepassword: true,
    };

    const existingUsername = await User.findOne({
      username: userData.username,
    }).lean();

    if (!existingUsername) {
      const newUser = new User(userData);
      await newUser.save();
    }
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ message: "There was a problem creating your account" });
  }
};

defaultUser();

app.use("/api", publicRoutes);

const checkJwt = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  issuer: "api.jpeterson",
  audience: "api.jpeterson",
  getToken: (req) => req.cookies.token,
});

app.use(csrfProtection);

app.get("/api/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

app.use("/api/private/", checkJwt, privateRoutes);

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("mongoDB connected..."));

  app.get("/*", function (req, res, next) {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });

module.exports = app;
