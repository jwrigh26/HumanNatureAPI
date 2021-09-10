const ApiContracts = require('authorizenet').APIContracts;
const { env } = require('../constants');

function merchantAuthenticationType() {
  const merchant = new ApiContracts.MerchantAuthenticationType();
  merchant.setName(env.authLoginId);
  merchant.setTransactionKey(env.authTransactionKey);
  return merchant;
}

module.exports = merchantAuthenticationType;