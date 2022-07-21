'use strict';

const {User} = require('../src/models/User');
module.exports = {
  async up (queryInterface) {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'Vova',
      lastName: 'Pes',
      email: 'example@example.com',
    }]);
  },

  async down (queryInterface) {
    return queryInterface.delete(User, 'Users', { where: { id: 4 }});
  }
};
