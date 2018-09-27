/* eslint new-cap: [2, { properties : false }]*/

'use strict';

const _ = require('lodash');
const fs = require('fs');
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const RateLimit = require('express-rate-limit');
const compression = require('compression');
const expressValidator = require('express-validator');
const Firebase = require('firebase-admin');

const constants = require('./config/constants');
// const auth = require('./modules/auth');
const config = require('./config');
const errorHandler = require('./errors/errorHandler');
const logger = require('./config/logger');

const apiList = require('./modules/api');

const app = express();

// Configuration
// Set compression before any routes
app.use(compression({ threshold: 512 }));
app.use(expressValidator());

// Security Configure
app.use(helmet());

// HTTP
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Limit request
const limiter = new RateLimit({
    windowMs: 1000, // 1 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    delayMs: 0 // disable delaying - full speed until the max limit is reached
});
app.use(limiter);

// Session
const session = {
    key: 'connect.sid',
    // secret: config.secrets.cookie,
    // store: sessionStore,
    // cookie: { secure: config.https.enable },
    resave: false,
    saveUninitialized: true
};

// only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)
app.enable('trust proxy');

// init firebase
const firebase = Firebase.initializeApp(config.firebase);

// Init passport authorization
// const passport = auth.initPassport(app, config, session);

// API
const v1 = express.Router();
_.each(apiList, (api) => {
    api.apply({
        app: v1,
        // middlewares: middlewares,
        // passport: passport,
        config: config,
        firebase: firebase
    });
});
app.use(`/${config.apiVersion}`, v1);

// Error handling middleware, we delegate the handling to the centralized error handler
app.use(async (error, req, res, next) => {
    const isOperational = await errorHandler.handleError(error);
    if (isOperational) {
        const data = {
            success: false,
            message: error.message,
            error: error
        };
        res.status(error.status || constants.ERROR_SERVER_ERROR).json(data);
    } else {
        const data = {
            success: false,
            message: 'The server unable to complete your request.'
        };
        res.status(constants.ERROR_SERVER_INTERNAL_ERROR).json(data);
    }
    next();
});

// Start Server
if (config.https.enable) {
    const httpsServer = app.createServer({
        key: fs.readFileSync(settings.https.key),
        cert: fs.readFileSync(settings.https.cert),
        passphrase: config.https.passphrase
    });

    httpsServer.listen(config.https.port, () => {
        logger.info('https :: Server started ' + config.https.port);
    }).setTimeout(3000);
} else {
    app.listen(config.http.port, () => {
        logger.info('http :: Server started ' + config.http.port);
    }).setTimeout(3000);
}

// Handle uncommon exceptions
const unhandledRejections = new Map();

process.on('unhandledRejection', async (reason, promise) => {
    unhandledRejections.set(promise, reason);
    await logger.log('error', `Unhandled Rejection:\n${reason.stack}`);

    // Catch error to prevent System die
    promise.catch(() => {});
});

process.on('rejectionHandled', (promise) => {
    unhandledRejections.delete(promise);
});

process.on('uncaughtException', async (error) => {
    // I just received an error that was never handled, time to handle it and then decide whether a restart is needed
    const isOperationalError = await errorHandler.handleError(error);
    if (!isOperationalError) {
        process.exit(1);
    }
});

module.exports = app; // for testing
