const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/UserModel");
passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      await User.findOne({ email }, async (err, user) => {
        if (err) {
          return done(err);
        }

        if (!user) {
          return done(null, false, { message: "Incorrect Email" });
        }

        const validatedPassword = await user.validPassword(password);
        if (validatedPassword == false) {
          return done(null, false, { message: "Incorrect Password" });
        }

        console.log("tess");
        return done(null, user);
      });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
