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
  const setting1 = new ApiContracts.SettingType();
  setting1.setSettingName('hostedPaymentButtonOptions');
  setting1.setSettingValue('{"text": "Pay"}');

  const setting2 = new ApiContracts.SettingType();
  setting2.setSettingName('hostedPaymentOrderOptions');
  setting2.setSettingValue('{"show": false}');

  const paymentSettings = new ApiContracts.ArrayOfSetting();
  paymentSettings.setSetting([setting1, setting2]);
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
