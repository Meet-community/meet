const table = 'users';
const emailColumn = 'email';
const passwordColumn = 'password';
const tokenColumn = 'token';
const statusColumn = 'status';
const columns = [
  emailColumn,
  passwordColumn,
  tokenColumn,
  statusColumn,
]
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await Promise.all([
        queryInterface.addColumn(
          table,
          emailColumn,
          Sequelize.STRING,
          {
            allowNull: false,
            unique: true,
          },
          {transaction},
        ),

        queryInterface.addColumn(
          table,
          passwordColumn,
          Sequelize.STRING,
          {
            allowNull: false,
          },
          {transaction},
        ),

        queryInterface.addColumn(
          table,
          tokenColumn,
          Sequelize.STRING,
          {},
          {transaction},
        ),

        queryInterface.addColumn(
          table,
          statusColumn,
          Sequelize.STRING,
          {
            allowNull: false,
            defaultValue: 'PENDING',
          },
          {transaction}
        ),
      ])

      await Promise.all([
        queryInterface.addConstraint(
          table,
          {
            fields: [statusColumn],
            type: 'check',
            where: {
              [statusColumn]: ['PENDING', 'CONFIRMED'],
            },
            transaction,
          },
        ),

        queryInterface.addIndex(
          table,
          [emailColumn],
          {
            transaction,
          },
        ),
      ])

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();

      throw error;
    }
  },

  down: async (queryInterface) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await Promise.all(
        columns.map(column => queryInterface.removeColumn(table, column, {transaction}))
      )

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();

      throw error;
    }
  },
};
