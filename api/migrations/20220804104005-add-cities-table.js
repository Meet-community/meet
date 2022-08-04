const table = 'cities';
const columns = {
  name: 'name',
  googleId: 'google_id',
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      table,
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        [columns.googleId]: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        [columns.name]: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
    );

    return queryInterface.addIndex(
      table,
      [columns.googleId],
    );
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable(table);

  },
};
