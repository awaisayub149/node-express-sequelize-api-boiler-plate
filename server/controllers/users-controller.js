/**
 * controllers users-controller.js
 *
 * Controlls the request and forward the valid data to services
 * 
 * @awaisayub149 awaisayub149@gmail.com
 *
 */
"use strict"
const {
    User
} = require('../models');
const UserService = require('../modules/users/user.service');
const {
    errMsg,
    errCode
} = require('../lib/errors');

module.exports = {
    listUsers: async (req, res) => {
        return UserService.listUsers(req.query.page);
    },
    create: async (req, res) => {
        if (!req.body.email || !req.body.firstName) return {
            error: errCode.BAD_REQUEST,
            message: errMsg.PARAMS_MISSING
        }

        return UserService.create(req.body, req.user['id']);
    },
    getProfile: async (req, res) => {
        return UserService.getProfile(req.user['id']);
    },
    updateProfile: async (req, res) => {
        return UserService.updateProfile(req.user['id'], req.body);
    },
    update: async (req, res) => {
        return UserService.update(req.body, req.params.id);
    },
    login: async (req, res) => {
        if (!req.body.email || !req.body.password) 
        return {
            error: errCode.BAD_REQUEST,
            message: "email or password is missing."
        }
        return UserService.login(req.body);
    },
    confirmEmailSignUp: async (req, res) => {
        if (!req.query.token) 
        return {
            error: errCode.BAD_REQUEST,
            message: "token is missing."
        }
        return UserService.confirmSignUpUser(req.query.token);
    },
    register: async (req, res) => {
        if (!req.query.token) 
        return {
            error: errCode.BAD_REQUEST,
            message: "token is missing."
        }
        return UserService.register(req.body, req.query.token);
    },
    resetPasswordRequest: async (req, res) => {
        if (!req.body.email) 
        return {
            error: errCode.BAD_REQUEST,
            message: errMsg.PARAMS_MISSING
        }

        return UserService.resetPasswordRequest(req.body.email);
    },
    verifyResetPasswordToken: async (req, res) => {
        if (!req.body.token) 
        return {
            error: errCode.BAD_REQUEST,
            message: errMsg.PARAMS_MISSING
        }
        return UserService.verifyResetPasswordToken(req.body.token);
    },
    resetPassword: async (req, res) => {
        if (!req.body.password || !req.body.token) 
        return {
            error: errCode.BAD_REQUEST,
            message: errMsg.PARAMS_MISSING
        }
        return UserService.resetPassword(req.body.password, req.body.token);
    }
};