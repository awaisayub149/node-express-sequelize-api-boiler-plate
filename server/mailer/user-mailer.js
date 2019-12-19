/**
 * mailer userMailer.js
 *
 * Compiles mails for every entity. Pushes the mail payload to base mailer
 * 
 * @awaisayub149 awaisayub149@gmail.com
 *
 */

const baseMailer = require('./base-mailer');
const moment = require('moment');
const baseUri = process.env.BASE_URI;
let today = moment().format('LL');

 module.exports = {
	newAccountMail: (params) => {

		let templateData = {
			userName: params.data.name,
			userAdded: params.data.requesterName,
			dateSent: today,
			reDirectLink: baseUri+'register?reg-token='+params.data.token
		}

		return baseMailer(params.data.email, templateData, process.env.NEW_ACCOUNT_TEMPLATE_ID);
	},
	resetPasswordMail: (params) => {

		let templateData = {
			userName: params.data.name,
			dateSent: today,
			reDirectLink: baseUri+'password-recovery?token='+params.data.resetPasswordToken
		}
		
		return baseMailer(params.data.email, templateData, process.env.PASSWORD_RECOVRY_TEMPLATE_ID);
	}

}