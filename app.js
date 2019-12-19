/**
 *
 * app.js
 *
 * Express app setup. Morgan used as a logger system.
 *
 * @awaisayub149 awaisayub149@gmail.com
 *
 */

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
const cors = require('cors');
require('dotenv').config();

const respondWithError = require('./server/utils/respond').withError;
const verifyAuth = require('./server/lib/verify-auth');

// Set up the express app
const app = express();
const morgan = require('morgan');
// Log requests to the console.
app.use(logger('dev'));
// Enable cors
app.use(cors());
app.options('*', cors());

// Parse incoming requests data.
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(morgan('combined'));

app.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to my App API Server.',
}));

app.use('/api/v1', require('./server/routes'));

app.use(jwt({ secret: process.env.JWT_SECRET, isRevoked: verifyAuth }).unless({
	path: [/\/register*/, '/api/v1/login' ,'/api/v1/register/*', /\/api\/v1\/password/i, /\/public/i]
}));

app.use((err, req, res, next) => {
  console.log('====================================');
  console.log('Error',err);
  console.log('====================================');
  return respondWithError(res, err);
});
process.on('unhandledRejection', (error) => {
  // Will print "unhandledRejection err is not defined"
  console.log('unhandledRejection', error.message);
});

require('./server/modules/listeners/');


module.exports = app;
