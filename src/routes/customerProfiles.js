const express = require('express');
const router = express.Router();

const customerProfiles = require('../controllers/customerProfiles');

router.use(
  '/create-customer-payment-profile',
  customerProfiles.createCustomerPaymentProfile
);

module.exports = router;
