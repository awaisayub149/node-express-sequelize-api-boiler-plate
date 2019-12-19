/*
*
*  emailNotificationService.js
*
*  All email notifiers are listed here.
*
*   @awaisayub149 awaisayub149@gmail.com
*
**/


const MailerService = require('../../mailer');

module.exports = () => {
  
  return {
    create: async (params) => {
      switch (params.eventType) {
        case 'NewAccount':
          return await MailerService.usersMailer.newAccountMail(params);
        case 'resetPasswordRequest':
          return await MailerService.usersMailer.resetPasswordMail(params);
        default:
          throw new Error("Notification Event Type Not Found")
      }

    },
  }
}
