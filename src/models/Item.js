const mongoose = require('mongoose');
const { Channel, Status } = require('../constants');

const ItemSchema = new mongoose.Schema({
  aliasName: String,
  barcode: String,
  categoryId: String,
  color: String,
  cost: Number,
  createdOn: Date,
  description: String,
  displayStatus: Boolean,
  id: String,
  inventory: Number,
  merchantId: String,
  modifiedOn: Date,
  needsLowInventoryAlert: Boolean,
  onlineStoreDisplayStatus: Boolean,
  quantity: Number,
  price: Number,
  positionNumber: Number,
  reorderQty: Number,
  salesTax: Boolean,
  skuNumber: String,
  supplierId: String,
  storeQty: Number,
  taxPercentage: Number,
  bundles: [
    {
      type: String,
    },
  ],
  discountdisplayChannelSettings: [
    {
      channel: {
        type: String,
        enum: Object.values(Channel),
      },
      status: {
        type: String,
        enum: Object.values(Status),
      },
    },
  ],
  discountSettings: [
    {
      type: String,
    },
  ],
  name: {
    type: String,
    required: [true, 'Please add a name'],
    unique: true,
    trim: true,
    maxlength: [50, 'Name can not be more than 100 characters'],
  },
  tags: [
    {
      type: String,
    },
  ],
  taxSettings: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model('Item', ItemSchema);
