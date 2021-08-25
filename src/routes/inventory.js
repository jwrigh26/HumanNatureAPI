const express = require('express');
const router = express.Router();

const inventory = require('../controllers/inventory');

// CATEGORY CRUD calls

// Get a category (GET)
// Update a category (PUT)
router
  .route('/categories/:id')
  .get(inventory.getCategory)
  .put(inventory.updateCategory)
  .delete(inventory.deleteCategory);

// Get all categories (GET)
// Create a category (POST)
router
  .route('/categories')
  .get(inventory.getCategories)
  .post(inventory.createCategory);


// ITEM CRUD calls

// Get an item f(GET)
router.route('items/:id').get(inventory.getItem);

// Create an Item (POST)
router.route('/items').post(inventory.createItem);

// Create multiple Items (POST)
router.route('/items/batch').post(inventory.createItems);


// SPECIAL (S RANK)

// Get all items for a category  (GET)
router.route('/categories/:categoryId/items').get(inventory.getItems);

module.exports = router;
