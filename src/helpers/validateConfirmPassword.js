const { check } = require("express-validator");

module.exports = {
  validateConfirmPassword: check("password")
    .trim()
    .isLength({ min: 4, max: 16 })
    .withMessage("Password must be between 4 to 16 characters")
    .custom(async (password, { req }) => {
      // If password and confirm password not same
      // don't allow to sign up and throw error
      if (password !== req.body.confirmPassword) {
        throw new Error("Passwords must be same");
      }

      return true;
    })
};
