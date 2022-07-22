const TABLE_NAME = 'features';
const featureName = '';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(TABLE_NAME, [
      {
        name: featureName,
        status: 'DISABLED',
        description: '',
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete(TABLE_NAME, {
      name: featureName,
    });
  },
};
