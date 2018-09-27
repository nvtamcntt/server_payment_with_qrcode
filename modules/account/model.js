/* eslint consistent-this: ["error", "account"] */

'use strict';

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const config = require('./../../config');
const Constants = require('./../../config/constants');
const Errors = require('./../../errors');

const AccountSchema = new mongoose.Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
        trim: true,
        match: [new RegExp(config.auth.passwordRegex), 'Minimum eight characters, at least one letter and one number'],
        set: (value) => value
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        unique: true,
        validate: [validator.isEmail, 'Invalid email address']
    },
    displayName: {
        type: String,
        trim: true,
        validate: [(v) => {
            return (v.length <= 24);
        }, 'invalid display name']
    },
    firstName: {
        type: String,
        trim: true,
        validate: [(v) => {
            return (v.length <= 24);
        }, 'invalid fist name']
    },
    lastName: {
        type: String,
        trim: true,
        validate: [(v) => {
            return (v.length <= 24);
        }, 'invalid last name']
    },
    facebookId: {
        type: String,
        trim: true
    },
    googleId: {
        type: String,
        trim: true
    },
    twitterId: {
        type: String,
        trim: true
    },
    avatar: {
        type: String,
        trim: true
    },
    joined: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        trim: true
    }
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});

// Middleware pre-save
AccountSchema.pre('save', function(next) {
    const account = this;

    if (!this.isModified('password')) {
        return next();
    }

    bcrypt.hash(account.password, 10, (err, hash) => {
        if (err) {
            return next(err);
        }
        account.password = hash;
        account.joined = Date.now();
        next();
    });
});

AccountSchema.post('save', (error, doc, next) => {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('There was a duplicate key error'));
    } if (error.name === 'ValidationError') {
        next(new Errors.ValidationError(error.message, Constants.ERROR_CODE_VALIDATION, true));
    } else {
        next(error);
    }
});


AccountSchema.methods.generateToken = function() {
    return new Promise((resolve, reject) => {
        if (!this._id) {
            return reject(new Error('account needs to be saved.')); // TODO: create new ERROR class
        }
        const token = jwt.sign({
            id: this._id
            // scopes: [this.role]
        }, config.tokenSecret, {
            expiresIn: 86400 // expires in 24 hours
        });
        resolve(token);
    });
};

AccountSchema.methods.comparePassword = (password) => {
    return new Promise((resolve, reject) => {
        // Current password hashes
        bcrypt.compare(password, this.password, (err, isMatch) => {

            if (err) {
                return reject(err);
            }

            if (!isMatch) {
                return resolve(false);
            }

            resolve(true);
        });
    });
};

AccountSchema.statics.findByIdentifier = function(identifier) {
    return new Promise((resolve, reject) => {
        const opts = {};

        if (identifier.match(/^[0-9a-zA-Z]{0,24}$/)) {
            opts.$or = [
                { facebookId: identifier },
                { googleId: identifier },
                { twitterId: identifier }
            ];
        } else if (identifier.indexOf('@') === -1) {
            opts._id = identifier;
        } else {
            opts.email = identifier;
        }
        this.findOne(opts, (err, account) => {
            if (err) {
                return reject(err);
            }
            if (!account) {
                return resolve(null, null);
            }
            return resolve(null, account);
        });
    });
};

AccountSchema.statics.findByToken = function(token) {
    return new Promise((resolve, reject) => {
        if (!token) {
            return reject(new BadRequest('Token parameter is required'));
        }
        jwt.verify(token, config.tokenSecret, (err, payload) => {
            if (err) {
                return reject(err);
            }
            
            let accountId = payload.id;

            if (!accountId.match(/^[0-9a-fA-F]{24}$/)) {
                resolve(null, null);
            }

            this.findById(accountId, (error, account) => {
                if (error) {
                    return reject(error);
                }

                if (!account) {
                    return resolve(null, null);
                }

                return resolve(null, account);
            });
        });
    });
};

AccountSchema.statics.updateProfile = function(id, options) {
    return new Promise((resolve, reject) => {
        this.findById(id, (err, account) => {
            if (err) {
                return reject(err);
            }
            if (!account) {
                return resolve(null, null);
            }
            const keys = Object.keys(options);
            for (let k in keys) {
                if (options[k] && account.prototype.hasOwnProperty(k)) {
                    account[k] = options[k];
                }
            }
            account.save((error, result) => {
                if (error) {
                    return reject(error);
                }

                if (cb) {
                    resolve(null, result);
                }

            });
        });
    });
};

AccountSchema.plugin(uniqueValidator);

// EXPOSE ONLY CERTAIN FIELDS
// It's really important that we keep
// stuff like password private!
AccountSchema.method('toJSON', function() {
    return {
        id: this._id,
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        username: this.username,
        displayName: this.displayName,
        avatar: this.avatar
    };
});

module.exports = mongoose.model('Account', AccountSchema);
