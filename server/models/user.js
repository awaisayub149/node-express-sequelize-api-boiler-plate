/**
 *  models user.js
 *
 * 
 * All the user realted properties are defined here, which will then be used via sequelize.
 * 
 *  
 * Association and indexes are deinfed.
 *
 *
 * @awaisayub149 awaisayub149@gmail.com
 *
 */


'use strict';

const saltRounds = process.env.SALT_ROUNDS || 10;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Upload = require('../lib/uploader');

module.exports = (Sequelize, DataTypes) => {
    const User = Sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        email: {
            type: DataTypes.STRING,
            unique: {
                args: true,
                message: 'Email must be unique.',
            },
            validate: {
                isEmail: true,
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        phone: {
            type: DataTypes.STRING,
        },
        picture: DataTypes.STRING,
        address: DataTypes.STRING(500),
        // role:  {
        //   type:   DataTypes.ENUM,
        //   values: ['Admin', 'Client', "SubAdmin"]
        // },
        disabled: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        lastSeen: {
            type: DataTypes.DATE
        },
        deletedAt: {
            type: DataTypes.DATE,
            defaultValue: null
        },
        referenceIdFacebook: DataTypes.STRING,
        referenceIdGoogle: DataTypes.STRING,
        resetPasswordToken: DataTypes.STRING,
        confirmSignup: DataTypes.STRING,

        name: {
            type: DataTypes.VIRTUAL,
            get() {
                return `${this.firstName} ${this.lastName}`;
            }
        }
    }, {
        // For soft deleting.
        paranoid: true,
        privateColumns: ['password', 'createdAt', 'updateAt'],

        hooks: {
            async beforeSave(user, options) {
                if (user.changed('password')) {
                    user.password = await bcrypt.hash(user.password, saltRounds);
                }
                return user;
            },
        },

        validate: {
            async isUniq() {
                // Validates the unqiueness of the email within the system.
                if (this.changed("email")) {
                    const dupEmail = await User.count({
                        where: {
                            id: {
                                $not: this.id
                            },
                            email: this.email
                        },
                        paranoid: false
                    });
                    if (dupEmail > 0) {
                        throw new Error("Email is already associated with another account.")
                    }
                }
            },
            // Validates the Email presence
            async isValid() {
                if (this.email && this.email === "") {
                    throw new Error("Email is required to continue.")
                }
            }
        },
        indexes: [{
            unique: true,
            fields: ['email']
        }],

    });

    User.jsonAttrs = ['id', 'firstName', 'lastName', 'name', 'email', 'phone', 'picture', 'role'];

    User.associate = function (models) {
        // DEFINE ASSOCIATION HERE
        // User.hasMany(models.Contact, {
        //   foreignKey: 'userId',
        //   onDelete: 'CASCADE'
        // });

        // User.hasMany(models.Task, {
        //   foreignKey: 'creatorId',
        //   onDelete: 'CASCADE'
        // });

        // User.hasMany(models.Comment, {
        //   foreignKey: 'userId',
        //   onDelete: 'CASCADE'
        // });

        // User.hasMany(models.Document, {
        //   foreignKey: 'uploaderId',
        //   onDelete: 'CASCADE'
        // });

        // // User.hasMany(models.CommentRecipient, {
        // //   foreignKey: 'userId',
        // //   onDelete: 'CASCADE'
        // // });

        // User.hasMany(models.Notification, {
        //   foreignKey: 'creatorId',
        //   onDelete: 'CASCADE',
        //   as: 'Creator'
        // });

    };

    User.prototype.authenticate = function (password) {
        return bcrypt.compare(password, this.password);
    }


    User.prototype.signIn = function () {
        const token = jwt.sign({
            id: this.id,
            role: this.role
        }, process.env.JWT_SECRET, {});
        return token;
    };

    User.prototype.toJSON = function () {
        const json = {};
        const attrs = ['id', 'firstName', 'lastName', 'picture', 'name', 'email', 'phone', 'role']
        attrs.forEach((attr) => {
            json[attr] = this[attr]
        })
        return json;
    };

    User.prototype.saveImageBase64 = function (base64) {
        if (base64) {
            return Upload(base64, this);
        }
        return null;
    };

    return User;
};