'use strict';
const p2m = require ('mastercard-p2m');
const MasterCardAPI = p2m.MasterCardAPI;

const Utils    = require('../../utils');
const TESTING_MODE = true;
module.exports = class PaymentController {
    constructor(config) {
        constructor();
        this.keyStore = config.keyStore;
        this.config   = config;
        console.log("api key store ==> ", this.keyStore.consumerKey);
        console.log("api key store ==> ", this.keyStore.keyStorePath);
        console.log("api key store ==> ", this.keyStore.keyAlias);
        console.log("api key store ==> ", this.keyStore.keyPassword);
        this.initConfigKeystore();
    }
    initConfigKeystore(){
        let authentication = new MasterCardAPI.OAuth(
            this.keyStore.consumerKey, 
            this.keyStore.keyStorePath, 
            this.keyStore.keyAlias, 
            this.keyStore.keyPassword
        );

        MasterCardAPI.init({
            // sandbox: true,
            environment: "sandbox_static", 
            debug: true,  // false -> live 
            authentication: authentication
        });
    }
    /*
    * TransferFundingAndPayment
    */
    createMerchantTransferFundingAndPayment(data){
        if (TESTING_MODE){
            this.dataTesting = Utils.getMerchantTransferFundingDataForTesting(this.config);
        }
        // console.log("========TESTING_MODE=========", makeData);
        let makeData = TESTING_MODE ? this.dataTesting : data;
        return new Promise((resolve, reject) => {
            p2m.MerchantTransferFundingAndPayment.create(makeData, function (error, data) {
                if (error) {
                    return reject({type: error.type, message: error.error});
                }else {
                    return resolve(data);
                }
            });
        })

    }
    /*
    * TransferAndPayment
    */
    createMerchantTransferAndPayment(data){
        if (TESTING_MODE){
            this.dataTesting = Utils.getMerchantTransferDataForTesting(this.config);
        }
        // console.log("========TESTING_MODE=========", makeData);
        let makeData = TESTING_MODE ? this.dataTesting : data;
        return new Promise((resolve, reject) => {
            p2m.MerchantTransferPayment.create(makeData, function (error, data) {
                if (error) {
                    return reject({type: error.type, message: error.error});
                }else {
                    return resolve(data);
                }
            });
        })

    }
    getMerchantRetrievalReadByID(data){
        this.dataTesting = {"partnerId":"ptnr_BEeCrYJHh2BXTXPy_PEtp-8DBOo","transferId": "mtrn_44D6941D9D4AD3F106F1"}
        let makeData = TESTING_MODE ? this.dataTesting : data;
        console.log("========TESTING_MODE=========", makeData);
        return new Promise((resolve, reject) => {
            p2m.MerchantRetrieval.readByID("", makeData, function (error, data) {
                if (error) {
                    return reject({type: error.type, message: error.error});
                }else {
                    return resolve(data);
                }
            });
        })
    }    
    getMerchantRetrievalReadByReference(data){
        this.dataTesting = {"partnerId":"ptnr_BEeCrYJHh2BXTXPy_PEtp-8DBOo","ref":"MTRNREF_20160829130404970"}
        let makeData = TESTING_MODE ? this.dataTesting : data;
        return new Promise((resolve, reject) => {
            p2m.MerchantRetrieval.readByReference(makeData, function (error, data) {
                if (error) {
                    return reject({type: error.type, message: error.error});
                }else {
                    return resolve(data);
                }
            });
        })
    }    
    testPaymentNotification(data){
        this.dataTesting = {"partnerId":"ptnr_BEeCrYJHh2BXTXPy_PEtp-8DBOo","notification_request":{
            "recipient_account_uri":"pan:5013040000000018","payment_type":"P2M",
            "merchant_category_code":"6011","recipient":{"name_on_account":
              "M\u0026M Corp","address":"Mahantan , NY, usa"},"additional_message":
            "001006XX123400201012353611110030073041233004008LYL44354005009EEB",
            "transaction_amount":{"currency":"USD"},"transfer_status":"APPROVED"}}
            
        let makeData = TESTING_MODE ? this.dataTesting : data;
        return new Promise((resolve, reject) => {
            p2m.TestPaymentNotification.create(makeData, function (error, data) {
                if (error) {
                    return reject({type: error.type, message: error.error});
                }else {
                    return resolve(data);
                }
            });
        })
    }
    readDigitalAccountReferenceNumber(data){
        this.dataTesting = {"partnerId":"ptnr_BEeCrYJHh2BXTXPy_PEtp-8DBOo","digital_account":{
            "reference":"ABC_231231233243242","account_uri":"raw:558900009012",
            "account_type":"CREDIT"}}
        ;
        let makeData = TESTING_MODE ? this.dataTesting : data;
        return new Promise((resolve, reject) => {
            p2m.DigitalAccountReferenceNumberRetrieval.read(makeData, function (error, data) {
                if (error) {
                    return reject({type: error.type, message: error.error});
                }else {
                    return resolve(data);
                }
            });
        })

    }
};
