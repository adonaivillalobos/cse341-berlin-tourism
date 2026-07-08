const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const callbackURL = process.env.NODE_ENV === 'production'
  ? 'https://cse341-berlin-tourism.onrender.com/auth/google/callback'
  : 'http://localhost:8080/auth/google/callback';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: callbackURL
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;