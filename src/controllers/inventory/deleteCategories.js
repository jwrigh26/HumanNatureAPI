const Category = require('../../models/Category');

// @desc      Update a category by id
// @route     PUT /api/v1/inventory/categories/:id
// @access    Public
async function deleteCategory(req, res, next) {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(400).json({ success: false, error: err });
    }
    
    res
      .status(200)
      .json({ result: { success: true, data: {} }, error: null });
  } catch (err) {
    console.log('Error');
    console.log(err);
    res.status(400).json({ success: false, error: err });
  }
}

module.exports = {
  deleteCategory
};