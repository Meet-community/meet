const table = 'users';
const column = {
  telegram: 'telegram',
  instagram: 'instagram',
  facebook: 'facebook',
};
const columns = Object.values(column);

module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all(columns.map((columnName) => (

      queryInterface.addColumn(
        table,
        columnName,
        Sequelize.STRING,
      )

    )));
  },

  async down(queryInterface) {
    return Promise.all(columns.map((columnName) => (

      queryInterface.removeColumn(table, columnName)

    )));
  }
};
