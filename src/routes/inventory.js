const express = require('express');
const router = express.Router();

const inventory = require('../controllers/inventory');

// CATEGORY CRUD calls

router.route('/category').post(inventory.createCategory)

router.route('/category/:id').get(inventory.getCategory);

router.route('/categories').get(inventory.getCategories);


// ITEM CRUD calls

router.route('/item').post(inventory.createItem);

module.exports = router;
