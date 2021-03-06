const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
var flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");
//Initializations
const app = express();
require("dotenv").config();
require("./config/database");
require("./config/passport");
// require("./models/LinksModel");

//Settings
app.use(express.static(path.join(__dirname, "public")));
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname + "/views"));
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views") + "/layouts"),
    partialsDir: path.join(app.get("views") + "/partials"),
    extname: ".hbs"
  })
);
app.set("view engine", ".hbs");
app.set("trust proxy", 1);

//Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Global variables

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});

//Routes
app.use(require("./routes/index"));
app.use(require("./routes/links"));
app.use(require("./routes/users"));

//Server up

app.listen(app.get("port"), () => {
  console.log("Server is listenig  ");
});
