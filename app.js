const express = require('express');
const mongoose = require('mongoose');
const path = require('node:path');
require('dotenv').config({
  path: path.join(__dirname, 'env', `.env.${process.env.NODE_ENV || 'local'}`)
}); // app.js doesn't see .env.local - they must be on the same level or need to write the path to .env.local

const ApiError = require('./errors/ApiError');
const configs = require('./configs/config');
const router = require('./src/router');

const app = express();
mongoose.set('debug', true);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);
app.use('*', _notFoundError);
app.use(mainErrorHandler);

app.listen(configs.PORT, async () => {
  try {
    mongoose.set('strictQuery', true);
    const connection = await mongoose.connect(configs.MONGO_URL);

    if (connection) {
      console.log('DB connected');
    }
  } catch (err) {
    if (err) console.log(err);
    process.exit(1);
  }
  console.log(`PORT: ${configs.PORT}`);
});

function _notFoundError(req, res, next) {
  next(new ApiError('Route not found', 404));
}

// eslint-disable-next-line no-unused-vars
function mainErrorHandler(err, req, res, next) {
  res
    .status(err.status || 500)
    .json({
      message: err.message || 'Unknown error'
    });
}
