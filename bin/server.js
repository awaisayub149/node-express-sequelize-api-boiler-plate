/**
 * server.js
 *
 * This is the main entry for our app which created in app.js
 * 
 * @awaisayub149 awaisayub149@gmail.com
 *
 */
const http = require('http');
const app = require('../app'); // The express app we just created

const port = parseInt(process.env.PORT, 10) || 8001;
app.set('port', port);
const server = http.createServer(app);
server.listen(port);
console.log('Server started @ PORT:',port);
