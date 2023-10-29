const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

//dotenv package to access environment file
const dotenv = require('dotenv');
dotenv.config();

const User = require('../models/user-model');

passport.use(
    new GoogleStrategy({
        //options for the strategy
        callbackURL: '/auth/google/redirect',
        clientID: process.env['clientID'],
        clientSecret: process.env['clientSecret'],
        passReqToCallback: true
    }, function (request, accessToken, refreshToken, profile, done) {

        //check if user already exists in our database
        User.findOne({ googleId: profile.id }).then((currentUser) => {
            if (currentUser) {
                //already have user
                console.log('user is:' + currentUser);
            }
            else {
                //if not creat user in db
                new User({
                    username: profile.displayName,
                    googleId: profile.id
                }).save().then((newUser) => {
                    console.log('User created: ' + newUser);
                })

            }
        });
    })
);



