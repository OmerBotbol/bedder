"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Renters", [
      {
        id: 1,
        first_name: "Ran",
        last_name: "Danker",
        email: "noavrd@gmail.com",
        password:
          "$2b$10$vXhXhnCXBGj3Dzu1RHDO9egZzRbWl8qozUKBtNaBqmJLjX6XgYmiK",
        purpose: "sleep",
        picture: "5c823cb6-22ac-4c9c-bd1c-3be574937192",
        phone_number: "0522358339",
        created_at: "2021-06-25 10:14:44",
        updated_at: "2021-06-25 10:14:44",
      },
      {
        id: 2,
        first_name: "Ninet",
        last_name: "Tayeb",
        email: "omerbot2@gmail.com",
        password:
          "$2b$10$XrDnbp9CHntudTkgqWxLouZrasLyylxapnDEhLV9G4P1lNvJ5bUgW",
        purpose: "eat and sleep",
        picture: "2e2a8bf2-af15-45dc-adbd-787fd5d2f87a",
        phone_number: "0544782113",
        created_at: "2021-06-25 10:15:44",
        updated_at: "2021-06-25 10:15:44",
      },
      {
        id: 3,
        first_name: "Brad",
        last_name: "Pitt",
        email: "hanoch365@gmail.com",
        password:
          "$2b$10$VpdLGwu9CaXRnUsSUlcVq.K4ZwZaMjen5IOmkYYpLeZNq9KzO2uR.",
        purpose: "laugh",
        picture: "37f0b268-5f42-4cb5-9336-f8f2c4481a5d",
        phone_number: "0577896335",
        created_at: "2021-06-25 10:16:39",
        updated_at: "2021-06-25 10:16:39",
      },
      {
        id: 4,
        first_name: "Angelina",
        last_name: "Juli",
        email: "shira.meirovitz@gmail.com",
        password:
          "$2b$10$zDjXJFK50YFlLvvOkFz8aecXGHJijp3QBRySB2duLrn4IKWP/Zqpq",
        purpose: "slepp",
        picture: "4756b8c3-6c02-4640-9ff4-8eb1c47898d6",
        phone_number: "0522876445",
        created_at: "2021-06-25 10:17:41",
        updated_at: "2021-06-25 10:17:41",
      },
      {
        id: 5,
        first_name: "Mark",
        last_name: "Wallberg",
        email: "merav7650@gmail.com",
        password:
          "$2b$10$h820K5RICylnc4Db3wMPru9LSACJCZ5sQ6vEexTaL1mDspLLRrjCy",
        purpose: "eat",
        picture: "c8febf92-eda9-4b7c-b18c-1c3d24e1aa37",
        phone_number: "0544781224",
        created_at: "2021-06-25 10:18:32",
        updated_at: "2021-06-25 10:18:32",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Renters", null, {});
  },
};
