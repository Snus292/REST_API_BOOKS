const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Убедитесь, что правильный путь к db.js
const Category = require("../models/Category")
const Author= require("../models/Author")

const Book = sequelize.define('Book', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isbn: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pageCount: {
    type: DataTypes.INTEGER,
  },
  publishedDate: {
    type: DataTypes.STRING,
  },
  thumbnailUrl: {
    type: DataTypes.STRING,
  },
  shortDescription: {
    type: DataTypes.TEXT,
  },
  longDescription: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: false, // Устанавливаем timestamps в false
});

module.exports = Book;

// Ваш импорт и определение моделей Book и Category

Book.belongsToMany(Category, { through: 'BookCategories' });
Category.belongsToMany(Book, { through: 'BookCategories' });
Book.belongsToMany(Author, { through: 'BookAuthors' });
