// @desc      Get a list of categories
// @route     POST /api/v1/inventory/category/:id
// @access    Public
async function getCategories(req, res, next) {
  res.status(200).json({ result: { success: true }, error: null });
}

module.exports = getCategories;