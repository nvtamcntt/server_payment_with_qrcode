'use strict';

class BaseError extends Error {
    constructor(isOperational) {
        super();
        this.isOperational = isOperational || false;
    }
}

class BadRequest extends BaseError {
    constructor(message, errorCode, isOperational) {
        super(isOperational);
        this.name = 'BadRequest';
        this.message = message || 'Bad Request';
        this.status = 400;
        this.errorCode = errorCode || 400;
    }
}

class Unauthorized extends BaseError {
    constructor(message, errorCode, isOperational) {
        super(isOperational);
        this.name = this.constructor.name;
        this.message = message || 'Unauthorized Request';
        this.status = 401;
        this.errorCode = errorCode || 401;
    }
}

class PaymentRequired extends BaseError {
    constructor(message, errorCode, isOperational) {
        super(isOperational);
        this.name = this.constructor.name;
        this.message = message || 'Payment Required';
        this.status = 402;
        this.errorCode = errorCode || 402;
    }
}

class Forbidden extends BaseError {
    constructor(message, errorCode, isOperational) {
        super(isOperational);
        this.name = this.constructor.name;
        this.message = message || 'Forbidden';
        this.status = 403;
        this.errorCode = errorCode || 403;
    }
}

class NotFound extends BaseError {
    constructor(message, errorCode, isOperational) {
        super(isOperational);
        this.name = this.constructor.name;
        this.message = message || 'Not Found';
        this.status = 404;
        this.errorCode = errorCode || 404;
    }
}

class MethodNotAllowed extends BaseError {
    constructor(message, errorCode, isOperational) {
        super(isOperational);
        this.name = this.constructor.name;
        this.message = message || 'Method Not Allowed';
        this.status = 405;
        this.errorCode = errorCode || 405;
    }
}

class NotAcceptable extends BaseError {
    constructor(message, errorCode, isOperational) {
        super(isOperational);
        this.name = this.constructor.name;
        this.message = message || 'Not Acceptable';
        this.status = 406;
        this.errorCode = errorCode || 406;
    }
}

class ProxyAuthenticationRequired extends BaseError {
    constructor(message, errorCode, isOperational) {
        super(isOperational);
        this.name = this.constructor.name;
        this.message = message || 'Proxy Authentication Required';
        this.status = 407;
        this.errorCode = errorCode || 407;
    }
}

class RequestTimeout extends BaseError {
    constructor(message, errorCode, isOperational) {
        super(isOperational);
        this.name = this.constructor.name;
        this.message = message || 'Request Timeout';
        this.status = 408;
        this.errorCode = errorCode || 408;
    }
}

class Conflict extends BaseError {
    constructor(message, errorCode, isOperational) {
        super(isOperational);
        this.name = this.constructor.name;
        this.message = message || 'Conflict';
        this.status = 409;
        this.errorCode = errorCode || 409;
    }
}

class Gone extends BaseError {
    constructor(message, errorCode, isOperational) {
        super(isOperational);
        this.name = this.constructor.name;
        this.message = message || 'Gone';
        this.status = 410;
        this.errorCode = errorCode || 410;
    }
}

class UnprocessableEntity extends BaseError {
    constructor(message, errorCode, isOperational) {
        super(isOperational);
        this.name = this.constructor.name;
        this.message = message || 'Unprocessable Entity';
        this.status = 422;
        this.errorCode = errorCode || 422;
    }
}

class FailedDependency extends BaseError {
    constructor(message, errorCode, isOperational) {
        super(isOperational);
        this.name = this.constructor.name;
        this.message = message || 'Failed Dependency';
        this.status = 424;
        this.errorCode = errorCode || 424;
    }
}

// CUSTOM ERROR 4xxx
class ValidationError extends BaseError {
    constructor(message, errorCode, isOperational) {
        super(isOperational);
        this.name = this.constructor.name;
        this.message = message || 'Validation Error';
        this.status = 400;
        this.errorCode = errorCode || 400;
    }
}

class JsonWebTokenError extends BaseError {
    constructor(message, errorCode, isOperational) {
        super(isOperational);
        this.name = this.constructor.name;
        this.message = message || 'Json WebToken Error';
        this.status = 401;
        this.errorCode = errorCode || 401;
    }
}

// ERROR 5xxx
class InternalServerError extends BaseError {
    constructor(message, errorCode, isOperational) {
        super(isOperational);
        this.name = this.constructor.name;
        this.message = message || 'Internal Server Error';
        this.status = 500;
        this.errorCode = errorCode || 500;
    }
}

class NotImplemented extends BaseError {
    constructor(message, errorCode, isOperational) {
        super(isOperational);
        this.name = this.constructor.name;
        this.message = message || 'Not Implemented';
        this.status = 501;
        this.errorCode = errorCode || 501;
    }
}

class BadGateway extends BaseError {
    constructor(message, errorCode, isOperational) {
        super(isOperational);
        this.name = this.constructor.name;
        this.message = message || 'Bad Gateway';
        this.status = 502;
        this.errorCode = errorCode || 502;
    }
}

class ServiceUnavailable extends BaseError {
    constructor(message, errorCode, isOperational) {
        super(isOperational);
        this.name = this.constructor.name;
        this.message = message || 'Service Unavailable';
        this.status = 503;
        this.errorCode = errorCode || 503;
    }
}

class GatewayTimeout extends BaseError {
    constructor(message, errorCode, isOperational) {
        super(isOperational);
        this.name = this.constructor.name;
        this.message = message || 'Gateway Timeout';
        this.status = 504;
        this.errorCode = errorCode || 504;
    }
}

class HttpVersionNotSupported extends BaseError {
    constructor(message, errorCode, isOperational) {
        super(isOperational);
        this.name = this.constructor.name;
        this.message = message || 'Http Version Not Supported';
        this.status = 505;
        this.errorCode = errorCode || 505;
    }
}

class NetworkAuthenticationRequired extends BaseError {
    constructor(message, errorCode, isOperational) {
        super(isOperational);
        this.name = this.constructor.name;
        this.message = message || 'Network Authentication Required';
        this.status = 511;
        this.errorCode = errorCode || 511;
    }
}

class CustomError extends BaseError {
    constructor(name, message, statusCode, errorCode, isOperational) {
        super(isOperational);
        Error.captureStackTrace(this, this.constructor);

        this.name = name || 'CustomError';
        this.message = message || 'Custom Error without message';
        this.statusCode = statusCode || 400;
        this.errorCode = errorCode || 400;
    }
}

module.exports = {
    BaseError,
    BadRequest,
    BadGateway,
    Conflict,
    Unauthorized,
    InternalServerError,
    ValidationError,
    FailedDependency,
    Forbidden,
    GatewayTimeout,
    Gone,
    HttpVersionNotSupported,
    MethodNotAllowed,
    NetworkAuthenticationRequired,
    NotAcceptable,
    NotFound,
    NotImplemented,
    PaymentRequired,
    ProxyAuthenticationRequired,
    RequestTimeout,
    ServiceUnavailable,
    UnprocessableEntity,
    CustomError,
    JsonWebTokenError
};
