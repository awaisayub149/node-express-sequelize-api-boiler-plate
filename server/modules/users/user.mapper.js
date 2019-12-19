/**
 *  userModule mapper.js
 *
 * 
 *  User mapper will deal with all json generating, mapping of attributes
 * 
 *
 *  @awaisayub149 awaisayub149@gmail.com
 *
 */
"use strict"

const shortMapperAttrs = ['id', 'firstName', 'lastName', 'email', 'picture', 'name'];
const fullMapperAttrs = ['id', 'firstName', 'lastName', 'email', 'picture', 'name', 'phone', 'address', 'createdAt'];
module.exports = {

    map: (users, propertyCount) => {

        const usersArray = (users.constructor.name == "Array") ? users : [users];
        return usersArray.map((user) => {
            const json = Object.assign(user.JSON(shortMapperAttrs), {})
            return json;
        })
    },
    mapFull: (user) => {

        const json = Object.assign(user.JSON(fullMapperAttrs));
        return json;
    },
}