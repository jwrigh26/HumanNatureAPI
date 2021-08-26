const express = require('express');
const router = express.Router();

const categories = require('../controllers/inventory/categories');
const items = require('../controllers/inventory/items');

// CATEGORY CRUD calls

router
  .route('/categories')
  .get(categories.getCategories)
  .post(categories.createCategory);

router
  .route('/categories/:id')
  .get(categories.getCategory)
  .put(categories.updateCategory)
  .delete(categories.deleteCategory);

// ITEM CRUD calls

router.get(items.getItems).post(items.createItem);

router
  .route('items/:id')
  .get(items.getItem)
  .put(items.updateItem)
  .delete(items.deleteItem);

module.exports = router;
