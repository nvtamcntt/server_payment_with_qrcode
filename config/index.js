'use strict';

const init = () => {
    // let redisURI 		= require('url').parse(process.env.REDIS_URL);
    // let redisPassword 	= redisURI.auth.split(':')[1];
    const config = {
        apiVersion: 'v1.0',
        // Ethereum node - plus wallet node
        // eth: {
        //     host: 'localhost',
        //     port: 8545,
        //     etherscanUrl: 'http://api.etherscan.io/api',
        //     tokensPath: './config/TokenAbi.json',
        //     etherscanToken: '2RF1BHT1VTWNWA93CPNT1IEC3WXWUKT482',
        
        //     patch: './config/TokenAbiOb.json'
        // },
        // keyStore:{
        //     consumerKey  : 'kUR3loVb14Ha_Doojmc0e1hkkxyNTVCc-bsZpu7728151b83!fcc55ccbb25842f295561ecf0afaf5500000000000000000',
        //     keyStorePath : 'QRCodePaymentProject-sandbox.p12',
        //     keyAlias     : 'keyalias',
        //     keyPassword  : 'keystorepassword'
        // },        
        keyStore:{
            consumerKey  : 'csbmYube20moXq3gDhaUyru4XJqYKVdcT9WMoMqL898a4c5d!49c8e11dfc274f239f04d1ef70ebce920000000000000000',
            keyStorePath : 'QRCodePayment1-sandbox.p12',
            keyAlias     : 'keyalias',
            keyPassword  : 'keystorepassword'
        },
        pathFileData: '/config/merchant_data.json',
        firebase: {
            apiKey: 'AIzaSyBaoH6L38NmlYuy9HySAiMZ9nEvH1GipO0',
            authDomain: 'pluswallet-4fb78.firebaseapp.com',
            databaseURL: 'https://pluswallet-4fb78.firebaseio.com',
            projectId: 'pluswallet-4fb78',
            storageBucket: '',
            messagingSenderId: '1012732610354'
        },
        tokenSecret: process.env.SECRET || 'FU_m#sts4]}Hj)H',
        auth: {
            // facebook
            facebook: {
                key: '535253749857084',
                secret: '93d78124a1deb399c7d94e2c21b9f99d'
            },
            // twitter
            twitter: {
                key: '',
                secret: ''
            },
            // google
            google: {
                key: '431860445525-fiquu8ap1fpvsbcp0t598t0hfdb4jqeo.apps.googleusercontent.com',
                secret: '3NBtBt62psgViC6f8fIXMpXc'
            },
            enableRegistration: true,
            passwordRegex: '^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9!$%@#£€*?&]{8,}$' // Minimum eight characters, at least one letter and one number
        },
        files: {
            enable: true,
            maxFileSize: 100000000,
            restrictTypes: false,
            allowedTypes: ['image/jpeg', 'image/png', 'image/gif'],
            local: {
                dir: 'uploads'
            }

        }
    };

    if (process.env.NODE_ENV === 'production') {
        return Object.assign({
            // Http request node
            db: 'mongodb://localhost/wallet_prod',
            http: {
                host: process.env.APP_HOST || 'localhost',
                port: process.env.APP_PORT || 80,
                enable: true
            },
            https: {
                port: 5001,
                key: '',
                cert: '',
                enable: false
            }
        }, config);
    }

    return Object.assign({
        db: 'mongodb://localhost:27017/wallet_dev',
        http: {
            port: 8000,
            enable: true
        },
        https: {
            enable: false,
            port: 5001,
            key: '',
            cert: ''
        }
    }, config);
};

module.exports = init();
