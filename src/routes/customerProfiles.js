const express = require('express');
const router = express.Router();

const customerProfiles = require('../controllers/customerProfiles');

router
  .route('/create-customer-payment-profile')
  .post(customerProfiles.createCustomerPaymentProfile);

module.exports = router;
