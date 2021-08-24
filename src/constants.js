/* eslint-disable */
const env = Object.freeze({
  port: process.env.PORT || 500,
  node_env: process.env.NODE_ENV,
  mongo_uri: process.env.MONGO_URI
})

const Channel = Object.freeze({
  REGISTER: 'REGISTER',
  KIOSK: 'KIOSK',
  ONLINE: 'ONLINE',
})

const Status = Object.freeze({
  ENABLED: 'ENABLED',
  DISABLED: 'DISABLED',
})

module.exports = {
  env,
  Channel,
  Status,
}