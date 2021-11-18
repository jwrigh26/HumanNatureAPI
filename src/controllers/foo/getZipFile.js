const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middleware/async');
const https = require('https');
const AdmZip = require('adm-zip');
const path = require('path');
const fs = require('fs');
const util = require('util');
const stream = require('stream');
const { pipeline } = require('stream');

// @desc Call to get a zip file
// @route /api/v1/foo/zip
// @access Public
const getAcceptPaymentPage = asyncHandler(async (req, res, next) => {
  const url = 'https://justinwright-a5b15.web.app/foo.zip';
  const id = 'RGAXiK9XOuUtB3AYSi71ZnbSpa7ERh9m';
  const zipPath = path.join(__dirname, '../../temp/boo.zip');
  const tempPath = path.join(__dirname, '../../temp/');

  let fileNames = [];

  const response = await makeRequest(url);

  const writeStream = fs.createWriteStream(zipPath);

  writeStream.on('close', function () {
    try {
      const zip = new AdmZip(zipPath);
      const zipEntries = zip.getEntries(); // an array of ZipEntry records
      zipEntries.forEach(function (zipEntry) {
        fileNames.push(zipEntry.entryName);
      });
      zip.extractAllTo(tempPath);
    } catch (error) {
      console.log(error);
    }
  });

  await pipeline(response, writeStream, (e) => {
    console.log('Pipeline finished', e);
    res.status(200).json({
      result: { success: true, fileNames, path: tempPath },
      error: null,
    });
  });
});

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const { statusCode } = res;

      if (statusCode === 200) {
        console.log('Yes');
        resolve(res);
      }

      const error = new Error(
        'Request Failed.\n' + `Status Code: ${statusCode}`
      );
      reject(error);
    });
  });
}

module.exports = getAcceptPaymentPage;
