const table = 'user_events';
const statusColumn = 'status';
const userIdColumn = 'user_id';
const eventIdColumn = 'event_id';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      const res = await queryInterface.createTable(
        table,
        {
          id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          [userIdColumn]: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          [eventIdColumn]: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          [statusColumn]: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          created_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('now'),
            allowNull: false,
          },
          updated_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('now'),
            allowNull: false,
          },
        },
        { transaction },
      );

      await Promise.all([

        queryInterface.addConstraint(
          table,
          {
            fields: [statusColumn],
            type: 'check',
            where: {
              [statusColumn]: ['CANCELED', 'PENDING', 'VIOLATED'],
            },
            transaction,
          },
        ),

        queryInterface.addConstraint(
          table,
          {
            fields: [userIdColumn],
            type: 'foreign key',
            references: {
              table: 'users',
              field: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            transaction,
          },
        ),

        queryInterface.addConstraint(
          table,
          {
            fields: [eventIdColumn],
            type: 'foreign key',
            references: {
              table: 'events',
              field: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            transaction,
          },
        ),

        queryInterface.addIndex(
          table,
          [userIdColumn],
          {
            transaction,
          },
        ),

        queryInterface.addIndex(
          table,
          [eventIdColumn],
          {
            transaction,
          },
        ),
      ]);

      await transaction.commit();

      return res;
    } catch (error) {
      await transaction.rollback();

      throw error;
    }
  },

  down: async (queryInterface) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.dropTable(table, { transaction });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();

      throw error;
    }
  },
};
