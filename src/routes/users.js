const Router = require("express").Router();
const User = require("../models/UserModel");
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
  check("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Email must be correct"),
  [validateConfirmPassword],
  async (req, res) => {
    const { name, email, password } = req.body;

    const validations = validationResult(req);

    if (validations.isEmpty()) {
      const newUser = new User({
        name,
        email,
        password
      });

      //Encrypt the password
      newUser.password = await newUser.encryptPassword(password);

      await newUser.save();

      const users = await User.find();
      console.log(users);
      res.redirect("/users/signin");
    } else {
      const errors = validations.errors;
      res.render("users/signup", { errors });
    }
  }
);

//Sign In
Router.get("/users/signin", async (req, res) => {
  res.render("users/signin");
});

module.exports = Router;
