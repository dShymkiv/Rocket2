const express = require('express');

const configs = require('./configs/config');
const router = require('./router');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

app.listen(configs.PORT, () => {
  console.log(`PORT: ${configs.PORT}`);
});
