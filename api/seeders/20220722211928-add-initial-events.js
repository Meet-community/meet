const table = 'events';

function getDate() {
  const startAt = new Date();
  const offsetDay = Math.floor(Math.random() * (4));
  const offsetHour = Math.floor(Math.random() * (20 - 1)) + 1;

  startAt.setDate(startAt.getDate() + offsetDay);
  startAt.setHours(startAt.getHours() + offsetHour);

  const endAt = new Date(startAt);

  endAt.setHours(endAt.getHours() + 1);

  return { start_at: startAt, end_at: endAt };
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      let [user1, user2] = await queryInterface.select(
        null,
        'users',
        { limit: 2, raw: true, transaction },
        ['id']
      );

      if (!user1 || !user2) {
        await queryInterface.bulkInsert(
          'users',
          [
            {first_name: 'Test', last_name: 'User1', email: 'test1@gmail.com', password: '1111', status: 'CONFIRMED'},
            {first_name: 'Test', last_name: 'User2', email: 'test2@gmail.com', password: '1111', status: 'CONFIRMED'},
          ],
          {transaction}
        );

        [user1, user2] = await queryInterface.select(
          null,
          'users',
          { limit: 2, raw: true, transaction },
          ['id']
        );
      }

      const res = await queryInterface.bulkInsert(
        table,
        [
          {creator_id: user1.id, title: 'Coffe break', ...getDate(), capacity: 2, min_capacity: 2, status: 'PENDING', logo: 'https://image.shutterstock.com/image-photo/female-hand-paper-cup-coffee-600w-666304648.jpg', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum'},
          {creator_id: user2.id, title: 'Walking in the park', ...getDate(), capacity: 5, min_capacity: 2, status: 'PENDING', logo: 'https://happydays365.org/wp-content/uploads/2020/03/Take-A-Walk-In-The-Park-Day-1280x853.jpg', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum'},
          {creator_id: user1.id, title: 'Do yoga', ...getDate(), capacity: 10, min_capacity: 2, status: 'PENDING', logo: 'https://cdn0.pokupon.ua/uploaded/merchant_page_images/374160/data/large1200/155540324_118080843596915_1701952190051320385_n.jpg', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum'},
          {creator_id: user2.id, title: 'Coffe break', ...getDate(), capacity: 3, min_capacity: 2, status: 'PENDING', logo: 'https://image.shutterstock.com/image-photo/female-hand-paper-cup-coffee-600w-666304648.jpg', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum'},
        ],
        {transaction}
      );

      await transaction.commit();

      return res;
    } catch (error) {
      await transaction.rollback();

      throw error;
    }
  },

  down: async (queryInterface) => {
    return Promise.resolve();
  },
};
