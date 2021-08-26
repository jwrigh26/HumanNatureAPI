const express = require('express');
const router = express.Router();

const shop = require('../controllers/shop');

router.route('/authorize').get(shop.authorize);

module.exports = router;