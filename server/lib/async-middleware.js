/**
 * lib asyncMiddleware.js
 *
 * Async middleware recive the payload and generates the response 
 * 
 * @awaisayub149  awaisayub149@gmail.com
 *
 */

const respond = require('../utils/respond').do;

module.exports = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).then((payload) => {
            if (payload.error) {
                next({
                    name: payload.error,
                    status: payload.status,
                    errors: [{
                        message: payload.message
                    }]
                }, req, res)
            } else {
                return respond(res, payload.status || 200, payload.message, payload.data);
            }
        }).catch(next);
    };

};