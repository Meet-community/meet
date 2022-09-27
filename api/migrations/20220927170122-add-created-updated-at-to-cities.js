'use strict';

const table = 'cities';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        table,
        'created_at',
        Sequelize.DATE,
        {
          defaultValue: Sequelize.fn('now'),
          allowNull: false,
        }
      ),
      queryInterface.addColumn(
        table,
        'updated_at',
        Sequelize.DATE,
        {
          defaultValue: Sequelize.fn('now'),
          allowNull: false,
        }
      ),
    ]);
  },

  async down (queryInterface) {
    return Promise.all([
      queryInterface.removeColumn(table, 'created_at'),
      queryInterface.removeColumn(table, 'updated_at'),
    ]);
  }
};
