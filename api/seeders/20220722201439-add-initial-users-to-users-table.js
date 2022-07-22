const table = 'users';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      const res = await queryInterface.bulkInsert(
        table,
        [
          {first_name: 'Ihor', last_name: 'Karpyn'},
          {first_name: 'Serhii', last_name: 'Kirichenko'},
        ],
        {transaction}
      )

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
      await queryInterface.bulkDelete(
        table,
        { last_name: ['Kirichenko', 'Karpyn']},
        {transaction}
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();

      throw error;
    }
  },
};
