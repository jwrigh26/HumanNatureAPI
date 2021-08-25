// @desc      Add an item to the inventory
// @route     POST /api/v1/inventory/items
// @access    Public
async function createItem(req, res, next) {
  res.status(200).json({ result: { success: true }, error: null });
}

// @desc      Add an item to the inventory
// @route     POST /api/v1/inventory/items/batch
// @access    Public
async function createItems(req, res, next) {
  res.status(200).json({ result: { success: true }, error: null });
}

module.exports = {
  createItem,
  createItems
};