const Category = require('../../models/Category');

// @desc      Get a list of categories
// @route     GET /api/v1/inventory/categories
// @access    Public
async function getCategories(req, res, next) {
  try {
    const categories = await Category.find();
    if (!categories) {
      console.log('No Categories found.');
      console.log(err);
      return res.status(400).json({ success: false, error: err });
    }
    res
      .status(200)
      .json({
        result: { success: true, count: categories.length, data: categories },
        error: null,
      });
  } catch (err) {
    console.log('Error');
    console.log(err);
    res.status(400).json({ success: false, error: err });
  }
}

// @desc      Get a category by id
// @route     GET /api/v1/inventory/categories/:id
// @access    Public
async function getCategory(req, res, next) {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      console.log('Bad Show');
      console.log(err);
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

module.exports = getCategory;

module.exports = {
  getCategories,
  getCategory,
};
