const path = require('path');
const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middleware/async');
const Item = require('../../models/Item');

// @desc      Add an item to the inventory
// @route     POST /api/v1/inventory/items
// @access    Public
async function createItem(req, res, next) {
  const item = await Item.create(req.body);

  if (!item) {
    return next(new ErrorResponse(`Not able to create item: ${item}`, 400));
  }
  res.status(200).json({ result: { success: true, data: item }, error: null });
}

// @desc      Delete an item by id
// @route     DELETE /api/v1/inventory/items/:id
// @access    Public
const deleteItem = asyncHandler(async (req, res, next) => {
  const item = await Item.findByIdAndDelete(req.params.id);

  if (!item) {
    return next(
      new ErrorResponse(`Item not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ result: { success: true, data: {} }, error: null });
});

// @desc      GET all Items from the inventory
// @route     GET /api/v1/inventory/items
// @access    Public
async function getItems(req, res, next) {
  const items = await Item.find();

  // TODO: Check for errors
  res.status(200).json({
    result: { success: true, count: items.length, data: items },
    error: null,
  });
}

// @desc      GET an Item from the inventory
// @route     GET /api/v1/inventory/items/:id
// @access    Public
const getItem = asyncHandler(async (req, res, next) => {
  const item = await Category.findById(req.params.id);

  if (!item) {
    return next(
      new ErrorResponse(`Item not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ result: { success: true, data: item }, error: null });
});

// @desc      Update an Item by id
// @route     PUT /api/v1/inventory/items/:id
// @access    Public
const updateItem = asyncHandler(async (req, res, next) => {
  const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!item) {
    return next(
      new ErrorResponse(`Item not found with id of ${req.params.id}`, 404)
    );
  }

  res
    .status(200)
    .json({ result: { success: true, data: item }, error: null });
});

module.exports = {
  createItem,
  deleteItem,
  getItems,
  getItem,
  updateItem,
};
