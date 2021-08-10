const express = require('express');
const router = express.Router();

const paymentTransactions = require('../controllers/paymentTransactions');

router.use('/charge-credit-card', paymentTransactions.chargeCreditCard);

module.exports = router;