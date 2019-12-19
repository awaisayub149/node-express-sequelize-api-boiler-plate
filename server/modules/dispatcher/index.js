/**
 *  dispatcher dispatcher.js
 *
 * 
 *  List all the dispatcher actions here
 * 
 *
 *  @awaisayub149  awaisayub149@gmail.com
 *
 */


const amqp = require('amqplib/callback_api');

const send = (q, data) => {
  amqp.connect(process.env.RABBITMQ_URL, (err, conn) => {
    conn.createChannel((err, ch) => {
      ch.assertQueue(q, {durable: false});
      // Note: on Node 6 Buffer.from(msg) should be used
      ch.sendToQueue(q, Buffer.from(JSON.stringify(data)));
      console.log(" [x] Sent %s", JSON.stringify(data));
    });
    setTimeout(() => { conn.close(); }, 500);
  });

}

module.exports = {

  onNewAccount: (data) => {
    send('MAIL_NEW_ACCOUNT', data);
  },
  onResetPasswordRequest: (data) => {
    send('RESET_PASSWORD_REQUEST', data);
  }


}