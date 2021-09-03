const path = require('path');
const express = require('express');
const morgan = require('morgan');
const colors = require('colors');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('../config/db');
const cors = require('cors');

const { env } = require('../src/constants');

/**
 * TODO HTTPS
 * const fs = require('fs');
 * const key = fs.readFileSync('./key.pem');
 * const cert = fs.readFileSync('./cert.pem');
 */

// Https
// const fs = require('fs');
// const key = fs.readFileSync(`${__dirname}/../key.pem`);

// Connect to database
connectDB();

// Route Files
const customerProfiles = require('./routes/customerProfiles');
const paymentTransactions = require('./routes/paymentTransactions');
const inventory = require('./routes/inventory');
const merchant = require('./routes/merchant');

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
// app.use(cookieParser());

// Dev logging middleware
if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// File uploading
// app.use(fileupload());

// Sanitize data
// app.use(mongoSanitize());

// Set security headers
// app.use(helmet());

// Prevent XSS attacks
// app.use(xss());

// Rate limiting
// const limiter = rateLimit({
//   windowMs: 10 * 60 * 1000, // 10 mins
//   max: 100
// });
// app.use(limiter);

// Prevent http param pollution
// app.use(hpp());

// Enable CORS
app.use(cors());

// Set static folder
// app.use(express.static(path.join(__dirname, 'public')));

// Mount routers
app.use('/api/v1/customer/profiles', customerProfiles);
app.use('/api/v1/payment/transactions', paymentTransactions);
app.use('/api/v1/inventory', inventory);
app.use('/api/v1/merchant', merchant);

app.use(errorHandler);

const PORT = env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${env.node_env} mode on port ${PORT}`.yellow.bold);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`.red);
  // close server & exit process
  server.close(() => process.exit(1));
});


