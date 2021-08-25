// @desc      Get a item by id
// @route     GET /api/v1/inventory/item/:id
// @access    Public
async function getItem(req, res, next) {
  res.status(200).json({ result: { success: true }, error: null });
}


// @desc      Get a list items for a category
// @route     GET /api/v1/inventory/category/:categoryId/items
// @access    Public
async function getItems(req, res, next) {
  res.status(200).json({ result: { success: true }, error: null });
}

module.exports = {
  getItem,
  getItems,
};