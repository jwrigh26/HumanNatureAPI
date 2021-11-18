const express = require('express');
const router = express.Router();

const getZipFile = require('../controllers/foo/getZipFile');

router.route('/zip').get(getZipFile);

module.exports = router;
