const fs = require('fs');
const sequelize = require('./config/db'); // Импортируйте настройки подключения к базе данных
const Book = require('./models/Book');
const Author = require('./models/Author');
const Category= require('./models/Category')
const moment = require('moment');

// Прочтите JSON файл
const rawData = fs.readFileSync('books.json');
const booksData = JSON.parse(rawData);

// Функция для импорта данных
async function importData() {
  try {
    // Синхронизируйте модели с базой данных
    await sequelize.sync();

    // Проход по каждой книге в массиве
    for (const bookData of booksData) {
      const authors = bookData.authors;
      const categories = bookData.categories; // Получите категории книги

      // Преобразуйте publishedDate из объекта в строку
      if (bookData.publishedDate && bookData.publishedDate["$date"]) {
          bookData.publishedDate = moment(bookData.publishedDate["$date"]).format('YYYY-MM-DD HH:mm:ss');
      }
      
      delete bookData.authors;
      delete bookData.categories;

      // Создаем запись книги
      const book = await Book.create(bookData);



      // Создаем или находим авторов и устанавливаем их для книги
      for (const authorName of authors) {
        const [author] = await Author.findOr({
          where: { name: authorName },
        });
        await book.addAuthor(author);
      }

      // Создаем или находим категории и устанавливаем их для книги
      for (const categoryName of categories) {
        const [category] = await Category.findOrCreate({
          where: { name: categoryName },
        });
        await book.addCategory(category);
      }
      
      console.log(`Книга добавлена: ${book.title}`);
    }

    console.log('Импорт данных завершен.');
  } catch (error) {
    console.error('Ошибка при импорте данных:', error);
  } finally {
    // Закройте подключение к базе данных после импорта данных
    await sequelize.close();
  }
}

// Вызовите функцию для импорта данных
importData();
