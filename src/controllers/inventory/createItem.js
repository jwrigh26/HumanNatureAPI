// @desc      Add an item to the inventory
// @route     POST /api/v1/inventory/add
// @access    Public
async function createItem(req, res, next) {
  res.status(200).json({ result: { success: true }, error: null });
}

module.exports = createItem;