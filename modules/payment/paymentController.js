'use strict';
const p2m = require ('mastercard-p2m');
const MasterCardAPI = p2m.MasterCardAPI;

const Utils    = require('../../utils');

module.exports = class PaymentController {
    constructor(config) {
        constructor();
        this.keyStore = config.keyStore;
        this.dataTesting = Utils.getMerchantDataForTesting(config);
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
    createMerchantTransferFundingAndPayment(){
        return new Promise((resolve, reject) => {
            p2m.MerchantTransferFundingAndPayment.create(this.dataTesting, function (error, data) {
                if (error) {
                    console.log(error);
                    return reject(error);
                }else {
                    return resolve(data);
                }
            });
        })

    }

};
