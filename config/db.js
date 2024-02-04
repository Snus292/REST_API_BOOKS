const { Sequelize } = require('sequelize');

// Создайте подключение к базе данных
const sequelize = new Sequelize('books', 'books', 'books', {
  host: 'localhost',
  dialect: 'mysql',
  timestamps: false,
  define: {
    freezeTableName: true, // чтобы не добавлять множественное число к именам таблиц
  },
});

module.exports = sequelize;

