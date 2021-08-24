const mongoose = require('mongoose');
const { Channel, Status } = require('../constants');

const CategorySchema = new mongoose.Schema({
  aliasName: String,
  createdOn: Date,
  description: String,
  displayStatus: Boolean,
  id: String,
  merchantId: String,
  modifiedOn: Date,
  onlineStoreDisplayStatus: Boolean,
  positionNumber: Number,
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
  discountInfo: [
    {
      type: String,
    },
  ],
  giftCardInfo: [
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
  productInfo: [
    {
      type: String,
    },
  ],
  tags: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model('Category', CategorySchema);
