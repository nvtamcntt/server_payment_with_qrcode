'use strict';

const logger = require('./../config/logger');

class ErrorHandler {
    constructor() {
    }
    async handleError(error) {
        // TODO:
        // await sendMailToAdminIfCritical;
        // await saveInOpsQueueIfCritical;
        const isOperational = this.determineIfOperationalError(error);
        await logger.log('error', error.message);
        if (!isOperational) {
            await logger.error(error.stack);
        }
        return isOperational;
    }

    determineIfOperationalError(error) {
        if (error.name === 'ValidationError'
        || error.name === 'AuthenticationError') {
            error.isOperational = true;
        }
        return error.isOperational;
    }

    isTrustedError(error) {
        return error.isOperational;
    }
}

module.exports = new ErrorHandler();
