/**
 * lib errors.js
 *
 * This Module will list all the error codes
 * 
 * @awaisayub149 awaisayub149@gmail.com
 *
 */


const errCode= {
	NONE: "ERR_NONE",
	UNKNOWN: "ERR_UNKNOWN",
	BAD_REQUEST: "ERR_BADREQUEST",
	SESSION_OUT: "ERR_SESSIONS_EXPIRED",
	RESOURCE_NOT_FOUND: "ERR_RESOURCE_NOT_FOUND"
};

const errMsg = {
	USER_DOESNT_EXIST: "User not found",
	SOMETHING_WRONG: "Oops! Something went wrong.",
	NOT_FOUND: "Not found. Please try again.",
	PARAMS_MISSING: "Missing or incorrect params.",
};

module.exports = {errCode, errMsg};
