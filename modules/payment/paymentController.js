'use strict';
const p2m = require ('mastercard-p2m');
const MasterCardAPI = p2m.MasterCardAPI;

module.exports = class PaymentController {
    constructor(config) {
        constructor();
        this.keyStore = config.keyStore;
        console.log("api key store ==> ", this.keyStore.consumerKey);
        console.log("api key store ==> ", this.keyStore.keyStorePath);
        console.log("api key store ==> ", this.keyStore.keyAlias);
        console.log("api key store ==> ", this.keyStore.keyPassword);
        this.initConfigKeystore();
    }
    initConfigKeystore(){
        // let authentication = new MasterCardAPI.OAuth(
        //     this.keyStore.consumerKey, 
        //     this.keyStore.keyStorePath, 
        //     this.keyStore.keyAlias, 
        //     this.keyStore.keyPassword
        // );
        // console.log("initConfigKeystore ==> ", authentication);
        // MasterCardAPI.init({
        //     sandbox: true,
        //     debug: true,  // false -> live 
        //     authentication: authentication
        // });
    }

    createMerchantTransferFundingAndPayment(requestData){
         console.log(" =====================> requestData1111111 ", requestData);
        let authentication = new MasterCardAPI.OAuth(
            this.keyStore.consumerKey, 
            this.keyStore.keyStorePath, 
            this.keyStore.keyAlias, 
            this.keyStore.keyPassword
        );
        console.log(" =====================>  111111111111111");
        MasterCardAPI.init({
            sandbox: true,
            debug: true,  // false -> live 
            authentication: authentication
        });


    var requestDataSimpleTEST = 
    {"partnerId":"ptnr_BEeCrYJHh2BXTXPy_PEtp-8DBOo",
    "merchant_transfer":{
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
        console.log(" =====================>  2222222222222222222");
        p2m.MerchantTransferFundingAndPayment.create(requestDataSimpleTEST, function (error, data) {
            console.log(" =====================> requestData222222 ", requestDataSimpleTEST);
            console.log(" nvtamcntt=====================> ", error);
            if (error) {
                console.log("HttpStatus: "+error.getHttpStatus());
                console.log("Message: "+error.getMessage());
                console.log("ReasonCode: "+error.getReasonCode());
                console.log("Source: "+error.getSource());
                console.log(error);
            }else {
                console.log(data.merchant_transfer.id); //-->mtrn_8HmnHRkW5CsHsKtIGEJ8azsrwnJ
                console.log(data.merchant_transfer.resource_type); //-->merchant_transfer
                console.log(data.merchant_transfer.transfer_reference); //-->4007826709474811576743651734315950554193
                console.log(data.merchant_transfer.payment_type); //-->P2M
                console.log(data.merchant_transfer.sender_account_uri); //-->pan:************0006
                console.log(data.merchant_transfer.digital_account_reference_number); //-->pan:************1234
                console.log(data.merchant_transfer.payment_origination_country); //-->USA
                console.log(data.merchant_transfer.sender.first_name); //-->John
                console.log(data.merchant_transfer.sender.middle_name); //-->Tyler
                console.log(data.merchant_transfer.sender.last_name); //-->Jones
                console.log(data.merchant_transfer.sender.address.line1); //-->21 Broadway
                console.log(data.merchant_transfer.sender.address.line2); //-->Apartment A-6
                console.log(data.merchant_transfer.sender.address.city); //-->OFallon
                console.log(data.merchant_transfer.sender.address.country_subdivision); //-->MO
                console.log(data.merchant_transfer.sender.address.postal_code); //-->63368
                console.log(data.merchant_transfer.sender.address.country); //-->USA
                console.log(data.merchant_transfer.sender.phone); //-->11234565555
                console.log(data.merchant_transfer.sender.email); //-->John.Jones123@abcmail.com
                console.log(data.merchant_transfer.recipient_account_uri); //-->pan:************0014
                console.log(data.merchant_transfer.recipient.first_name); //-->Jane
                console.log(data.merchant_transfer.recipient.middle_name); //-->Tyler
                console.log(data.merchant_transfer.recipient.last_name); //-->Smith
                console.log(data.merchant_transfer.recipient.address.line1); //-->1 Main St
                console.log(data.merchant_transfer.recipient.address.line2); //-->Apartment 9
                console.log(data.merchant_transfer.recipient.address.city); //-->OFallon
                console.log(data.merchant_transfer.recipient.address.country_subdivision); //-->MO
                console.log(data.merchant_transfer.recipient.address.postal_code); //-->63368
                console.log(data.merchant_transfer.recipient.address.country); //-->USA
                console.log(data.merchant_transfer.recipient.phone); //-->11234567890
                console.log(data.merchant_transfer.recipient.email); //-->John.Jones123@abcmail.com
                console.log(data.merchant_transfer.recipient.merchant_category_code); //-->3000
                console.log(data.merchant_transfer.transfer_amount.value); //-->18
                console.log(data.merchant_transfer.transfer_amount.currency); //-->USD
                console.log(data.merchant_transfer.created); //-->2016-09-22T13:22:11-05:30
                console.log(data.merchant_transfer.transaction_history.resource_type); //-->list
                console.log(data.merchant_transfer.transaction_history.item_count); //-->2
                console.log(data.merchant_transfer.transaction_history.data.transaction[0].id); //-->txn_KHesUdrpshiYXJVH_H702cCvtEK5
                console.log(data.merchant_transfer.transaction_history.data.transaction[0].resource_type); //-->transaction
                console.log(data.merchant_transfer.transaction_history.data.transaction[0].account_uri); //-->pan:************0006
                console.log(data.merchant_transfer.transaction_history.data.transaction[0].transaction_amount.value); //-->18
                console.log(data.merchant_transfer.transaction_history.data.transaction[0].transaction_amount.currency); //-->USD
                console.log(data.merchant_transfer.transaction_history.data.transaction[0].network); //-->MoneySend
                console.log(data.merchant_transfer.transaction_history.data.transaction[0].network_status_code); //-->00
                console.log(data.merchant_transfer.transaction_history.data.transaction[0].network_status_description); //-->Approved
                console.log(data.merchant_transfer.transaction_history.data.transaction[0].type); //-->FUNDING
                console.log(data.merchant_transfer.transaction_history.data.transaction[0].create_timestamp); //-->2016-08-29T01:07:37-05:30
                console.log(data.merchant_transfer.transaction_history.data.transaction[0].status); //-->APPROVED
                console.log(data.merchant_transfer.transaction_history.data.transaction[0].status_reason); //-->APPROVED
                console.log(data.merchant_transfer.transaction_history.data.transaction[0].status_timestamp); //-->2016-08-29T01:07:37-05:30
                console.log(data.merchant_transfer.transaction_history.data.transaction[0].retrieval_reference); //-->723411975497
                console.log(data.merchant_transfer.transaction_history.data.transaction[0].system_trace_audit_number); //-->975497
                console.log(data.merchant_transfer.transaction_history.data.transaction[0].unique_reference_number); //-->9261621456
                console.log(data.merchant_transfer.transaction_history.data.transaction[1].id); //-->txn_KHesUdrpshiYXJVH_H702cCvtEK5
                console.log(data.merchant_transfer.transaction_history.data.transaction[1].resource_type); //-->transaction
                console.log(data.merchant_transfer.transaction_history.data.transaction[1].account_uri); //-->pan:************0014
                console.log(data.merchant_transfer.transaction_history.data.transaction[1].transaction_amount.value); //-->18
                console.log(data.merchant_transfer.transaction_history.data.transaction[1].transaction_amount.currency); //-->USD
                console.log(data.merchant_transfer.transaction_history.data.transaction[1].network); //-->MoneySend
                console.log(data.merchant_transfer.transaction_history.data.transaction[1].network_status_code); //-->00
                console.log(data.merchant_transfer.transaction_history.data.transaction[1].network_status_description); //-->Approved
                console.log(data.merchant_transfer.transaction_history.data.transaction[1].type); //-->PAYMENT
                console.log(data.merchant_transfer.transaction_history.data.transaction[1].create_timestamp); //-->2016-08-29T01:07:37-05:30
                console.log(data.merchant_transfer.transaction_history.data.transaction[1].status); //-->APPROVED
                console.log(data.merchant_transfer.transaction_history.data.transaction[1].status_reason); //-->APPROVED
                console.log(data.merchant_transfer.transaction_history.data.transaction[1].status_timestamp); //-->2016-08-29T01:07:37-05:30
                console.log(data.merchant_transfer.transaction_history.data.transaction[1].retrieval_reference); //-->723411975497
                console.log(data.merchant_transfer.transaction_history.data.transaction[1].system_trace_audit_number); //-->975497
                console.log(data.merchant_transfer.transaction_history.data.transaction[1].unique_reference_number); //-->9261621456
                console.log(data.merchant_transfer.reconciliation_data.custom_field[0].name); //-->GHI
                console.log(data.merchant_transfer.reconciliation_data.custom_field[0].value); //-->123
                console.log(data.merchant_transfer.reconciliation_data.custom_field[1].name); //-->ABC
                console.log(data.merchant_transfer.reconciliation_data.custom_field[1].value); //-->456
                console.log(data.merchant_transfer.reconciliation_data.custom_field[2].name); //-->DEF
                console.log(data.merchant_transfer.reconciliation_data.custom_field[2].value); //-->789
                console.log(data.merchant_transfer.original_status); //-->APPROVED
                console.log(data.merchant_transfer.status); //-->APPROVED
                console.log(data.merchant_transfer.status_timestamp); //-->2016-08-29T01:07:37-05:00
                console.log(data.merchant_transfer.transaction_local_date_time); //-->2016-09-22T13:22:11-05:30
                console.log(data.merchant_transfer.mastercard_assigned_id); //-->123456
                console.log(data.merchant_transfer.participant.card_acceptor_name); //-->WELLS FARGO BANK NA
                //This sample shows looping through merchant_transfer.transaction_history.data.transaction
                console.log("This sample shows looping through merchant_transfer.transaction_history.data.transaction");
                data.merchant_transfer.transaction_history.data.transaction.forEach(function(item) {
                    console.log(item, "id")
                    console.log(item, "resource_type")
                    console.log(item, "account_uri")
                    console.log(item, "transaction_amount")
                    console.log(item, "network")
                    console.log(item, "network_status_code")
                    console.log(item, "network_status_description")
                    console.log(item, "type")
                    console.log(item, "create_timestamp")
                    console.log(item, "status")
                    console.log(item, "status_reason")
                    console.log(item, "status_timestamp")
                    console.log(item, "retrieval_reference")
                    console.log(item, "system_trace_audit_number")
                    console.log(item, "unique_reference_number")
                });
            }
        });
    }

};
