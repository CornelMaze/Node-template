const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const LocalStrategy = require("passport-local").Strategy;
const { JWT_SECRET } = require("./config");
const User = require("./models/user");

// JSON web token strategy
passport.use(
 new JwtStrategy(
  {
   jwtFromRequest: ExtractJwt.fromHeader("authorization"),
   secretOrKey: JWT_SECRET,
  },
  async (payload, done) => {
   try {
    // find the user specified in token
    const user = await User.findById(payload.sub);
    // If user doesn't exists, handle it
    if (!user) {
     return done(null, false);
    }
    // otherwise, return the user
    done(null, user);
   } catch (error) {
    done(error, false);
   }
  }
 )
);

// Local strategy
passport.use(
 new LocalStrategy(
  {
   usernameField: "email",
  },
  async (email, password, done) => {
   try {
    //find the user given the email
    const user = await User.findOne({ email });

    // If not, handle it
    if (!user) {
     return done(null, false);
    }

    // check if the password is correct
    const isMatch = await user.isValidPassword(password);
    // if not, handle it
    if (!isMatch) {
     return done(null, false);
    }
    // otherwise, return the user
    done(null, user);
   } catch (error) {
    done(error, false);
   }
  }
 )
);
