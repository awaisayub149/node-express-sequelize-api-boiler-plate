/**
 *  seeder mock user seeds
 *
 * 
 *  seeders to mock 10 users in to user table
 * 
 *
 *  @awaisayub149 awaisayub149@gmail.com
 *
 */

'use strict';

const faker = require('faker');
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');
require('dotenv').config()

module.exports = {

  up: async (queryInterface, Sequelize) => {
    const users = [];
        let password = await bcrypt.hash("admin125", 10)
        for (let i = 0; i < 10; i++) {
          const seedData = {
            id: uuidv4(),
            firstName: 'App',
            lastName: 'User ' +(i + 1),
            phone: faker.phone.phoneNumber(),
            email: 'appuser'+(i + 1)+'@mail.com',
            password: password,
            picture: faker.image.imageUrl(),
            createdAt: new Date(),
            updatedAt: new Date(),
          }
        users.push(seedData);
        };

    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Users', users, {});
  },

  down: (queryInterface, Sequelize) => {

    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */


    return queryInterface.bulkDelete('Users', null, {});
  }
};
