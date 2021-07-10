'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Owners', [
      {
        id: 1,
        first_name: 'Noa',
        last_name: 'Shalom',
        email: 'noavrd@gmail.com',
        password:
          '$2b$10$z7qShYDJK0PQJnBvsOlFFe7UkyLluADL7UchF3I9b3df7L1vrGCO6',
        picture: 'c44487ee-4265-4cd1-bee1-3707a6223c29',
        phone_number: '+972522358339',
        created_at: '2021-06-25 10:03:01',
        updated_at: '2021-06-25 10:03:01',
      },
      {
        id: 2,
        first_name: 'omer',
        last_name: 'botbol',
        email: 'omerbot2@gmail.com',
        password:
          '$2b$10$zEw2VeJN4PT.KREYkhmcpeQxoxVTEgnWZa.35E8jMEKnFXtCX325u',
        picture: '441beda9-a480-4779-b5b3-f5199663ccb0',
        phone_number: '0544789225',
        created_at: '2021-06-25 10:04:28',
        updated_at: '2021-06-25 10:04:28',
      },
      {
        id: 3,
        first_name: 'hanoch',
        last_name: 'shalom',
        email: 'hanoch365@gmail.com',
        password:
          '$2b$10$hdxPWqlrcgXj7MtGF6vB6eOvRCohiSQqt7B..QCW39r2qxAqk8Elu',
        picture: '0f32e63e-ed2d-4fcb-88fc-759caa1c473c',
        phone_number: '0522358412',
        created_at: '2021-06-25 10:05:09',
        updated_at: '2021-06-25 10:05:09',
      },
      {
        id: 4,
        first_name: 'shira',
        last_name: 'meirovitz',
        email: 'shira.meirovitz@gmail.com',
        password:
          '$2b$10$jgq7kzEJr42zhe15f47QH.1z.jM79NCAN0OnOqiExCCqq/w2kf7M6',
        picture: '039d4de5-f378-42bc-af51-c025d78bcc26',
        phone_number: '0544826997',
        created_at: '2021-06-25 10:06:21',
        updated_at: '2021-06-25 10:06:21',
      },
      {
        id: 5,
        first_name: 'lee',
        last_name: 'tali',
        email: 'merav7650@gmail.com',
        password:
          '$2b$10$z/uJ3iCcsVJDI/FbHkqRIu3THRQmDPn./gslybcVjOGHjSWmclS2K',
        picture: '3b8ea686-e665-4a7b-b932-655c3d23a775',
        phone_number: '0544782116',
        created_at: '2021-06-25 10:09:01',
        updated_at: '2021-06-25 10:09:01',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Owners', null, {});
  },
};
