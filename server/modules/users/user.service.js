/**
 *  userModule service.js
 *
 * 
 *  User service will have all the queries related to user modules
 * 
 *
 *  @awaisayub149 awaisayub149@gmail.com
 *
 */
"use strict"

const Sequelize = require('sequelize');

const {
    User
} = require('../../models');
const mapper = require('./user.mapper');
const {
    errMsg,
    errCode
} = require('../../lib/errors');
const Dispatcher = require('../dispatcher/index');
const randomstring = require("randomstring");


const userParams = (body, edit) => {
    let attrs;
    if (!edit) {
        attrs = ['firstName', 'lastName', 'email', 'phone', 'role', 'confirmSignup'];
    } else {
        attrs = ['firstName', 'lastName', 'phone', 'confirmSignup', 'password', 'address'];
    }
    const json = {};
    attrs.map((attr) => {
        if (body[attr]) json[attr] = body[attr];
    })
    return json;
}
const self = module.exports = {
    // ******************** Account Methods ***********************//

    listUsers: async (role, page = 1, limit = 20) => {
        let users;
        try {
            users = await User.findAll({
                order: [
                    ['firstName', 'ASC']
                ],
                offset: (page * limit) - limit,
                limit
            });
        } catch (err) {
            return {
                error: errCode.UNKNOWN,
                message: errMsg.SOMETHING_WRONG
            }
        }
        return {
            data: {
                user: mapper.map(users)
            }
        };
    },
    create: async (userParam, reqId) => {

        userParam.confirmSignup = randomstring.generate();
        const user = await User.create(userParams(userParam));
        if (!user) return {
            message: errMsg.SOMETHING_WRONG,
            error: errCode.UNKNOWN,
        }

        Dispatcher.onNewAccount({
            eventType: "NewAccount",
            data: {
                email: user.email,
                name: user.name,
                token: user.confirmSignup
            }
        });

        return {
            data: {
                user: mapper.mapFull(user),
                message: "Created Successfully"
            }
        }
    },
    getProfile: async (userId) => {

        const currentUser = await User.findById(userId);
        if (!currentUser) return {
            message: errMsg.USER_DOESNT_EXIST,
            error: errCode.RESOURCE_NOT_FOUND
        };

        return {
            data: {
                user: mapper.mapFull(currentUser)
            }
        }

    },
    updateProfile: async (userId, userParam) => {

        const currentUser = await User.findById(userId);
        if (!currentUser) return {
            message: errMsg.USER_DOESNT_EXIST,
            error: errCode.RESOURCE_NOT_FOUND
        };

        currentUser.set(userParams(userParam, true));
        if (userParam.picture) {
            currentUser.picture = await currentUser.saveImageBase64(userParam.picture);
        }
        await currentUser.save();
        return {
            data: {
                user: mapper.mapFull(currentUser)
            }
        }
    },
    login: async (params) => {
        const user = await User.findOne({
            where: {
                email: params.email,
                disabled: false
            }
        });
        console.log(user);
        if (!user) return {
            message: errMsg.USER_DOESNT_EXIST,
            error: errCode.RESOURCE_NOT_FOUND
        };
        if (user.confirmSignup !== null) return {
            message: "Please Confirm your signup first.",
            error: errCode.BAD_REQUEST
        };
        if (user.disabled) return {
            message: "Disabled user! Cannot signin."
        };

        let isValid = false;
        if (params.password) {
            isValid = await user.authenticate(params.password);
        }

        if (!isValid) return {
            message: "Password is invalid",
            error: errCode.BAD_REQUEST
        };

        const token = user.signIn();
        return {
            message: 'Authorized',
            data: {
                user: mapper.mapFull(user),
                token
            }
        }
    },
    confirmSignUpUser: async (signupToken) => {

        const user = await User.findOne({
            where: {
                confirmSignup: signupToken
            }
        });
        if (!user) return {
            message: "User Not Found or already signed up.",
            error: errCode.RESOURCE_NOT_FOUND
        };

        return {
            data: {
                user: mapper.mapFull(user)
            }
        }

    },
    register: async (params, token) => {

        const user = await User.findOne({
            where: {
                email: params.email,
                confirmSignup: token
            }
        });
        if (!user) return {
            message: "User Not Found or already signed up.",
            error: errCode.RESOURCE_NOT_FOUND
        };
        user.confirmSignup = null;
        user.set(userParams(params, true));
        const status = await user.save();
        const loginToken = user.signIn();

        return {
            messaes: "Registered Successfully",
            data: {
                user: mapper.mapFull(user),
                token: loginToken
            }
        }
    },
    resetPasswordRequest: async (email) => {

        const user = await User.findOne({
            where: {
                email,
                confirmSignup: null
            }
        });

        if (!user) return {
            message: "Account Not Found or not Signedup yet.",
            error: "ResourceNotFound"
        };

        if (user.disabled) return {
            error: errCode.BAD_REQUEST,
            message: "Account is disabled cannot recover password."
        };

        const token = randomstring.generate();
        const status = await user.update({
            resetPasswordToken: token
        });

        Dispatcher.onResetPasswordRequest({
            eventType: "resetPasswordRequest",
            data: {
                email: user.email,
                name: user.name,
                resetPasswordToken: token
            }
        });

        return {
            message: `Password recovery email sent to ${email}`
        }
    },
    verifyResetPasswordToken: async (token) => {

        const status = await User.count({
            where: {
                resetPasswordToken: token,
                disabled: false
            }
        });
        if (status != 1) return {
            message: "Url expired. Please try again.",
            error: errCode.BAD_REQUEST
        }

        return {
            message: "Success"
        };
    },
    resetPassword: async (password, token) => {

        const user = await User.findOne({
            where: {
                resetPasswordToken: token
            }
        });

        if (!user) return {
            message: "Url Expired.",
            error: errCode.RESOURCE_NOT_FOUND
        };

        user.set({
            password,
            resetPasswordToken: ''
        });
        user.save();

        return {
            message: "Password updated."
        }
    }

};