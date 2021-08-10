// @desc      Charge credit card
// @route     POST /api/v1/payment/transactions/charge-credit-card
// @access    Public
async function chargeCreditCard(req, res, next) {
  res.status(200).json({ result: { success: true }, error: null });
}

module.exports = chargeCreditCard;
