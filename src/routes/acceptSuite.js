const express = require('express');
const router = express.Router();

const getAcceptPaymentPage = require('../controllers/acceptSuite/getAcceptPaymentPage');
const createAcceptPaymentTransaction = require('../controllers/acceptSuite/createAcceptPaymentTransaction');

router.route('/payment-page').get(getAcceptPaymentPage);
router.route('/create-accept-payment-transaction').post(createAcceptPaymentTransaction);

module.exports = router;