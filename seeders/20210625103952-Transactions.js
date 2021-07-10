'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Transactions', [
      {
        id: 1,
        asset_id: 4,
        owner_id: 2,
        renter_id: 1,
        started_at: '2021-07-14 00:00:00',
        ended_at: '2021-07-15 00:00:00',
        comments: 'nooo',
        owner_approvement: null,
        booked: null,
        created_at: '2021-06-25 10:28:20',
        updated_at: '2021-06-25 10:28:20',
      },
      {
        id: 2,
        asset_id: 6,
        owner_id: 4,
        renter_id: 1,
        started_at: '2021-07-21 00:00:00',
        ended_at: '2021-07-22 00:00:00',
        comments: 'yess',
        owner_approvement: null,
        booked: null,
        created_at: '2021-06-25 10:28:48',
        updated_at: '2021-06-25 10:28:48',
      },
      {
        id: 3,
        asset_id: 5,
        owner_id: 4,
        renter_id: 2,
        started_at: '2021-07-29 00:00:00',
        ended_at: '2021-07-30 00:00:00',
        comments: 'funfunfun',
        owner_approvement: null,
        booked: null,
        created_at: '2021-06-25 10:30:16',
        updated_at: '2021-06-25 10:30:16',
      },
      {
        id: 4,
        asset_id: 2,
        owner_id: 1,
        renter_id: 4,
        started_at: '2021-07-09 00:00:00',
        ended_at: '2021-07-10 00:00:00',
        comments: 'thanks',
        owner_approvement: null,
        booked: null,
        created_at: '2021-06-25 10:31:18',
        updated_at: '2021-06-25 10:31:18',
      },
      {
        id: 5,
        asset_id: 3,
        owner_id: 2,
        renter_id: 4,
        started_at: '2021-07-15 00:00:00',
        ended_at: '2021-07-16 00:00:00',
        comments: 'nnnnn',
        owner_approvement: null,
        booked: null,
        created_at: '2021-06-25 10:31:46',
        updated_at: '2021-06-25 10:31:46',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Transactions', null, {});
  },
};
