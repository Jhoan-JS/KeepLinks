const Router = require("express").Router();

//Sign up
Router.get("/users/signup", (req, res) => {
  res.send("Sign Up");
});

//Sign In
Router.get("/users/signin", (req, res) => {
  res.send("Sign in");
});

module.exports = Router;
