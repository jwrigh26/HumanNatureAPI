const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  aliasName: String,
  barcode: String,
  categoryId: String,
  color: String,
  cost: Number,
  createdOn: Date,
  description: String,
  id: String,
  inventory: Number,
  merchantId: String,
  modifiedOn: Date,
  needsLowInventoryAlert: Boolean,
  quantity: Number,
  price: Number,
  salesTax: Boolean,
  skuNumber: String,
  supplierId: String,
  storeQty: Number,
  taxPercentage: Number,
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
