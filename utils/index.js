// 
const getMerchantTransferFundingDataForTesting = (config)=> {
    let dataJson;
    try {
        let path = config.pathFileMerchantTransferFundingData;
        path = '../' + path;
        dataJson = require(path);
    } catch (err) {
        throw err;
    }
    return dataJson;
}
const getMerchantTransferDataForTesting = (config)=> {
    let dataJson;
    try {
        let path = config.pathFileMerchantTransferData;
        path = '../' + path;
        dataJson = require(path);
    } catch (err) {
        throw err;
    }
    return dataJson;
}


module.exports = {
    getMerchantTransferFundingDataForTesting,
    getMerchantTransferDataForTesting
}
