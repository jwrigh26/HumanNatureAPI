const express = require('express');
const router = express.Router();

const paymentTransactions = require('../controllers/paymentTransactions');

router.route('/charge-credit-card').post(paymentTransactions.chargeCreditCard);

module.exports = router;
