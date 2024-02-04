const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Убедитесь, что правильный путь к db.js

const Category = sequelize.define('Category', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false, // Устанавливаем timestamps в false
});


module.exports = Category;
