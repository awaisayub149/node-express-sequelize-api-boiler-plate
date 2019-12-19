/**
 * lib verifyAuth.js
 *
 * All the constants will defined here. Custom constants will be added.
 * 
 * @awaisayub149 awaisayub149@gmail.com
 *
 */

const jwt = require('jsonwebtoken');
const { User } = require('../models');

module.exports = async (req, payload, done) => { 
  let token = req.headers.authorization.split(" ")[1];

  if (payload) {
    let validToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!validToken) return done(null, true);
  }
  
  return done(null, false);
}