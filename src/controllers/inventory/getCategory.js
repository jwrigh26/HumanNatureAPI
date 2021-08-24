// @desc      Get a category by id
// @route     POST /api/v1/inventory/category/:id
// @access    Public
async function getCategory(req, res, next) {
  res.status(200).json({ result: { success: true }, error: null });
}

module.exports = getCategory;