const { Sequelize } = require('sequelize');

// Create Sequelize instance with MySQL
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost', // Change to your MySQL host
  username: 'root',  // Change to your MySQL username
  password: '',      // Change to your MySQL password
  database: 'soa', // Change to your database name
  logging: false,
});

module.exports = sequelize;