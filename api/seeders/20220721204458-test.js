'use strict';

module.exports = {
  async up (queryInterface) {
    return queryInterface.bulkInsert('users', [{
      first_name: 'Vova',
      last_name: 'Pes',
    }]);
  },
  
  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', { first_name: 'Vova' });
  }
};
