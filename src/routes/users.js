const Router = require("express").Router();
const { check, validationResult } = require("express-validator");
const {
  validateConfirmPassword
} = require("../helpers/validateConfirmPassword");
//Sign up
Router.get("/users/signup", (req, res) => {
  res.render("users/signup");
});

Router.post(
  "/users/signup",
  check("email").isEmail().normalizeEmail(),
  [validateConfirmPassword],
  async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    const validations = validationResult(req);

    if (!validations.isEmpty()) {
      const errors = validations.errors;
      res.render("users/signup", { errors });
    }

    res.redirect("/users/signin");
  }
);

//Sign In
Router.get("/users/signin", (req, res) => {
  res.render("users/signin");
});

module.exports = Router;
