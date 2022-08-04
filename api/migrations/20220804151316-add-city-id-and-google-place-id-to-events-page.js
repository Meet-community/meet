const table = 'events';
const column = {
  cityId: 'city_id',
  googlePlaceId: 'google_place_id',
};
const columns = Object.values(column);

module.exports = {
  async up(queryInterface, Sequelize) {
    await Promise.all([

      queryInterface.addColumn(
        table,
        column.googlePlaceId,
        Sequelize.STRING,
      ),

      queryInterface.addColumn(
        table,
        column.cityId,
        Sequelize.INTEGER,
        {
          allowNull: false,
        }
      ),

    ]);

    return Promise.all([

      queryInterface.addConstraint(
        table,
        {
          type: 'foreign key',
          fields: [column.cityId],
          references: {
            table: 'cities',
            field: 'id',
          },
          onDelete: 'CASCADE',
        },
      ),

      queryInterface.addIndex(
        table,
        [column.cityId],
      ),
    ]);
  },

  async down(queryInterface) {
    return Promise.all(columns.map((columnName) => (

      queryInterface.removeColumn(table, columnName)

    )));
  }
};
