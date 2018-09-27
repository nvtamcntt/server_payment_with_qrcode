/* eslint no-param-reassign: 0 */

'use strict';

const Errors = require('./../../errors');
const Constants = require('./../../config/constants');

module.exports = (type, options, passport) => {
    if (!passport) {
        throw new Error('Authentication middleware requires passport middleware');
    }
    return (req, res, next) => {
        return passport.authenticate(type, options, (err, account) => {
            if (err) {
                return next(err);
            }
            if (!account) {
                return next(new Errors.BadRequest('Account is not existed', Constants.ERROR_CODE_USER_AUTH_NOTEXISTED, true));
            }

            const promise = account.comparePassword(password);
            promise.then((isMatch) => {
                if (!isMatch) {
                    return next(new Errors.BadRequest('Username or password is incorrect', Constants.ERROR_CODE_USER_AUTH_INCORRECT, true));
                }
                req.account = account;
                next();
            }).catch(next);
        })(req, res, next);
    };
};
