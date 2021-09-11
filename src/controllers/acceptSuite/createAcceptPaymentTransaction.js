const ApiContracts = require('authorizenet').APIContracts;
const ApiControllers = require('authorizenet').APIControllers;

const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middleware/async');

const merchantAuthenticationType = require('../../authorizenetHelpers/merchantAuthentication');

// TODO: Setup Security
function transactionRequestType(body) {
  const {
    amount: amountValue,
    billTo: billToInfo,
    duty: dutyValue,
    lineItems: lineItemList,
    nonce,
    order,
    shipping: shippingInfo,
    shipTo: shipToInfo,
    tax: taxValue,
  } = body;

  function paymentType() {
    const opaque = new ApiContracts.OpaqueDataType();
    opaque.setDataDescriptor(nonce.description);
    opaque.setDataValue(nonce.value);

    const payment = new ApiContracts.PaymentType();
    payment.setOpaqueData(opaque);
    return payment;
  }

  function orderDetails() {
    const orderDetails = new ApiContracts.OrderType();
    orderDetails.setInvoiceNumber(order.invoice);
    orderDetails.setDescription(order.description);
  }

  function tax() {
    const tax = new ApiContracts.ExtendedAmountType();
    tax.setAmount(taxValue);
    // TODO: Add these values
    // tax.setName('level2 tax name example');
    // tax.setDescription('level2 tax example');
    return tax;
  }

  function duty() {
    const duty = new ApiContracts.ExtendedAmountType();
    duty.setAmount(dutyValue);
    // TODO: Add these values
    // duty.setName('duty name example');
    // duty.setDescription('duty description example');
    return duty;
  }

  function shipping() {
    const shipping = new ApiContracts.ExtendedAmountType();
    shipping.setAmount(shippingInfo.amount);
    shipping.setName(shippingInfo.name);
    shipping.setDescription(shippingInfo.description);
    return shipping;
  }

  function billTo() {
    const info = new ApiContracts.CustomerAddressType();
    info.setFirstName(billToInfo.firstName);
    info.setLastName(billToInfo.lastName);
    info.setCompany(billToInfo.company);
    info.setAddress(billToInfo.address);
    info.setCity(billToInfo.city);
    info.setState(billToInfo.state);
    info.setZip(billToInfo.zip);
    info.setCountry(billToInfo.country);
    return info;
  }

  function shipTo() {
    const info = new ApiContracts.CustomerAddressType();
    info.setFirstName(shipToInfo.firstName);
    info.setLastName(shipToInfo.lastName);
    info.setCompany(shipToInfo.company);
    info.setAddress(shipToInfo.address);
    info.setCity(shipToInfo.city);
    info.setState(shipToInfo.state);
    info.setZip(shipToInfo.zip);
    info.setCountry(shipToInfo.country);
    return info;
  }

  function lineItems() {
    const list = lineItemList.map(
      ({ itemId, name, description, quantity, unitPrice }) => {
        const item = new ApiContracts.LineItemType();
        item.setItemId(itemId);
        item.setName(name);
        item.setDescription(description);
        item.setQuantity(quantity);
        item.setUnitPrice(unitPrice);
        return item;
      }
    );

    const items = new ApiContracts.ArrayOfLineItem();
    items.setLineItem(list);
    return items;
  }

  // TODO: Not currently using.
  function userFields() {
    const userField_a = new ApiContracts.UserField();
    userField_a.setName('A');
    userField_a.setValue('Aval');

    const userField_b = new ApiContracts.UserField();
    userField_b.setName('B');
    userField_b.setValue('Bval');

    const userFieldList = [];
    userFieldList.push(userField_a);
    userFieldList.push(userField_b);

    const userFields = new ApiContracts.TransactionRequestType.UserFields();
    userFields.setUserField(userFieldList);

    return userFields;
  }

  function transactionSettings() {
    const transactionSetting1 = new ApiContracts.SettingType();
    transactionSetting1.setSettingName('duplicateWindow');
    transactionSetting1.setSettingValue('120');

    const transactionSetting2 = new ApiContracts.SettingType();
    transactionSetting2.setSettingName('recurringBilling');
    transactionSetting2.setSettingValue('false');

    const transactionSetting3 = new ApiContracts.SettingType();
    transactionSetting3.setSettingName('headerEmailReceipt');
    transactionSetting3.setSettingValue('Human+Nature Shop');

    const transactionSetting4 = new ApiContracts.SettingType();
    transactionSetting4.setSettingName('footerEmailReceipt');
    transactionSetting4.setSettingValue('Thank you for shopping with us!');

    const transactionSetting5 = new ApiContracts.SettingType();
    transactionSetting5.setSettingName('emailCustomer');
    transactionSetting5.setSettingValue('false');

    const transactionSettings = new ApiContracts.ArrayOfSetting();
    transactionSettings.setSetting([
      transactionSetting1,
      transactionSetting2,
      transactionSetting3,
      transactionSetting4,
      transactionSetting5,
    ]);

    return transactionSettings;
  }

  const transaction = new ApiContracts.TransactionRequestType();
  transaction.setTransactionType(
    ApiContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION
  );
  transaction.setPayment(paymentType());
  transaction.setAmount(amountValue);
  transaction.setLineItems(lineItems());
  transaction.setOrder(orderDetails());
  transaction.setTax(tax());
  transaction.setDuty(duty());
  transaction.setShipping(shipping());
  transaction.setBillTo(billTo());
  transaction.setShipTo(shipTo());
  transaction.setTransactionSettings(transactionSettings());
  // transaction.setUserFields(userFields());
  return transaction;
}

const worker = (body) => {
  return new Promise((resolve, reject) => {
    const createRequest = new ApiContracts.CreateTransactionRequest();
    createRequest.setMerchantAuthentication(merchantAuthenticationType());
    createRequest.setTransactionRequest(transactionRequestType(body));

    //pretty print request
    // console.log(JSON.stringify(createRequest.getJSON(), null, 2));

    const ctrl = new ApiControllers.CreateTransactionController(
      createRequest.getJSON()
    );

    ctrl.execute(function () {
      const apiResponse = ctrl.getResponse();
      const response = new ApiContracts.CreateTransactionResponse(apiResponse);

      if (response === null) {
        return reject(
          new ErrorResponse('Authorize.Net null response received.', 400)
        );
      }

      if (
        response?.getMessages()?.getResultCode() !==
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
        resolve({ request: response.getJSON() });
      }
    });
  });
};

// @desc Call to get a form token from Authorize.Net
// @route /api/v1/merchant/accept-payment-page
// @access Public
const createAcceptPaymentTransaction = asyncHandler(async (req, res, next) => {
  const { request } = await worker(req.body);
  res.status(200).json({
    result: { success: true, request },
    error: null,
  });
});

module.exports = createAcceptPaymentTransaction;
