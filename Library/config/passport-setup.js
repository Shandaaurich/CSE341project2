const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('dotenv');

keys.config();

passport.use(
    new GoogleStrategy({
        //options for the strategy
        callbackURL: '/auth/google/redirect',
        clientID: process.env.clientID,
        clientSecret: process.env.clientSecret,
        passReqToCallback: true
    }, (request, accessToken, refreshToken, profile, done) => {
        //passport callback function
        UserActivation.findOrCreate({ GoogleID: profile.id }, () => {
            return done(err, user);

        })
    }

    ));