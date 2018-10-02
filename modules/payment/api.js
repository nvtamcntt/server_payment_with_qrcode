/* eslint new-cap: [2, { properties : false }]*/
'use strict';

const PaymentController = require('./paymentController');
const Errors   = require('./../../errors');
const Constant = require('./../../config/constants');


class PaymentValidationError extends Errors.ValidationError {
    constructor(message, errorCode, errors, isOperational) {
        super(message, errorCode, isOperational);
        this.message = message || 'Payment Validation Error';
        this.errors = errors;
        this.errorCode = errorCode || Constant.ERROR_CODE_ETHEREUM_INVALID;
    }
}

module.exports = function() {
    const config = this.config;
    const app    = this.app;
    const payment= new PaymentController(config);
    /*----------------------------card param--------------------------------*/

    const validateParameters = (req) => {
        // Optional
        // req.checkQuery('page', 'Page needs to be a number').optional().isNumeric();
        // req.checkQuery('startBlock', 'startBlock needs to be a number').optional().isNumeric();
        // req.checkQuery('endBlock', 'endBlock needs to be a number').optional().isNumeric();
        // req.checkQuery('limit', 'limit needs to be a number').optional().isNumeric();
        // req.checkQuery('txid', 'Transaction needs to be alphanumeric and have a length 64').optional().matches('/^(0x){1}([A-Fa-f0-9]{62})$/');
        // req.checkQuery('contractAddress', 'Contract\'s address needs to be alphanumeric and have a length 42').optional().matches('/^(0x){1}[0-9a-fA-F]{40}$/');
        // req.checkQuery('address', 'Ethereum\' Address needs to be alphanumeric and have a length 42').matches('/^(0x){1}[0-9a-fA-F]{40}$/');

        return req.validationErrors();
    };
    /*----------------------------------------------------------------------*/
    app.get('/', function(req, res) {  
        res.send({data : 'hello world', title: "Example android"});
    });

    app.get('/merchantTransferFundingAndPayment', (req, res, next) => {
        try {

            // const validationErrors = validateParameters(req);

            // if (validationErrors) {
            //     next(new PaymentValidationError('Invalid request param', Constant.ERROR_CODE_PAYMENT_INVALID, validationErrors, true));
            // }
            
            // const fields = req.body || req.data;
            // const address = fields.address || fields['address'];

            // const address = req.query.address;
            payment.createMerchantTransferFundingAndPayment()
                .then (result => {
                    console.log("=================> result " , result);
                    res.send(result);
                });
            
        } catch (error) {
            next(error);
        }
    });
};
