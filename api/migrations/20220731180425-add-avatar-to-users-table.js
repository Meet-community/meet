const table = 'users';
const avatarColumn = 'avatar';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      table,
      avatarColumn,
      Sequelize.TEXT,
    );
  },

  async down (queryInterface) {
    return queryInterface.removeColumn(table, avatarColumn);
  }
};
