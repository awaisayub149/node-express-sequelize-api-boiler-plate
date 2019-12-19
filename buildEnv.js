/*
*
*	buildEnv.js
*
*	Envorinment copy for development and staging
*
*   @awaisayub149 awaisayub149@gmail.com
*
**/


const fs = require('fs');


module.exports.buildDev = () => {
console.log("====== COMPILING DEV ENV ======")
	fs.copyFile('.env.dev', '.env', (err) => {
	    if (err) throw err;
	    console.log('====== ENV DEV UPDATED ======');
	});
}

module.exports.buildStaging = () => {
	console.log('====== COMPILING STAGING ENV ======')
	fs.copyFile('.env.staging', '.env', (err) => {
	    if (err) throw err;
	    console.log('====== ENV STAGING UPDATED ======');
	});
}
