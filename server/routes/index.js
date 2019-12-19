/**
 * routes index.js
 *
 * Index all routes of application. All controllers will be imported here.
 * 
 * 
 * @awaisayub149 awaisayub149@gmail.com
 */

"use strict"
const asyncMiddleware = require('../lib/async-middleware');

const router = require('express').Router();
const multer = require('multer');

/* UnComment if you want to handle multipart requests
 const storage = multer.memoryStorage()
 const upload = multer({ storage });
 
*/

const {
    usersController
} = require('../controllers');

/******************** USER ROUTES*********************/

router.get('/users', asyncMiddleware(usersController.listUsers));
router.get('/users/profile', asyncMiddleware(usersController.getProfile));
router.put('/users/profile', asyncMiddleware(usersController.updateProfile));
router.post('/users', asyncMiddleware(usersController.create));
router.put('/users/:id', asyncMiddleware(usersController.update));


/****************** Session Routes *******************/

router.post('/login', asyncMiddleware(usersController.login));
router.get('/register', asyncMiddleware(usersController.confirmEmailSignUp));
router.post('/register', asyncMiddleware(usersController.register));

/****************** Password Recovery Routes *******************/

router.post('/password/request', asyncMiddleware(usersController.resetPasswordRequest));
router.post('/password/code', asyncMiddleware(usersController.verifyResetPasswordToken));
router.post('/password/reset', asyncMiddleware(usersController.resetPassword));

/****************** Entity 1  ROUTES ***********************/


/****************** Entity 2  ROUTES ***********************/


/****************** Entity 3  ROUTES ***********************/


/****************** Entity 4  ROUTES ***********************/


/****************** Entity 5  ROUTES ***********************/


/****************** Entity 6  ROUTES ***********************/


module.exports = router;