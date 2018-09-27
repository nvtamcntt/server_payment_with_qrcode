'use strict';

module.exports = function() {
    const app = this.app;
    const passport = this.passport;

    const validateParameters = (req) => {
        // Optional
        req.checkQuery('userid', 'Page needs to be a number').optional().isNumeric();
        req.checkQuery('startBlock', 'startBlock needs to be a number').optional().isNumeric();
        req.checkQuery('endBlock', 'endBlock needs to be a number').optional().isNumeric();
        req.checkQuery('limit', 'limit needs to be a number').optional().isNumeric();
        req.checkQuery('txid', 'Transaction needs to be alphanumeric and have a length 64').optional().matches('/^(0x){1}([A-Fa-f0-9]{62})$/');
        req.checkQuery('contractAddress', 'Contract\'s address needs to be alphanumeric and have a length 42').optional().matches('/^(0x){1}[0-9a-fA-F]{40}$/');
        req.checkQuery('address', 'Ethereum\' Address needs to be alphanumeric and have a length 42').matches('/^(0x){1}[0-9a-fA-F]{40}$/'); // .isAlphanumeric().isLength({ min: 42, max: 42 });

        return req.validationErrors();
    };

    app.get('/account', passport.authenticate('bearer', { session: false, failWithError: true }), (req, res, next) => {
        try {
            const account = req.account;
            res.status(200).json({
                success: true,
                message: 'Operate successfully',
                account: account
            });
        } catch (e) {
            next(e);
        }
    });

    // app.get('/account/profile', passport.authenticate('bearer', { session: false, failWithError: true }), (req, res, next) => {
    //     try {
    //         const account = req.account;
    //         res.status(200).json({
    //             success: true,
    //             message: 'Operate successfully',
    //             account: account
    //         });
    //     } catch (e) {
    //         next(e);
    //     }
    // });
};
