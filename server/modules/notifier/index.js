/*
*
*  notifier index.js
*
*  Index all the notifiers here.
*
*   @awaisayub149 awaisayub149@gmail.com
*
**/


const notiferIoc = {}

notiferIoc.EmailNotificationService = require('./emailNotification.service')()
module.exports = notiferIoc