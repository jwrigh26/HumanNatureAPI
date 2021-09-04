var ApiContracts = require('authorizenet').APIContracts;
var ApiControllers = require('authorizenet').APIControllers;

const { env } = require('../../constants');
const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middleware/async');

function getRandomAmount() {
  return (Math.random() * 100 + 1).toFixed(2);
}

function merchantAuthenticationType() {
  const mType = new ApiContracts.MerchantAuthenticationType();
  mType.setName(env.authLoginId);
  mType.setTransactionKey(env.authTransactionKey);
  return mType;
}

function transactionRequestType() {
  const rType = new ApiContracts.TransactionRequestType();
  rType.setTransactionType(
    ApiContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION
  );
  rType.setAmount(getRandomAmount());
  return rType;
}

function paymentSettings() {
  const buttonOptions = new ApiContracts.SettingType();
  buttonOptions.setSettingName('hostedPaymentButtonOptions');
  buttonOptions.setSettingValue('{"text": "Pay"}');

  const orderOptions = new ApiContracts.SettingType();
  orderOptions.setSettingName('hostedPaymentOrderOptions');
  orderOptions.setSettingValue('{"show": false}');

  const paymentOptions = new ApiContracts.SettingType();
  paymentOptions.setSettingName('hostedPaymentPaymentOptions');
  paymentOptions.setSettingValue(
    '{"cardCodeRequired": true, "showBankAccount": false}'
  );

  const shipping = new ApiContracts.SettingType();
  shipping.setSettingName('hostedPaymentShippingAddressOptions');
  shipping.setSettingValue('{"show": true}');

  const billing = new ApiContracts.SettingType();
  billing.setSettingName('hostedPaymentBillingAddressOptions');
  billing.setSettingValue('{"show": true}');

  const customer = new ApiContracts.SettingType();
  customer.setSettingName('hostedPaymentCustomerOptions');
  customer.setSettingValue('{"showEmail": false}');

  const styles = new ApiContracts.SettingType();
  styles.setSettingName('hostedPaymentStyleOptions');
  styles.setSettingValue('{"bgColor": "#9E9E9E"}');

  const iFrameCommunicator = new ApiContracts.SettingType();
  iFrameCommunicator.setSettingName('hostedPaymentIFrameCommunicatorUrl');
  iFrameCommunicator.setSettingValue(
    '{"url": "https://localhost:8080//iFrameCommunicator.html"}'
  );

  const paymentSettings = new ApiContracts.ArrayOfSetting();
  paymentSettings.setSetting([
    buttonOptions,
    orderOptions,
    paymentOptions,
    shipping,
    billing,
    customer,
  ]);
  return paymentSettings;
}

const acceptPaymentPageWorker = () => {
  return new Promise((resolve, reject) => {
    const getRequest = new ApiContracts.GetHostedPaymentPageRequest();
    getRequest.setMerchantAuthentication(merchantAuthenticationType());
    getRequest.setTransactionRequest(transactionRequestType());
    getRequest.setHostedPaymentSettings(paymentSettings());

    const ctrl = new ApiControllers.GetHostedPaymentPageController(
      getRequest.getJSON()
    );

    ctrl.execute(function () {
      const apiResponse = ctrl.getResponse();
      const response = new ApiContracts.GetHostedPaymentPageResponse(
        apiResponse
      );

      if (response === null) {
        return reject(
          new ErrorResponse('Authorize.Net null response received.', 400)
        );
      }

      if (
        response.getMessages().getResultCode() !==
        ApiContracts.MessageTypeEnum.OK
      ) {
        const message = response.getMessages().getMessage()[0].getText();
        const statusCode = response.getMessages().getMessage()[0].getCode();
        console.log('Error: StatusCode: ', statusCode);
        return reject(new ErrorResponse(message, 401));
      }

      if (
        response.getMessages().getResultCode() ===
        ApiContracts.MessageTypeEnum.OK
      ) {
        resolve({ token: response.getToken(), request: getRequest.getJSON() });
      }
    });
  });
};

// @desc Call to get a form token from Authorize.Net
// @route /api/v1/merchant/accept-payment-page
// @access Public
const getAcceptPaymentPage = asyncHandler(async (req, res, next) => {
  const { token, request } = await acceptPaymentPageWorker();
  res
    .status(200)
    .json({ result: { success: true, token, request }, error: null });
});

module.exports = getAcceptPaymentPage;
