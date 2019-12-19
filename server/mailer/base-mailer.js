/**
 * mailer baseMailer.js
 *
 * Uses sendgrid package to send emails to recpients
 * 
 * @awaisayub149 awaisayub149@gmail.com
 *
 */
//  Uncomment if want to use sendgrid

// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// module.exports = (to, templateData, templateId) => {
// 	const payload = {
// 		to: to,
// 		from: process.env.EMAIL_SENDER,
// 		templateId: templateId,
//     dynamic_template_data: templateData 
// 	};
//     return sgMail.send(payload, (error, result) => {
//     if (error) {
//       console.log(error)
//     }
//     else {
//       console.log("MAIL SENT.......")
//     }
//   });
// }


const nodemailer = require('nodemailer');

module.exports = (from, to, subject, html) => {
  let smtpTransport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT || 587,
        secure: (process.env.SMTP_PORT == 465) || false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
  });

  if (!from) {
    from = process.env.SMTP_DEFAULT_MAILER;
  }

  if ( typeof(to) == Array ) {
    to = to.join(", ");
  }
  let mailOptions = {
        to: to, from: from,
        subject: subject,
  };

  if (html) {
    mailOptions.html = html;
  }
     
    return smtpTransport.sendMail(mailOptions);
}