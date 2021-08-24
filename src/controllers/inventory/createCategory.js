const Category = require('../../models/Category');

// @desc      Add an item to the inventory
// @route     POST /api/v1/inventory/category
// @access    Public
async function createCategory(req, res, next) {
  try {
    const category = await Category.create(req.body);
    res
      .status(201)
      .json({ result: { success: true, data: category }, error: null });
  } catch (err) {
    console.log('Error');
    console.log(err);
    res.status(400).json({ success: false, error: err });
  }
}

module.exports = createCategory;
