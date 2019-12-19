/*
*
*  Consumer.js
*
*  Connection point for rabitMQ 
*
*   @awaisayub149 awaisayub149@gmail.com
*
**/

const amqp = require('amqplib/callback_api');

module.exports = (channel, fn) => {

    amqp.connect(process.env.RABBITMQ_URL, (err, conn) => {

      try {

        conn.createChannel((err, ch) => {
          ch.assertQueue(channel, {durable: false});
          console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", channel);
          ch.consume(channel, (msg) => {
            const data = JSON.parse(msg.content.toString());
            console.log(" [x] Received %s", msg.content.toString());

            fn(data);
          }, {noAck: true});
        });

      } catch (e) {

        console.log(new Error("Please make sure that you have Rabbit-MQ installed, configured and running."))
        process.exit();
        
      }

    });
  
}