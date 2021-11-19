/* eslint-disable */
const env = Object.freeze({
  authLoginId: process.env.AUTH_LOGIN_ID,
  authTransactionKey: process.env.AUTH_TRANSACTION_KEY,
  port: process.env.PORT || 500,
  node_env: process.env.NODE_ENV,
  mongo_uri: process.env.MONGO_URI,
  jobNimbusToken: process.env.JOB_NIMBUS_TOKEN,
});

const Channel = Object.freeze({
  REGISTER: 'REGISTER',
  KIOSK: 'KIOSK',
  ONLINE: 'ONLINE',
});

const Status = Object.freeze({
  ENABLED: 'ENABLED',
  DISABLED: 'DISABLED',
});

module.exports = {
  env,
  Channel,
  Status,
};
