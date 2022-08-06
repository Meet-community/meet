const table = 'events';
const column = {
  eventLink: 'event_link'
};

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      table,
      column.eventLink,
      Sequelize.STRING,
    );
  },

  down(queryInterface) {
    return queryInterface.removeColumn(table, column.eventLink);
  }
};
