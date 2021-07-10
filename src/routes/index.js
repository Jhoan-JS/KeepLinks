const Router = require("express").Router();

//Home
Router.get("/", (req, res) => {
  res.render("index");
});

Router.get("/about", (req, res) => {
  res.send("about");
});

module.exports = Router;
