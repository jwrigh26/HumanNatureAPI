const path = require('path');
const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middleware/async');
const Category = require('../../models/Category');

// @desc      Add an item to the inventory
// @route     POST /api/v1/inventory/categories
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

// @desc      Delete a category by id
// @route     DELETE /api/v1/inventory/categories/:id
// @access    Public
const deleteCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findByIdAndDelete(req.params.id);

  if (!category) {
    return next(
      new ErrorResponse(`Category not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ result: { success: true, data: {} }, error: null });
});

// @desc      Get a list of categories
// @route     GET /api/v1/inventory/categories
// @access    Public
const getCategories = asyncHandler(async (req, res, next) => {
  const categories = await Category.find();

  // TODO: Check for errors
  res.status(200).json({
    result: { success: true, count: categories.length, data: categories },
    error: null,
  });

});

// @desc      Get a category by id
// @route     GET /api/v1/inventory/categories/:id
// @access    Public
const getCategory = asyncHandler(async (req, res, next) => {
const category = await Category.findById(req.params.id);

if (!category) {
  return next(
    new ErrorResponse(`Category not found with id of ${req.params.id}`, 404)
  );
}
res
  .status(200)
  .json({ result: { success: true, data: category }, error: null });
});

// @desc      Update a category by id
// @route     PUT /api/v1/inventory/categories/:id
// @access    Public
const updateCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!category) {
    return next(
      new ErrorResponse(`Category not found with id of ${req.params.id}`, 404)
    );
  }

  res
    .status(200)
    .json({ result: { success: true, data: category }, error: null });
});


module.exports = {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
};