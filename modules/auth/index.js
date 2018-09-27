'use strict';

const passport = require('passport');
const jwt = require('jsonwebtoken');
const BearerStrategy = require('passport-http-bearer').Strategy;
const BasicStrategy = require('passport-http').BasicStrategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
// const TwitterStrategy = require('passport-twitter').Strategy;
// const passportSocketIo = require('passport.socketio');
const Account = require('./../models').Account;
const config = require('./../../config');
const Errors = require('./../../errors');
const Constants = require('./../../config/constants');

const credentialAuth = async (username, password, done) => {
    try {
        const account = await Account.findByIdentifier(username);
        if (!account) {
            return done(null, false);
        }
        return done(null, account);
    } catch (err) {
        done(err);
    }
};

const bearerAuth = (token, done) => {
    jwt.verify(token, config.tokenSecret, async (err, payload) => {
        try {
            if (err) {
                done(new Errors.JsonWebTokenError(err.message, Constants.ERROR_CODE_TOKEN_INVALID, true));
            }
            const account = await Account.findById(payload.id);
            if (!account) {
                return done(null, false);
            }
            return done(null, account);
        } catch (e) {
            done(e);
        }
    });
};

const googleAuth = (token, tokenSecret, profile, done) => {
    Account.findOrCreate({ googleId: profile.id }, (err, user) => {
        return done(err, user);
    });
};

const facebookAuth = (token, tokenSecret, profile, done) => {
    Account.findOrCreate({ facebookId: profile.id }, (err, user) => {
        if (err) { return done(err); }
        done(null, user);
    });
};

// const twitterAuth = (token, tokenSecret, profile, done) => {
//     User.findOrCreate({ twitterId: profile.id }, (err, user) => {
//         if (err) { return done(err); }
//         done(null, user);
//     });
// };

module.exports.initPassport = (app) => {
    // Passport config
    passport.use(new BasicStrategy(credentialAuth));
    passport.use(new BearerStrategy(bearerAuth));
    passport.use(new GoogleStrategy({
        clientID: config.auth.google.key,
        clientSecret: config.auth.google.secret
    }, googleAuth));

    passport.use(new FacebookStrategy({
        clientID: config.auth.facebook.key,
        clientSecret: config.auth.facebook.secret
    }, facebookAuth));

    // passport.use({
    //     consumerKey: config.auth.twitter.key,
    //     consumerSecret: config.auth.twitter.secret
    // }, new TwitterStrategy(twitterAuth));

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });

    // TODO: Socket Authorize
    // const psiAuth = passportSocketIo.authorize(session);

    // app.io.use(function (socket, next) {
    // var User = mongoose.model('User');
    // if (socket.request._query && socket.request._query.token) {
    //     User.findByToken(socket.request._query.token, function(err, user) {
    //         if (err || !user) {
    //             return next('Fail');
    //         }

    //         socket.request.user = user;
    //         socket.request.user.loggedIn = true;
    //         socket.request.user.usingToken = true;
    //         next();
    //     });
    // } else {
    //     psiAuth(socket, next);
    // }
    // });
    return passport;
};
