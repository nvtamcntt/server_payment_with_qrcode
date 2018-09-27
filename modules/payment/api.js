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

    const validateParameters = (req) => {
        // Optional
        req.checkQuery('page', 'Page needs to be a number').optional().isNumeric();
        // req.checkQuery('startBlock', 'startBlock needs to be a number').optional().isNumeric();
        // req.checkQuery('endBlock', 'endBlock needs to be a number').optional().isNumeric();
        // req.checkQuery('limit', 'limit needs to be a number').optional().isNumeric();
        // req.checkQuery('txid', 'Transaction needs to be alphanumeric and have a length 64').optional().matches('/^(0x){1}([A-Fa-f0-9]{62})$/');
        // req.checkQuery('contractAddress', 'Contract\'s address needs to be alphanumeric and have a length 42').optional().matches('/^(0x){1}[0-9a-fA-F]{40}$/');
        // req.checkQuery('address', 'Ethereum\' Address needs to be alphanumeric and have a length 42').matches('/^(0x){1}[0-9a-fA-F]{40}$/');

        return req.validationErrors();
    };
    app.get('/', function(req, res) {
        res.send('hello world');
    });

    app.get('/payment', (req, res, next) => {
        try {
            const validationErrors = validateParameters(req);

            if (validationErrors) {
                next(new PaymentValidationError('Invalid request param', Constant.ERROR_CODE_PAYMENT_INVALID, validationErrors, true));
            }
            
            // const fields = req.body || req.data;
            // const address = fields.address || fields['address'];

            // const address = req.query.address;
            payment.createMerchantTransferFundingAndPayment(requestDataSimple);

        } catch (error) {
            next(error);
        }
    });

    var requestDataSimple = {"partnerId":"ptnr_BEeCrYJHh2BXTXPy_PEtp-8DBOo","merchant_transfer":{
    "transfer_reference":"4007826709474811576743651734315950554193",
    "payment_type":"P2M","transfer_amount":{"value":"18","currency":"USD"},
    "payment_origination_country":"USA","sender_account_uri":
    "pan:5184680430000006;exp\u003d2077-08;cvc\u003d123",
    "digital_account_reference_number":"pan:5234568000001234","sender":{
      "first_name":"John","middle_name":"Tyler","last_name":"Jones",
      "address":{"line1":"21 Broadway","line2":"Apartment A-6","city":
        "OFallon","country_subdivision":"MO","postal_code":"63368","country":
        "USA"},"phone":"11234565555","email":"John.Jones123@abcmail.com"},
    "recipient_account_uri":
    "pan:5184680430000014;exp\u003d2077-08;cvc\u003d123","recipient":{
      "first_name":"Jane","middle_name":"Tyler","last_name":"Smith",
      "address":{"line1":"1 Main St","line2":"Apartment 9","city":
        "OFallon","country_subdivision":"MO","postal_code":"63368","country":
        "USA"},"phone":"11234567890","email":"Jane.Smith123@abcmail.com",
      "merchant_category_code":"3000"},"reconciliation_data":{"custom_field":
      [{"name":"GHI","value":"123"},{"name":"ABC","value":"456"},{"name":
          "DEF","value":"789"}]},"transaction_local_date_time":
    "2016-09-22T13:22:11-05:30","participant":{"card_acceptor_id":
      "1234567890ABCDE","card_acceptor_name":"WELLS FARGO BANK NA"},
    "participation_id":"TERMINAL34728","additional_message":"mymessage",
    "mastercard_assigned_id":"123456"}};
};
