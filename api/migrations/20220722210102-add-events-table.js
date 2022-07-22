const table = 'events';
const creatorIdColumn = 'creator_id';
const statusColumn = 'status'
const capacityColumn = 'capacity';
const minCapacityColumn = 'min_capacity';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable(
        table,
        {
          id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          [creatorIdColumn]: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          [statusColumn]: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          title: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          description: {
            type: Sequelize.TEXT,
            allowNull: false,
          },
          start_at: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          end_at: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          logo: {
            type: Sequelize.TEXT,
          },
          [capacityColumn]: {
            type: Sequelize.INTEGER,
            defaultValue: 5,
            allowNull: false,
          },
          [minCapacityColumn]: {
            type: Sequelize.INTEGER,
            defaultValue: 5,
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
        {transaction},
      );

      await Promise.all([

        queryInterface.addConstraint(
          table,
          {
            fields: [statusColumn],
            type: 'check',
            where: {
              [statusColumn]: ['PENDING', 'CANCELED'],
            },
            transaction,
          },
        ),

        queryInterface.addConstraint(
          table,
          {
            fields: [capacityColumn],
            type: 'check',
            where: {
              [capacityColumn]: {
                [Sequelize.Op.gte]: 0,
              },
            },
            transaction,
          },
        ),

        queryInterface.addConstraint(
          table,
          {
            fields: [minCapacityColumn],
            type: 'check',
            where: {
              [capacityColumn]: {
                [Sequelize.Op.gte]: 0,
              },
            },
            transaction,
          },
        ),

        queryInterface.addConstraint(
          table,
          {
            type: 'foreign key',
            name: 'user',
            fields: [creatorIdColumn],
            references: {
              table: 'users',
              field: 'id',
            },
            onDelete: 'CASCADE',
            transaction,
          },
        ),

        queryInterface.addIndex(
          table,
          [creatorIdColumn],
          {
            transaction,
          },
        ),

      ]);

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();

      throw error;
    }
  },

  down: async (queryInterface) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.dropTable(table, {transaction});

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();

      throw error;
    }
  },
};
