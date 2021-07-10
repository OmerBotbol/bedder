require('dotenv').config();
module.exports = {
  development: {
    username: 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    seederStorage: 'sequelize',
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  },
  test: {
    username: 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    seederStorage: 'sequelize',
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  },
  production: {
    username: 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    seederStorage: 'sequelize',
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  },
};
