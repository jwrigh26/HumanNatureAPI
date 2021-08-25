const path = require('path');
const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middleware/async');
const Category = require('../../models/Category');

// @desc      Add an item to the inventory
// @route     POST /api/v1/inventory/category
// @access    Public
const createCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.create(req.body);

  if (!category) {
    return next(
      new ErrorResponse(`Not able to create category: ${category}`, 400)
    );
  }

  res
    .status(201)
    .json({ result: { success: true, data: category }, error: null });
});

module.exports = {
  createCategory,
};


