/**
 * utils respond.js
 *
 * Custom util to serve as responder for  application
 * 
 * @awaisayub149 awaisayub149@gmail.com
 *
 */


const { OK, ERROR, UNAUTHORIZED } = require('../lib/constants').STATUS;
const {errCode} = require('../lib/errors');

const respond = {
  do: async (res, status, message="Success", data={}) => {

    let code = OK;
    if (status === 401) {
      code = UNAUTHORIZED;
    } else if (status === 400 || status === 500 || status === 404) {
      code = ERROR;
    }

    return res.status(status).send({
      code,
      message,
      data: data || {}
    })
  },
  withError(res, err) {
    console.log("|--=-=-=-=-=-=-ERROR-=-=-=-=--=-=--|")
    console.log(err)

    if (err.name === "SequelizeValidationError" || err.name === errCode.BAD_REQUEST) {
      return respond.do(res, err.status || 400, err.errors[0].message);

    } else if (err.name === "ERR_RESOURCE_NOT_FOUND") {
      return respond.do(res, 404, err.errors[0].message);

    } else if (err.name === 'UnauthorizedError') {
      return respond.do(res, 401, "Invalid token or disabled.");

    } else {
      return respond.do(res, err.status || 500, errCode.UNKNOWN);
    }
  }
}
module.exports = respond;
