/**
 * lib customError.js
 *
 * This Module will serve as for construction custom messages for response.
 * 
 * @awaisayub149  awaisayub149@gmail.com
 *
 */

"use strict"
function CustomError (name, status, error) {
  this.name = name;
  this.message = error.message;
  Error.call(this, error.message);
  Error.captureStackTrace(this, this.constructor);
  this.code = name;
  this.status = status;
  this.inner = error;
}

CustomError.prototype = Object.create(Error.prototype);
CustomError.prototype.constructor = CustomError;

module.exports = CustomError;