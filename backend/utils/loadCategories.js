const {faker} = require('@faker-js/faker');
const Category = require('../models/categoryModel');

async function loadCategories() {
  await Category.deleteMany({});
  const categories = Array.from({ length: 100 }, () => ({
    name: faker.commerce.department(),
  }));

  await Category.insertMany(categories);
  console.log('Loaded categories');

}

module.exports = loadCategories;