const asyncHandler = require('../../middleware/async');
const AdmZip = require('adm-zip');
const util = require('util');
const request = require('request');
const { jobNimbusApi } = require('../../utils/api');

const ErrorResponse = require('../../utils/errorResponse');

const getRequest = util.promisify(request.get);

const api = jobNimbusApi();

const handleCreateFile = async (payload, index) => {
  const response = await api.createFile(payload);
  if (response.status !== 200) {
    return next(new ErrorResponse('JobNimbus null response received.', 400));
  }

  return { status: response.status, data: response.data };
};

// @desc Call to get a zip file
// @route /api/v1/foo/zip
// @access Public
const getAcceptPaymentPage = asyncHandler(async (req, res, next) => {
  const url = 'https://justinwright-a5b15.web.app/foo.zip';

  const { body } = await getRequest({ url, encoding: null });

  let zip = new AdmZip(body);
  let zipEntries = zip.getEntries();

  // fake id
  const jnid = 'kvlp9ir0nrbwsvexrric848';

  const fileNames = zipEntries.map((entry) => entry.entryName);

  const payloads = zipEntries.reduce((list, entry) => {
    // Pull decompressedData from zip by name
    const data = zip.readFile(entry.entryName);

    // Assemble payloads
    return [
      ...list,
      {
        data: Buffer.from(data).toString('base64'),
        is_private: false,
        related: [jnid],
        type: 1,
        subtype: 'contact',
        filename: entry.entryName,
        date: Date.now(),
        persist: true,
      },
    ];
  }, []);

  // Create fns to use in Promise all
  const workers = payloads.reduce((list, payload, index) => {
    const worker = handleCreateFile(payload, index);
    return [...list, worker];
  }, []);

  const values = await Promise.all(workers);

  res.status(200).json({
    result: { success: true, fileNames, values },
    error: null,
  });
});

module.exports = getAcceptPaymentPage;
