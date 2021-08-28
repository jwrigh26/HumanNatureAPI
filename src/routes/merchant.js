const express = require('express');
const router = express.Router();

const getAcceptPaymentPage = require('../controllers/merchant/getAcceptPaymentPage');

router.route('/accept-payment-page').get(getAcceptPaymentPage);

module.exports = router;