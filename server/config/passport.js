// Import passport-local, bcrypt and user schema
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const passport = require('passport')
module.exports = function () {
  // Local Strategy
passport.use(
  new LocalStrategy({ usernameField: "email" }, async function (email,password,done) {
    try {
      const user = await User.findOne({ email: email });

      if (!user) {
        return done(null, false, { message: "Incorret email" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return done(null, false, { message: "Incorret password" });
      }


      return done(null, user);
    } catch (err) {

      return done(err);
    }
  })
);
  // Determines which data is saved in the session
passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  // User object attached to request under req.user
passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);
    if (!user) {
      return done(null, false); 
    }
    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
});
};