// const path = require('path');
// const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

const { omdbApi } = require('../utils/api');

// @desc FOO
// @route FOO
// @access Public
const foo = asyncHandler(async (req, res, next) => {
  const api = omdbApi();
  const response = await api.getStarWars();
  res
    .status(200)
    .json({ result: { success: true, data: response.data }, error: null });
});

module.exports = {
  foo,
};
