const Category = require('../../models/Category');

// @desc      Update a category by id
// @route     PUT /api/v1/inventory/categories/:id
// @access    Public
async function updateCategory(req, res, next) {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!category) {
      return res.status(400).json({ success: false, error: err });
    }
    
    res
      .status(200)
      .json({ result: { success: true, data: category }, error: null });
  } catch (err) {
    console.log('Error');
    console.log(err);
    res.status(400).json({ success: false, error: err });
  }
}

module.exports = {
  updateCategory
};
