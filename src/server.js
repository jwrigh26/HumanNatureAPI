const express = require('express');
const { env } = require('../src/constants');

// const dotenv = require('dotenv');

// Load env vars
// Handling everything through launch.json
// dotenv.config({ path: './config/config.env' });
// port 5000 is default for development

const port = env.port;
const app = express();


app.listen(port, () => {
  console.log(`Server running in ${env.node_env} mode on port ${port}`);
});
