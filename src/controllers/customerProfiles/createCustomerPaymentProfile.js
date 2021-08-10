// @desc      Create a customer payment profile
// @route     POST /api/v1/customer/profiles/create-customer-payment-profile
// @access    Public
async function createCustomerPaymentProfile(req, res, next) {
  res
    .status(200)
    .json({ result: { success: true, name: 'Herp' }, error: null });
}

module.exports = createCustomerPaymentProfile;
