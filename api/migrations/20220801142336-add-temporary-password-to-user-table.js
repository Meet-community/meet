const table = 'users';
const temporaryPasswordColumn = 'temporary_password';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      table,
      temporaryPasswordColumn,
      Sequelize.STRING,
    );
  },

  async down (queryInterface) {
    return queryInterface.removeColumn(table, temporaryPasswordColumn);
  }
};
