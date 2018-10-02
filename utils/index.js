// 
const getMerchantDataForTesting = (config)=> {
    let dataJson;
    try {
        let path = config.pathFileData;
        path = '../' + path;
        dataJson = require(path);
    } catch (err) {
        throw err;
    }
    return dataJson;
}


module.exports = {
    getMerchantDataForTesting
}
