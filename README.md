# HumanNatureAPI


Notes for developerment

// Note: Handling everything through launch.json
// Prev had to load env vars
// dotenv.config({ path: './config/config.env' });
// const dotenv = require('dotenv');

// But now we do this
const { env } = require('../src/constants');