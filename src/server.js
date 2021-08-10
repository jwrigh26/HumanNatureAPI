const express = require('express');
const morgan = require('morgan');

const { env } = require('../src/constants');

// const dotenv = require('dotenv');

// Note: Handling everything through launch.json
// Prev had to load env vars
// dotenv.config({ path: './config/config.env' });

// Route Files
const customerProfiles = require('./routes/customerProfiles');
const paymentTransactions = require('./routes/paymentTransactions');

const port = env.port;
const app = express();

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/customer/profiles', customerProfiles);
app.use('/api/v1/payment/transactions', paymentTransactions);

app.listen(port, () => {
  console.log(`Server running in ${env.node_env} mode on port ${port}`);
});

