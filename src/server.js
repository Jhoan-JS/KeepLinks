const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
//Initializations
const app = express();
require("./config/database");
require("./models/LinksModel");

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

//Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));

//Routes
app.use(require("./routes/index"));
app.use(require("./routes/links"));
app.use(require("./routes/users"));
//Server up

app.listen(app.get("port"), () => {
  console.log("Server is listenig  ");
});
