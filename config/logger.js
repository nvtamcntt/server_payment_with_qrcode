'use strict';

const winston = require('winston');
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    // exitOnError: false,
    transports: [
        new winston.transports.File({
            filename: './logs/all.log',
            json: true,
            maxsize: 5242880, // 5MB
            maxFiles: 100,
            colorize: true
        }),
        new winston.transports.File({
            level: 'info',
            filename: './logs/info.log',
            json: true,
            maxsize: 5242880, // 5MB
            maxFiles: 100,
            colorize: true
        })
    ],
    exceptionHandlers: [
        new winston.transports.File({
            filename: './logs/exceptions.log',
            json: true,
            maxsize: 5242880, // 5MB
            maxFiles: 100,
            colorize: true,
            handleExceptions: true
        })
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.cli(),
        handleExceptions: true
    }));
}

module.exports = logger;
